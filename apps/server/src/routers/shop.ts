import { getShops } from "@/controllers/shop";
import express from "express";

export const shopsRouter = express.Router();

shopsRouter.get("/", getShops);

export type ShopsRouter = typeof shopsRouter;
