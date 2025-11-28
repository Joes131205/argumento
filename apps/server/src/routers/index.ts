import express, { type Request, type Response } from "express";
import { authRouter } from "./auth";

export const appRouter = express.Router();

appRouter.get("/", (_req: Request, res: Response) => {
    res.status(200).json({ status: "OK", message: "Server is healthy" });
});

appRouter.use("/auth", authRouter);

export type AppRouter = typeof appRouter;
