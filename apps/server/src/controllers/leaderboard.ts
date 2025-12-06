import type { Request, Response } from "express";
import User from "@/db/models/User";

export const getLeaderboard = async (req: Request, res: Response) => {
    try {
        const { type } = req.params;
        const sortField =
            type === "exp"
                ? "totalExp"
                : type === "bestStreak"
                  ? "bestStreak"
                  : type === "currentStreak"
                    ? "currentStreak"
                    : type === "postsProcessed"
                      ? "postsProcessed"
                      : "postsCorrect";
        const data = await User.find({}, "-password")
            .sort({ [sortField]: -1 })
            .limit(100);
        console.log(data);
        res.status(200).json({ success: true, message: "Success", data });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error,
        });
    }
};
