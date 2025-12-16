import User from "@/db/models/User";
import { campaign_level } from "@/utils/campaign";
import type { Request, Response } from "express";

export const getLevel = async (req: Request, res: Response) => {
    try {
        const { level, id }: { level: string; id: string } = req.params;
        console.log(level, id);
        const campaign = campaign_level[level];
        const part = campaign.levels[id];
        console.log(campaign, part);
        res.status(200).json({
            success: true,
            message: "Success",
            part,
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
export const getCampaign = async (req: Request, res: Response) => {
    try {
        res.status(200).json({ success: true, campaign: campaign_level });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error,
        });
    }
};
export const completeCampaignLevel = async (req: Request, res: Response) => {
    try {
        const { level, id }: { level: string; id: string } = req.params;

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

        // TODO
        await User.findByIdAndUpdate(userId, {
            $addToSet: {
                [`campaign_progress.${level}`]: id,
            },
        });

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
