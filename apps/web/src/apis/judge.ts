import { instance } from "@/utils/api";

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
        console.log(res);
        return res.data;
    } catch (error) {
        console.log(error);
        return "SERVER ERROR";
    }
};
