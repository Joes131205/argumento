import type { Request, Response } from "express";
import Posts from "@/db/models/Posts";
import User, { type IUsers } from "@/db/models/User";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { content_types } from "@/utils/content_types";
import type { IPostLog } from "@/types";

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

            // --- CONTEXT ---
            // 1. THE DICTIONARY (Use this to understand what the fallacies MEAN)
            REFERENCE_DB: 
            ${JSON.stringify(content_types)}

            // 2. THE ASSIGNMENT (Only generate the types listed here)
            INPUT_TARGETS: 
            ${JSON.stringify(types)}

            // --- RULES ---
            DISTRIBUTION:
            1. **50/50 SPLIT**: Generate a mix of roughly 50% "Safe" and 50% "Slop".
            2. **SAFE POSTS**: Ignore INPUT_TARGETS. Generate factual, neutral, undeniably true news (e.g. "City library hours", "Weather report").
            3. **SLOP POSTS**: Generate realistic misinformation.
            - **STRICT FILTERING**: You must ONLY use types found in the *non-empty* arrays within INPUT_TARGETS.
            - If a category in INPUT_TARGETS is empty (e.g. "logical_fallacies": []), IGNORE IT.

            INSTRUCTIONS FOR "SLOP":
            1. **SELECT**: Pick a target type from valid INPUT_TARGETS (e.g. "Ad Hominem").
            2. **STUDY**: Look up that type in REFERENCE_DB. Analyze the official definition and example to understand the specific nuance.
            3. **WRITE**: Create a *new* post that uses that exact same logical flaw, but on a fresh topic.
            4. **TAG**: 
            - "reasons": Must include the target type. You may add 1 extra relevant tag if applicable.
            - "category": Map the input key to the Schema Key strictly:
                * "Logical Fallacies" -> "logical_fallacies"
                * "Cognitive Biases" -> "cognitive_biases"
                * "Media Manipulation" -> "media_manipulation"
                * "AI Hallucinations" -> "ai_hallucinations"

            OUTPUT SCHEMA (JSON Array):
            [
            {
                "headline": "string",
                "content": "string",
                "type": "string ('slop' or 'safe')",
                "reasons": ["string"], 
                "category": "string (fallacies, biases, media_manipulation, ai_hallucinations, or safe)",
                "origin": "ai"
            }
            ]
        `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-lite",
            contents: prompt,
        });

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

const CATEGORY_NAMES: Record<string, string> = {
    logical_fallacies: "Logical Fallacies",
    cognitive_biases: "Cognitive Biases",
    media_manipulation: "Media Manipulation",
    ai_hallucinations: "AI Hallucinations",
    safe: "Safe Content",
};

export const completeShift = async (req: Request, res: Response) => {
    try {
        const userId = req.users;
        const { history } = req.body;
        console.log(history);

        const user: IUsers | null = await User.findById(userId);

        if (!user) {
            return res.status(401).send({
                success: false,
                message: "Unauthorized",
            });
        }

        const postCorrect = history.filter(
            (item: IPostLog) => item.is_correct
        ).length;
        const expEarned = postCorrect * 100;

        const sentData = await Promise.all(
            history.map(async (item: IPostLog) => {
                const post = await Posts.findById(item.post_id);
                if (!post) throw new Error(`Post not found: ${item.post_id}`);

                return {
                    post_id: item.post_id,
                    is_correct: item.is_correct,
                    category: post.category,
                };
            })
        );

        sentData.forEach((item) => {
            if (!item.category) return;

            const existingStat = user.stats.find(
                (s) => s.stat_id === item.category
            );

            if (existingStat) {
                existingStat.total++;
                if (item.is_correct) {
                    existingStat.correct++;
                }
            } else {
                user.stats.push({
                    stat_id: item.category,
                    name: CATEGORY_NAMES[item.category] || item.category,
                    total: 1,
                    correct: item.is_correct ? 1 : 0,
                });
            }
        });

        const lastPlayed = new Date(user.lastPlayedDate || 0).getTime();
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        const nowTime = now.getTime();

        const msPerDay = 1000 * 60 * 60 * 24;
        const daysDiff = Math.floor((nowTime - lastPlayed) / msPerDay);

        if (!user.lastPlayedDate) {
            user.currentStreak = 1;
        } else {
            if (daysDiff === 1) {
                user.currentStreak += 1;
            } else if (daysDiff > 1) {
                user.currentStreak = 1;
            }
        }

        if (user.currentStreak > user.bestStreak) {
            user.bestStreak = user.currentStreak;
        }

        user.lastPlayedDate = new Date();
        user.totalExp += expEarned;
        user.postsProcessed += history.length;
        user.postsCorrect += postCorrect;

        user.postsHistory.push(...sentData);

        await user.save();

        res.status(200).json({ success: true, message: "Success", data: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error,
        });
    }
};
