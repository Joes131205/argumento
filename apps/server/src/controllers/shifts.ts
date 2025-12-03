import type { Request, Response } from "express";
import Posts from "@/db/models/Posts";
import User from "@/db/models/User";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_AI_API,
});

declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

// AI generate the content
export const generateDailyShift = async (req: Request, res: Response) => {
    try {
        console.log(req.body);
        const { postLength, types } = req.body;
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
        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            contents: `${types}`,
        });

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

// TODO: Modify this
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
        const userId = req.users;
        const { history } = req.body;

        const postId = history.map((item) => item.id);
        const postCorrect = history.filter((item) => item.is_correct).length;

        const expEarned = postCorrect * 100;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(401).send({
                success: false,
                message: "Unauthorized",
            });
        }

        // calculate streak

        let currStreak = user.currentStreak;
        let currBest = user.bestStreak;
        const lastPlayed = user.lastPlayedDate.getTime() || Date.now();
        const now = Date.now();

        const daysDiff = Math.floor((now - lastPlayed) / (1000 * 60 * 60 * 24));

        if (daysDiff === 0) {
            // Do nothing :)
        } else if (daysDiff === 1) {
            currStreak++;
            currBest = Math.max(currStreak, currBest);
        } else if (daysDiff > 1) {
            currBest = Math.max(currStreak, currBest);
            currStreak = 1;
        }

        await User.findByIdAndUpdate(userId, {
            $addToSet: {
                postsHistory: postId,
            },
            $inc: {
                postProcessed: history.length,
                postsCorrect: postCorrect,
                totalExp: expEarned,
            },
            $set: {
                lastPlayedDate: Date.now(),
                currentStreak: currStreak,
                bestStreak: currBest,
            },
        });

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
