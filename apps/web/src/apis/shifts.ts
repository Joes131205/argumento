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

export const completeShift = async (history) => {
    try {
        const res = await instance.put("/shifts/complete", { history });
        console.log(res);
    } catch (error) {
        console.log(error);
        return "SERVER ERROR";
    }
};
