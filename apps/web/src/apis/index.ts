import { getApiErrorMessage, instance } from "@/utils/api";

export const healthCheck = async () => {
    try {
        const res = await instance.get("/");
        if (res.status === 200) {
            return "OK";
        }
        return "NOT OK";
    } catch (error) {
        const message = getApiErrorMessage(error, "Health check failed");
        console.error(message, error);
        throw new Error(message);
    }
};
