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

        const prompt = `
            ROLE: You are an Educational Content Generator for a critical thinking training app. 
            
            TASK: Generate ${postLength} social media posts.
            
            DISTRIBUTION RULES (CRITICAL):
            1. You must generate a mix of "Safe" posts and "Slop" posts.
            2. Aim for a 50/50 split (e.g. if requesting 3 posts, make 1 Safe and 2 Slop, or vice versa).
            3. For "Safe" posts: Ignore the provided categories. Generate boring, factual, neutral news.
            4. For "Slop" posts: Pick randomly from this list of categories: ${JSON.stringify(types)}.
            
            INSTRUCTIONS:
            - "Safe" posts must be undeniably true (e.g. "Local library opens at 9 AM").
            - "Slop" posts must be realistic clickbait/rage-bait using the specific fallacy requested.
            - Shuffle the order (do not put all Safe posts first).
            
            OUTPUT SCHEMA (JSON Array):
            [
              {
                "headline": "string",
                "content": "string",
                "type": "string ('slop' or 'safe')",
                "slop_reason": "string (The exact name of the category used from the list, or null if safe)",
                "origin": "ai"
              }
            ]
        `;
        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            contents: prompt,
        });

        console.log(
            JSON.parse(
                response?.candidates?.[0]?.content?.parts?.[0]?.text
                    ?.replace("```json\n", "")
                    .replace("\n```", "") || ""
            )
        );

        const parsed = JSON.parse(
            response?.candidates?.[0]?.content?.parts?.[0]?.text
                ?.replace("```json\n", "")
                .replace("\n```", "") || ""
        );

        const savedPosts = await Posts.insertMany(parsed);
        res.status(200).json({
            success: true,
            message: "Success",
            posts: savedPosts,
        });
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

        const postId = history.map((item: any) => item.id);
        const postCorrect = history.filter(
            (item: any) => item.is_correct
        ).length;

        const expEarned = postCorrect * 100;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(401).send({
                success: false,
                message: "Unauthorized",
            });
        }

        // calculate streak

        let currStreak = user.currentStreak || 0;
        let currBest = user.bestStreak || 0;
        const lastPlayed = new Date(
            user.lastPlayedDate || Date.now()
        ).getTime();
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        const nowTime = now.getTime();

        const daysDiff = Math.floor(
            (nowTime - lastPlayed) / (1000 * 60 * 60 * 24)
        );
        if (!user.lastPlayedDate) {
            currStreak = 1;
        } else {
            if (daysDiff === 0) {
                // Do nothing :)
            } else if (daysDiff === 1) {
                currStreak++;
            } else if (daysDiff > 1) {
                currStreak = 1;
            }
        }
        currBest = Math.max(currStreak, currBest);

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                $addToSet: {
                    postsHistory: { $each: postId },
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
            },
            {
                new: true,
            }
        );
        console.log(updatedUser);
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
