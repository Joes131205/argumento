import type { Request, Response } from "express";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_AI_API,
});

export const judge = async (req: Request, res: Response) => {
    try {
        const {
            headline,
            content,
            isRejected,
            reason,
        }: {
            headline: string;
            content: string;
            isRejected: boolean;
            reason: string;
        } = req.body;
        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            contents: `Hello World! ${headline + content + isRejected + reason}`,
        });
        console.log(response.text);
        return res.status(200).json({ success: true, message: "Success" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error,
        });
    }
};
