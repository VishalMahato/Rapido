import { verifyToken } from "../controlers/auth.controller.js";
import { blacklistToken } from "../models/blacklistToken.model.js";


const authMiddleware = async (req, res, next) => {
	const token = req.cookies.token;
	if (!token) {
		return res.status(401).json({ message: "Unauthorized" });
	}

    const isTokenBlacklisted = blacklistToken.findOne({token: token})
    if (isTokenBlacklisted) {
		return res.status(401).json({ message: "Unauthorized" });
	}


	//check if token is valid
	try {
		const user = verifyToken(token);
		if (!user) {
			return res.status(401).json({ message: "Unauthorized" });
		} else {
			req.user = user;
		}
	} catch (error) {
		return res.status(401).json({ message: "Unauthorized" });
	}

	next();
};

export {authMiddleware};