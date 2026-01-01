import type { Request, Response } from "express";
import { shop } from "@/utils/shop";
import User from "@/db/models/User";

export const getShops = async (_req: Request, res: Response) => {
    try {
        res.status(200).json({ success: true, shop });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error,
        });
    }
};

export const buyShopItem = async (req: Request, res: Response) => {
    try {
        const { type, itemId }: { type: string; itemId: string } = req.body;
        const userId = req.users;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const item = shop[type as keyof typeof shop].find(
            (it) => it.id === itemId
        );

        console.log(item);

        res.status(200).json({ success: true, message: "Success" });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error,
        });
    }
};
