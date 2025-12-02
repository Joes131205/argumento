import { fetchPost } from "@/controllers/shifts";
import { authMiddleware } from "@/middleware/auth";
import express from "express";

export const shiftsRouter = express.Router();

shiftsRouter.post("/", authMiddleware, fetchPost);

export type ShiftsRouter = typeof shiftsRouter;
