import { authMiddleware } from "@/middleware/auth";
import express from "express";
import { getLevel } from "@/controllers/campaign";

export const campaignRouter = express.Router();

campaignRouter.get("/$level/$id", authMiddleware, getLevel);

export type CampaignRouter = typeof campaignRouter;
