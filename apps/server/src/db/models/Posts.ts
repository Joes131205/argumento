import mongoose, { Schema, type Document } from "mongoose";

export interface IPosts extends Document {
    field: string;
}

const PostsSchema: Schema = new Schema(
    {
        headline: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: ["safe", "slop"],
            required: true,
        },
        slop_reason: {
            type: String,
            default: null,
        },
        origin: {
            type: String,
            enum: ["ai", "human"],
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IPosts>("Posts", PostsSchema);
