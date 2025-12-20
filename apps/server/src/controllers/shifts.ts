import type { Request, Response } from "express";
import Posts from "@/db/models/Posts";
import User from "@/db/models/User";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { content_types } from "@/utils/content_types";

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
                * "Logical Fallacies" -> "fallacies"
                * "Cognitive Biases" -> "biases"
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

        console.log(prompt);
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-lite",
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

export const completeShift = async (req: Request, res: Response) => {
    try {
        const userId = req.users;
        const { history } = req.body;

        const postCorrect = history.filter(
            (item: any) => item.is_correct
        ).length;

        const sentData = await Promise.all(
            history.map(async (item) => {
                const post = await Posts.findById(item.id);

                if (!post) {
                    throw new Error(`Post not found: ${item.id}`);
                }

                return {
                    post_id: item.id,
                    is_correct: item.is_correct,
                    category: post.category,
                };
            })
        );

        console.log(sentData);

        const statUpdate: Record<string, number> = {};

        for (let i = 0; i < sentData.length; i++) {
            const ct = sentData[i]?.category;
            console.log(ct);
            if (ct) {
                if (!statUpdate[`stats.${ct}.total`]) {
                    statUpdate[`stats.${ct}.total`] = 0;
                    statUpdate[`stats.${ct}.correct`] = 0;
                }

                statUpdate[`stats.${ct}.total`] += 1;

                if (sentData[i]?.is_correct) {
                    statUpdate[`stats.${ct}.correct`] += 1;
                }
            }
        }
        console.log(statUpdate);
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
                    postsHistory: { $each: sentData },
                },
                $inc: {
                    postProcessed: history.length,
                    postsCorrect: postCorrect,
                    totalExp: expEarned,
                    ...statUpdate,
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
