import { campaign } from "@/utils/campaign";
import type { Request, Response } from "express";

export const getLevel = async (req: Request, res: Response) => {
    try {
        const { level, id }: { level: String; id: String } = req.params;
        const campaign = campaign[level];
        const part = campaign.levels[id];
        res.status(200).json({
            success: true,
            message: "Success",
            campaign,
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
        res.status(200).json({ success: true, campaign });
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
