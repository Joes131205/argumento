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
}

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
                type: Schema.Types.ObjectId,
                ref: "Posts",
            },
        ],
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IUsers>("Users", UsersSchema);
