import { getApiErrorMessage, instance } from "@/utils/api";

export const judge = async (
    headline: string,
    content: string,
    slop_reasons: string[],
    user_reason: string
) => {
    try {
        const res = await instance.post("/judge", {
            headline,
            content,
            slop_reasons,
            user_reason,
        });
        if (!res.data.success) {
            throw new Error(res.data.message || "Failed to judge content");
        }
        return res.data;
    } catch (error) {
        const message = getApiErrorMessage(error, "Failed to judge content");
        console.error(message, error);
        throw new Error(message);
    }
};
