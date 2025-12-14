import mongoose, { Schema, type Document } from "mongoose";

export interface IUsers extends Document {
    username: string;
    password: string;
    totalExp: number;
    currentStreak: number;
    bestStreak: number;
    lastPlayedDate: Date;
    postProcessed: number;
    postsCorrect: number;
    postsHistory: string[];
    campaign_progress: Record<string, string>[];
}

const StatSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    correct: {
        type: Number,
        default: 0,
    },
    total: {
        type: Number,
        default: 0,
    },
});

const CampaignProgressSchema = new Schema(
    {
        campaign_id: { type: String, required: true },
        isCompleted: { type: Boolean, default: false },
        levelsCompleted: [{ type: String }],
    },
    { _id: false }
);

const UsersSchema: Schema = new Schema(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        totalExp: { type: Number, default: 0 },

        currentStreak: { type: Number, default: 0 },
        bestStreak: { type: Number, default: 0 },
        lastPlayedDate: { type: Date, default: null },

        postsProcessed: { type: Number, default: 0 },
        postsCorrect: { type: Number, default: 0 },

        postsHistory: [
            {
                post_id: {
                    type: String,
                    required: true,
                },
                is_correct: {
                    type: Boolean,
                    required: true,
                },
            },
        ],
        stats: {
            fallacies: {
                type: StatSchema,
                default: () => ({
                    name: "Logical Fallacies",
                }),
            },
            biases: {
                type: StatSchema,
                default: () => ({
                    name: "Cognitive Biases",
                }),
            },
            media_manipulation: {
                type: StatSchema,
                default: () => ({
                    name: "Media Manipulation",
                }),
            },
            ai_hallucination: {
                type: StatSchema,
                default: () => ({
                    name: "AI Hallucination",
                }),
            },
        },
        campaign_progress: [CampaignProgressSchema],
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IUsers>("Users", UsersSchema);
