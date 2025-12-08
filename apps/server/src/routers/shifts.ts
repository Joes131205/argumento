import { completeShift, generateDailyShift } from "@/controllers/shifts";
import { authMiddleware } from "@/middleware/auth";
import express from "express";

export const shiftsRouter = express.Router();

shiftsRouter.put("/complete", authMiddleware, completeShift);
shiftsRouter.post("/generate", authMiddleware, generateDailyShift);

export type ShiftsRouter = typeof shiftsRouter;
