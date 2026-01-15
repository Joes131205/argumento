import type { IPostVerdict } from "@/types";
import { getApiErrorMessage, instance } from "@/utils/api";

export const fetchPost = async (postLength: number) => {
    try {
        const res = await instance.post("/shifts", { postLength });
        if (!res.data.success) {
            throw new Error(res.data.message || "Failed to fetch shifts");
        }
        return res.data.data;
    } catch (error) {
        const message = getApiErrorMessage(error, "Failed to fetch shifts");
        console.error(message, error);
        throw new Error(message);
    }
};

export const completeShift = async (history: IPostVerdict[]) => {
    try {
        const res = await instance.put("/shifts/complete", { history });
        if (!res.data.success) {
            throw new Error(res.data.message || "Failed to complete shift");
        }
    } catch (error) {
        const message = getApiErrorMessage(error, "Failed to complete shift");
        console.error(message, error);
        throw new Error(message);
    }
};

export const generateDailyShift = async (
    postLength: number,
    types: Record<string, string[]>
) => {
    try {
        const res = await instance.post("/shifts/generate", {
            postLength,
            types,
        });
        if (!res.data.success) {
            throw new Error(res.data.message || "Failed to generate shift");
        }
        return res.data.posts;
    } catch (error) {
        const message = getApiErrorMessage(error, "Failed to generate shift");
        console.error(message, error);
        throw new Error(message);
    }
};

export const generatePracticeShift = async (
    postLength: number,
    types: Record<string, string[]>
) => {
    try {
        const res = await instance.post("/shifts/practice", {
            postLength,
            types,
        });
        if (!res.data.success) {
            throw new Error(
                res.data.message || "Failed to generate practice shift"
            );
        }
        return res.data.posts;
    } catch (error) {
        const message = getApiErrorMessage(
            error,
            "Failed to generate practice shift"
        );
        console.error(message, error);
        throw new Error(message);
    }
};
