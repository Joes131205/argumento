import type { Request, Response } from "express";
import User from "@/db/models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import z from "zod";
import Posts from "@/db/models/Posts";

declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

const UserSchema = z.object({
    username: z.string(),
    password: z.string(),
});

export const register = async (req: Request, res: Response) => {
    try {
        const { username, password } = UserSchema.parse(req.body);

        const hashedPassword = await bcrypt.hash(password, 10);

        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Username already exists",
            });
        }

        const user = new User({
            username: username,
            password: hashedPassword,
        });

        await user.save();

        const token = jwt.sign(
            {
                userId: user._id,
            },
            process.env.JWT_SECRET || "default_secret",
            { expiresIn: "1h" }
        );

        res.status(200).json({ success: true, message: "Success", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error,
        });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = UserSchema.parse(req.body);

        const user = await User.findOne({
            username,
        });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).send({
                success: false,
                message: "Invalid username or password",
            });
        }

        const token = jwt.sign(
            {
                userId: user._id,
            },
            process.env.JWT_SECRET || "default_secret",
            { expiresIn: "1h" }
        );

        res.status(200).json({ success: true, message: "Success", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error,
        });
    }
};

export const getMe = async (req: Request, res: Response) => {
    try {
        const userId = req.users;

        if (!userId) {
            return res.status(401).send({
                success: false,
                message: "Unauthorized",
            });
        }

        const user = await User.findById(userId);
        console.log(user);
        if (!user) {
            return res.status(401).send({
                success: false,
                message: "Unauthorized",
            });
        }

        const userObj = user.toObject();
        const { password, ...safeUser } = userObj as any;

        safeUser.postsHistory = await Promise.all(
            safeUser.postsHistory.map(async (item) => {
                const post = await Posts.findById(item.post_id);
                return {
                    is_correct: item.is_correct,
                    post,
                };
            })
        );
        console.log(safeUser);

        res.status(200).json({
            success: true,
            user: safeUser,
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
