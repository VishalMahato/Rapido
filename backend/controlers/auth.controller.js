import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";
import User from "../models/user.model.js";


export const registerUserSchema = z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters long"),
    lastName: z.string().min(2, "Last name must be at least 2 characters long"),
    userName: z.string().min(3, "Username must be at least 3 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string()
        .min(8, "Password must be at least 8 characters long")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/\d/, "Password must contain at least one number")
        .regex(/[\W_]/, "Password must contain at least one special character"),
    contactNumber: z.string()
        .regex(/^\d{10,15}$/, "Contact number must be between 10-15 digits"),
});


const loginUserSchema = z.object({
    userName: z.string().min(1, "Username is required").optional(),
    email: z.string().email("Invalid email format").optional(),
    password: z.string().min(8, "Password must be at least 8 characters long"),
})


const registerUser = async (req, res) => {
	try {
		// console.log(req.body);
		// registerUserSchema.parse(req.body);
		const { firstName, lastName, userName, email, password, contactNumber } =
			req.body;

		
		if(contactNumber){
			const existingUserWithSameContact = await User.findOne({ contactNumber });
			if (existingUserWithSameContact) {
				return res
					.status(400)
					.json({ message: "user with this contact already exists." });
			}
		}
		

		const existingUserWithSameEmail = await User.findOne({ email });
		if (existingUserWithSameEmail) {
			return res
				.status(400)
				.json({ message: "user with this email already exists." });
		} else {
			const userNameAvailable = await User.findOne({ userName });
			if (userNameAvailable) {
				return res.status(400).json({ message: "username not available" });
			}
		}
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const userData = {
			name: {
				firstName,
				lastName,
			},
			userName,
			email,
			hashedPassword,
		};
		if (contactNumber) {
			userData.contactNumber = contactNumber;
		}
		const user = new User(userData);
		await user.save();

		const payload = {
			userId: user._id,
		};
		const token = jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn: "1d",
		});

		res.cookie("token", token, {
			httpOnly: true,
			// secure: true,
			sameSite: "none",
			maxAge: 3600000, // 1 hour
		});

		return res.status(201).json({ message: "User registered successfully." });
	} catch (error) {
		if (error instanceof z.ZodError) {
			return res.status(400).json({ message: error.errors[0].error });
		}
		console.error("Error registering user:", error);
		return res.status(500).json({ message: "Internal server error." });
	}
};

const loginUser = async (req, res) => {
	try {
	
		loginUserSchema.parse(req.body);

		const { userName, email, password } = req.body;

		if (!userName && !email) {
			return res.status(400).json({ message: "Please provide either username or email" });
		}

		
		const user = await User.findOne({
			$or: [{ userName }, { email }]
		});

		const IsPasswordValid= await bcrypt.compare(password,user.hashedPassword);



		if (!IsPasswordValid) {
			return res.status(401).json({ message: "Invalid ID or Password" });
		}

		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

		res.cookie("token", token, {
			httpOnly: true,
			secure: true,
			sameSite: "none",
			maxAge: 3600000, // 1 hour
		});

		return res.status(200).json({ message: "Login Successful" });

	} catch (error) {
		if (error instanceof z.ZodError) {
			return res.status(400).json({ message: error.errors[0].message });
		}
		console.error("Error logging in user:", error);
		return res.status(500).json({ message: "Internal server error." });
	}
};

const logoutUser = async (req, res) => {
	try {
	  res.clearCookie("token", {
		httpOnly: true,
		secure: true,
		sameSite: "none",
	  });
  
	  return res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
	  console.error("Error during logout:", error);
	  return res.status(500).json({ message: "Internal Server Error" });
	}
  };
  

const verifyToken = async (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        return user;
    } catch (error) {
        return null;
    }
}


export { registerUser,loginUser,verifyToken,logoutUser };
