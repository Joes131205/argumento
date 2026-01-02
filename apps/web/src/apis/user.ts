import { getApiErrorMessage, instance } from "@/utils/api";

export const getUserById = async (userId: string) => {
    try {
        const res = await instance.get(`/users/${userId}`);
        if (!res.data.success) {
            throw new Error(res.data.message || "Failed to fetch user");
        }
        return res.data.user;
    } catch (error: unknown) {
        const message = getApiErrorMessage(error, "Failed to fetch user");
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

export const equipTheme = async (itemId: string) => {
    try {
        const res = await instance.put("/users/theme", { itemId });
        if (!res.data.success) {
            throw new Error(res.data.message || "Failed to fetch shop");
        }
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
