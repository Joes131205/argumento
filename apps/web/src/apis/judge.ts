import { instance } from "@/utils/api";

export const healthCheck = async (
    headline: string,
    content: string,
    isRejected: boolean,
    reason: string
) => {
    try {
        const res = await instance.post("/judge", {
            headline,
            content,
            isRejected,
            reason,
        });
        if (res.status === 200) {
            return "OK";
        }
        return "NOT OK";
    } catch (error) {
        console.log(error);
        return "SERVER ERROR";
    }
};
