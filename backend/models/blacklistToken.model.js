import mongoose from "mongoose";

const blacklistTokenSchema = new mongoose.Schema({
    token: {
		type: String,
		required: true,
		index: true,
	},
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400 // 24 hours in seconds
    }

});

const blacklistToken = mongoose.model("BlacklistToken",blacklistTokenSchema);
export {blacklistToken};