import { instance } from "@/utils/api";

export const fetchPost = async (postLength: number) => {
    try {
        const res = await instance.post("/shifts", { postLength });
        console.log(res);
        return res.data.data;
    } catch (error) {
        console.log(error);
        return "SERVER ERROR";
    }
};
