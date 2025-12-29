import { getApiErrorMessage, instance } from "@/utils/api";

export const getLeaderboard = async (type = "totalExp") => {
    try {
        const res = await instance.get(`/leaderboard/${type}`);
        if (!res.data.success) {
            throw new Error(res.data.message || "Failed to fetch leaderboard");
        }
        return { data: res.data.data, type: res.data.type };
    } catch (error) {
        const message = getApiErrorMessage(
            error,
            "Failed to fetch leaderboard"
        );
        console.error(message, error);
        throw new Error(message);
    }
};
