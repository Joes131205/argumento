import type { Request, Response } from "express";
import Posts from "@/db/models/Posts";
import User from "@/db/models/User";

declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

export const fetchPost = async (req: Request, res: Response) => {
    try {
        console.log(req.body);
        const { postLength } = req.body;
        const userId = req.users;

        if (!userId) {
            return res.status(401).send({
                success: false,
                message: "Unauthorized",
            });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(401).send({
                success: false,
                message: "Unauthorized",
            });
        }

        const seenId = user.postsHistory;

        const data = await Posts.aggregate([
            { $match: { _id: { $nin: seenId } } },
            { $sample: { size: Number(postLength) } },
            {
                $project: {
                    headline: 1,
                    content: 1,
                    type: 1,
                },
            },
        ]);

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

export const completeShift = async (req: Request, res: Response) => {
    try {
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
