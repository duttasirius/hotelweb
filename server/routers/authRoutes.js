import express from "express";
import { getCurrentUser, login, register } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleWare.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/me", protect, getCurrentUser);

export default authRouter;
