import User from "@/db/models/User";
import { shop } from "@/utils/shop";
import type { Request, Response } from "express";

export const getUserById = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId);

        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error,
        });
    }
};

export const equipTheme = async (req: Request, res: Response) => {
    try {
        const { itemId } = req.body;
        const userId = req.users;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const item = shop.themes.find((it) => it.id === itemId);

        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Theme not found",
            });
        }

        user.activeTheme = itemId;

        await user.save();

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
