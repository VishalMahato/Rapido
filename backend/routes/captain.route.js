import { Router } from "express";
import { registerAsCaptain,becomeACaptain } from "../controlers/captain.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const captainRouter = new Router(); 

captainRouter.post("/captains/register",authMiddleware, registerAsCaptain);
captainRouter.post("/captains/become-captain",authMiddleware, becomeACaptain);

export default captainRouter;

