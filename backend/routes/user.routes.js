import { Router } from "express";
import { loginUser, registerUser } from "../controlers/auth.controller.js";
import { getUser, getAllUsers, isUsernameAvailable } from "../controlers/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/get-user", getUser);
userRouter.post("/get-all-users", authMiddleware, getAllUsers);
userRouter.get("/check-username", isUsernameAvailable);

export default userRouter;
