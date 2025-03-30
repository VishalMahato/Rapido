import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controlers/auth.controller.js";
import { getUser, getAllUsers, isUsernameAvailable, getCurrentUserProfile } from "../controlers/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);
userRouter.post("/get-user", getUser);
userRouter.post("/get-all-users", authMiddleware, getAllUsers);
userRouter.get("/check-username", isUsernameAvailable);
userRouter.get("/profile", getCurrentUserProfile);


export default userRouter;
