import { getApiErrorMessage, instance } from "@/utils/api";

export const getShops = async () => {
    try {
        const res = await instance.get("/shops");
        if (!res.data.success) {
            throw new Error(res.data.message || "Failed to fetch shop");
        }
        return res.data.shop;
    } catch (error: unknown) {
        const message = getApiErrorMessage(error, "Failed to fetch shop");
        if (
            error instanceof Object &&
            "status" in error &&
            error.status === 404
        ) {
            return null;
        }
        console.error(message, error);
        throw new Error(message);
    }
};
