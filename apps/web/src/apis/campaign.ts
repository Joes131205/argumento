import { instance } from "@/utils/api";

export const getLevel = async (level: string, id: string) => {
    try {
        const res = await instance.get(`/campaign/${level}/${id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getCampaign = async () => {
    try {
        const res = await instance.get("/campaign/");
        if (!res.data.isSuccess) {
            throw new Error("Error occurred");
        }
        console.log(res.data.campaign);

        return res;
    } catch (error) {
        console.log(error);
    }
};

export const completeCampaignLevel = async (level: string, id: string) => {
    try {
        const res = await instance.post(`/campaign/complete/${level}/${id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
