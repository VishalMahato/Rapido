import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const isUsernameAvailable = async (req, res) => {
  try {
    const { userName } = req.query;

    if (!userName) {
      return res.status(400).json({ message: "Username is required" });
    }

    // Regex to validate the username.
    const usernameRegex = /^[A-Za-z0-9_](?!.*?\.{2})[A-Za-z0-9_.]{1,28}[A-Za-z0-9_]$/;
    if (!usernameRegex.test(userName)) {
      return res.status(400).json({ message: "Invalid username format" });
    }

    const user = await User.findOne({ userName });

    if (user) {
      return res.status(200).json({ available: false, message: "Username is already taken" });
    } else {
      return res.status(200).json({ available: true, message: "Username is available" });
    }
  } catch (error) {
    console.error("Error checking username availability:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//for finding the signed profile
const getCurrentUserProfile = async (req, res) => {
  try {
    const token = req.cookies.token;
    // console.log(token, "--token")
    if (!token) {
      return res.status(401).json({ message: "User not signed in" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("email name userName");
    // console.log(user," --user")

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


//for finding other users 
const getUser = async (req, res) => {
    try {
        const { userName, email, userId } = req.body;

        if (!userName && !email && !userId) {
            return res.status(400).json({ message: "Please provide either username, userId, or email" });
        }

        const user = await User.findOne(
            { $or: [{ userName }, { email }, { _id: userId }] },
            { hashedPassword: 0 } 
        );

        if (user) {
            return res.status(200).json(user);
        } else {
            return res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


// Function to get all users
const getAllUsers = async (req, res) => {
	try {
		const users = await User.find();
		return res.status(200).json(users);
	} catch (error) {
		console.error("Error fetching users:", error);
		return res.status(500).json({ message: "Internal server error." });
	}
};



export {getUser,getAllUsers , isUsernameAvailable, getCurrentUserProfile};