import express, { type Request, type Response } from "express";
import { authRouter } from "./auth";
import { judgeRouter } from "./judge";
import { shiftsRouter } from "./shifts";
import { leaderboardRouter } from "./leaderboard";

export const appRouter = express.Router();

appRouter.get("/", (_req: Request, res: Response) => {
    res.status(200).json({ status: "OK", message: "Server is healthy" });
});

appRouter.use("/auth", authRouter);
appRouter.use("/judge", judgeRouter);
appRouter.use("/shifts", shiftsRouter);
appRouter.use("/leaderboard", leaderboardRouter);

export type AppRouter = typeof appRouter;
