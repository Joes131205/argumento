import {
    equipTheme,
    getUserById,
    refreshStreak,
    resetStreaks,
} from "@/controllers/user";
import { authMiddleware } from "@/middleware/auth";
import express from "express";

export const userRouter = express.Router();

userRouter.get("/:userId", getUserById);
userRouter.put("/theme", authMiddleware, equipTheme);
userRouter.put("/streak", authMiddleware, refreshStreak);
userRouter.post("/cron/reset-streaks", resetStreaks);

export type UserRouter = typeof userRouter;
