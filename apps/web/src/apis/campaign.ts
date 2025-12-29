import { getApiErrorMessage, instance } from "@/utils/api";

export const getLevel = async (level: string, id: string) => {
    try {
        const res = await instance.get(`/campaign/${level}/${id}`);
        if (!res.data.success) {
            throw new Error(res.data.message || "Failed to fetch level");
        }
        return res.data.part;
    } catch (error) {
        const message = getApiErrorMessage(error, "Failed to fetch level");
        console.error(message, error);
        throw new Error(message);
    }
};

export const getCampaign = async () => {
    try {
        const res = await instance.get("/campaign/");
        if (!res.data.success) {
            throw new Error(res.data.message || "Failed to fetch campaign");
        }
        return res.data.campaign;
    } catch (error) {
        const message = getApiErrorMessage(error, "Failed to fetch campaign");
        console.error(message, error);
        throw new Error(message);
    }
};

export const completeCampaignLevel = async (level: string, id: string) => {
    try {
        const res = await instance.post(`/campaign/complete/${level}/${id}`);
        if (!res.data.success) {
            throw new Error(
                res.data.message || "Failed to complete campaign level"
            );
        }
        return res;
    } catch (error) {
        const message = getApiErrorMessage(
            error,
            "Failed to complete campaign level"
        );
        console.error(message, error);
        throw new Error(message);
    }
};
