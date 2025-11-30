import { instance } from "@/utils/api";

export const judge = async (
    headline: string,
    content: string,
    correctType: string,
    reason: string
) => {
    try {
        const res = await instance.post("/judge", {
            headline,
            content,
            correctType,
            reason,
        });
        console.log(res);
        return res.data;
    } catch (error) {
        console.log(error);
        return "SERVER ERROR";
    }
};
