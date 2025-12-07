import { instance } from "@/utils/api";

export const getLeaderboard = async (type = "totalExp") => {
    try {
        const res = await instance.get(`/leaderboard/${type}`);
        console.log(res);
        return { data: res.data.data, type: res.data.type };
    } catch (error) {
        console.log(error);
        return "SERVER ERROR";
    }
};
