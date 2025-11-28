import { instance } from "@/utils/api";

export const healthCheck = async () => {
    try {
        const res = await instance.get("/");
        if (res.status === 200) {
            return "OK";
        }
        return "NOT OK";
    } catch (error) {
        console.log(error);
        return "SERVER ERROR";
    }
};
