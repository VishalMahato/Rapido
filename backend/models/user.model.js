import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		name: {
			type: {
				firstName: {
					type: String,
					required: true,
				},
				lastName: {
					type: String,
					required: false,
				},
			},
			required: true,
		},
		userName: {
			type: String,
			required: true,
			index: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			index: true,
			unique: true,
		},
		hashedPassword: {
			type: String,
			required: true,
		},
		contactNumber: {
			type: String,
			required: false,
			unique: true,
		},
		role: {
			type: String,
			enum: ["User", "Captain"],
			default: "User",
		},

	},
	{
		timestamps: true,
		discriminatorKey: "role", 
	}
);

const User = mongoose.model("User", userSchema);
export default User;
