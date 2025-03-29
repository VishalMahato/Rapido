import { z } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Captain from "../models/captain.model";
import User from "../models/user.model";

const registerAsCaptainSchema = z.object({
	firstName: z.string().min(2),
	lastName: z.string().min(2),
	userName: z.string().min(3),
	email: z.string().email(),
	password: z.string()
		.min(8)
		.regex(/[A-Z]/, "Must contain an uppercase letter")
		.regex(/[a-z]/, "Must contain a lowercase letter")
		.regex(/\d/, "Must contain a number")
		.regex(/[\W_]/, "Must contain a special character"),
	contactNumber: z.string().regex(/^\d{10,15}$/, "Invalid contact number"),
	vehicleNumber: z.string().regex(
		/^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$/,
		"Invalid license number"
	),
	licenceNumber: z.string().regex(
		/^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9]{2})[0-9]{7}$/,
		"Invalid license number"
	),
	vehicleType: z.enum(["Car", "Bike", "Auto"]),
	vehicleCapicity: z.string().min(1),
});

const registerAsCaptain = async (req, res) => {
	try {
		registerAsCaptainSchema.parse(req.body);
		const {
			firstName,
			lastName,
			userName,
			email,
			password,
			contactNumber,
			vehicleNumber,
			licenceNumber,
			vehicleType,
			vehicleCapicity,
		} = req.body;

		const [existingEmail, existingContact, existingUserName] = await Promise.all([
			User.findOne({ email }),
			User.findOne({ contactNumber }),
			User.findOne({ userName }),
		]);

		if (existingEmail) return res.status(400).json({ message: "Email already in use" });
		if (existingContact) return res.status(400).json({ message: "Contact already in use" });
		if (existingUserName) return res.status(400).json({ message: "Username not available" });

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const captainData = {
			name: { firstName, lastName },
			userName,
			email,
			hashedPassword,
			vehicleNumber,
			licenceNumber,
			vehicleType,
			vehicleCapicity,
			contactNumber,
		};

		const captain = new Captain(captainData);
		await captain.save();

		const token = jwt.sign({ userId: captain._id }, process.env.JWT_SECRET, {
			expiresIn: "1d",
		});

		res.cookie("token", token, {
			httpOnly: true,
			secure: true,
			sameSite: "none",
			maxAge: 3600000,
		});

		return res.status(201).json({ message: "User registered successfully." });
	} catch (error) {
		if (error instanceof z.ZodError) {
			return res.status(400).json({ message: "Validation failed", errors: error.errors });
		}
		console.error(error);
		return res.status(500).json({ message: "Server error" });
	}
};


const becomeCaptainSchema = z.object({
	vehicleNumber: z
		.string()
		.regex(/^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$/, "Invalid vehicle number"),
	licenceNumber: z
		.string()
		.regex(
			/^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9]{2})[0-9]{7}$/,
			"Invalid license number"
		),
	vehicleType: z.enum(["Car", "Bike", "Auto"]),
	vehicleCapacity: z.coerce.number().min(1),
	vehicleImageUrl: z.string().optional(),
});

const becomeACaptain = async (req, res) => {
	try {
		// Validate the input
		const validatedData = becomeCaptainSchema.parse(req.body);

		const user = req.user; // Set from your authenticator middleware

		if (!user) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		// Check if already a captain (discriminator key is `__t`)
		if (user.__t === "Captain") {
			return res.status(400).json({ message: "You are already a captain." });
		}

		// Promote user to Captain
		await User.updateOne(
			{ _id: user._id },
			{
				$set: {
					__t: "Captain",
					...validatedData,
				},
			}
		);

		return res.status(200).json({ message: "Successfully registered as a captain." });
	} catch (error) {
		if (error instanceof z.ZodError) {
			return res.status(400).json({ message: "Validation failed", errors: error.errors });
		}
		console.error(error);
		return res.status(500).json({ message: "Server error" });
	}
};

export {registerAsCaptain,becomeACaptain};