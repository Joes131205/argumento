import { getMe, login, register } from "@/controllers/auth";
import { authMiddleware } from "@/middleware/auth";
import express from "express";

export const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.get("/", authMiddleware, getMe);

export type AuthRouter = typeof authRouter;
