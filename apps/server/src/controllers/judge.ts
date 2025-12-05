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
            correctType,
            reason,
        }: {
            headline: string;
            content: string;
            correctType: string;
            reason: string;
        } = req.body;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            contents: `You are the Logic Judge. Evaluate this student's reasoning.

            INPUT DATA:
            1. Post Headline: "${headline}"
            2. Post Content: "${content}"
            3. The Hidden Truth (Correct Answer): "${correctType}"
            4. User's Reasoning: "${reason}"

            EVALUATION RULES:
            - If the user identifies the core concept of "${correctType}" (even with different words), mark CORRECT.
            - If the user is vague ("It's fake"), mark INCORRECT.
            - If the user is wrong, explain why.
            - If the answer is not following hidden truth, but the logic is still valid (e.g. different topic but correct), mark CORRECT. Also explaining the initial correct answer and why.

            OUTPUT FORMAT (JSON):
            {
                "is_correct": boolean, 
                "confidence_score": number,
                "feedback_title": string,
                "feedback_message": string
            }`,
        });
        console.log(
            JSON.parse(
                response?.candidates?.[0]?.content?.parts?.[0]?.text
                    ?.replace("```json\n", "")
                    .replace("\n```", "") || ""
            )
        );
        return res.status(200).json({
            success: true,
            message: "Success",
            response: JSON.parse(
                response?.candidates?.[0]?.content?.parts?.[0]?.text
                    ?.replace("```json\n", "")
                    .replace("\n```", "") || ""
            ),
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error,
        });
    }
};
