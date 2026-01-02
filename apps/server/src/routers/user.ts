import { equipTheme, getUserById } from "@/controllers/user";
import { authMiddleware } from "@/middleware/auth";
import express from "express";

export const userRouter = express.Router();

userRouter.get("/:userId", getUserById);
userRouter.put("/theme", authMiddleware, equipTheme);

export type UserRouter = typeof userRouter;
