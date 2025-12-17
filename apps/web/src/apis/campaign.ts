import { instance } from "@/utils/api";

export const getLevel = async (level: string, id: string) => {
    try {
        const res = await instance.get(`/campaign/${level}/${id}`);
        console.log(res.data.part);
        return res.data.part;
    } catch (error) {
        console.log(error);
    }
};

export const getCampaign = async () => {
    try {
        const res = await instance.get("/campaign/");
        console.log(res);

        if (!res.data.success) {
            throw new Error("Error occurred");
        }
        console.log(res.data.campaign);

        return res.data.campaign;
    } catch (error) {
        console.log(error);
    }
};

export const completeCampaignLevel = async (level: string, id: string) => {
    try {
        const res = await instance.post(`/campaign/complete/${level}/${id}`);
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
    }
};
