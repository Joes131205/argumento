import {
    generateResetToken,
    getMe,
    login,
    register,
    resetPassword,
    verifyEmail,
} from "@/controllers/auth";
import { authMiddleware } from "@/middleware/auth";
import express from "express";

export const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.get("/", authMiddleware, getMe);
authRouter.put("/verify/:id", verifyEmail);
authRouter.post("/reset", generateResetToken);
authRouter.put("/reset", resetPassword);

export type AuthRouter = typeof authRouter;
