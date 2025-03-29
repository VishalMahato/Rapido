import User from "../models/user.model.js";

//function to find user by email, id or username. 
const isUsernameAvailable = async (req, res) => {
  try {
   
    const { userName } = req.query; // <-- change here

    if (!userName) {
      return res.status(400).json({ message: "Username is required" });
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



export {getUser,getAllUsers , isUsernameAvailable};