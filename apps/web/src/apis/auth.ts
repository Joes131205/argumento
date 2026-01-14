import { getApiErrorMessage, instance } from "@/utils/api";
import { toast } from "sonner";

export const login = async (username: string, password: string) => {
    try {
        const { data } = await instance.post("/auth/login", {
            username,
            password,
        });
        if (!data.success) {
            throw new Error(data.message || "Login failed");
        }
        return data;
    } catch (error: unknown) {
        const message = getApiErrorMessage(error, "Login failed");
        toast.error(message);
        throw new Error(message);
    }
};

export const register = async (
    username: string,
    password: string,
    email: string
) => {
    try {
        const { data } = await instance.post("/auth/register", {
            username,
            password,
            email,
        });
        if (!data.success) {
            throw new Error(data.message || "Registration failed");
        }
        return data;
    } catch (error) {
        const message = getApiErrorMessage(error, "Registration failed");
        toast.error(message);
        throw new Error(message);
    }
};

export const getMe = async () => {
    try {
        const { data } = await instance.get("/auth");
        return data.user || null;
    } catch (error) {
        const message = getApiErrorMessage(error, "Failed to get user");
        console.error(message, error);
        return null;
    }
};

export const verifyEmail = async (id: string) => {
    try {
        await instance.put(`/auth/verify/${id}`);
    } catch (error) {
        const message = getApiErrorMessage(error, "Failed to get user");
        console.error(message, error);
        return null;
    }
};

export const sendVerifyEmail = async (email: string) => {
    try {
        await instance.post("/auth/verify/", { email });
    } catch (error) {
        const message = getApiErrorMessage(error, "Failed to get user");
        console.error(message, error);
        return null;
    }
};

export const generateResetToken = async (email: string) => {
    try {
        await instance.post("/auth/reset", { email });
    } catch (error) {
        const message = getApiErrorMessage(error, "Failed to get user");
        console.error(message, error);
        return null;
    }
};

export const resetPassword = async (id: string, newPassword: string) => {
    try {
        await instance.put(`/auth/reset/${id}`, { newPassword });
    } catch (error) {
        const message = getApiErrorMessage(error, "Failed to get user");
        console.error(message, error);
        return null;
    }
};

export const deleteAccount = async () => {
    try {
        await instance.delete("/auth");
    } catch (error) {
        const message = getApiErrorMessage(error, "Failed to get user");
        console.error(message, error);
        return null;
    }
};
