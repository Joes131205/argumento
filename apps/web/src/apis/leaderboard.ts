import { instance } from "@/utils/api";

export const getLeaderboard = async (type = "exp") => {
    try {
        const res = await instance.get(`/leaderboard/${type}`);
        console.log(res);
        return res.data.data;
    } catch (error) {
        console.log(error);
        return "SERVER ERROR";
    }
};
