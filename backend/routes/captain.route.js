import { Router } from "express";
import { registerAsCaptain,becomeACaptain } from "../controlers/captain.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const captainRouter = new Router(); 

captainRouter.post("/register",authMiddleware, registerAsCaptain);
captainRouter.post("/become-captain",authMiddleware, becomeACaptain);

export default captainRouter;

