import { getUserById } from "@/controllers/user";
import express from "express";

export const userRouter = express.Router();

userRouter.get("/:userId", getUserById);

export type UserRouter = typeof userRouter;
