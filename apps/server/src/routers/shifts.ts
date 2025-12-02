import { completeShift, fetchPost } from "@/controllers/shifts";
import { authMiddleware } from "@/middleware/auth";
import express from "express";

export const shiftsRouter = express.Router();

shiftsRouter.post("/", authMiddleware, fetchPost);
shiftsRouter.put("/complete", authMiddleware, completeShift);

export type ShiftsRouter = typeof shiftsRouter;
