import mongoose, { Schema, type Document } from "mongoose";

export interface IPosts extends Document {
    field: string;
}

const PostsSchema: Schema = new Schema(
    {
        field: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IPosts>("Posts", PostsSchema);
