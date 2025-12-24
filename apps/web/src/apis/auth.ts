import { instance } from "@/utils/api";
import type { AxiosError } from "axios";
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
        const axiosError = error as AxiosError;
        const message =
            (axiosError.response?.data as { message?: string })?.message ||
            "Login failed";
        toast.error(message);
        throw error;
    }
};

export const register = async (username: string, password: string) => {
    try {
        const { data } = await instance.post("/auth/register", {
            username,
            password,
        });
        return data;
    } catch (error) {
        const axiosError = error as AxiosError;
        const message =
            (axiosError.response?.data as { message?: string })?.message ||
            "Registration failed";
        toast.error(message);
        throw error;
    }
};

export const getMe = async () => {
    try {
        const { data } = await instance.get("/auth");
        return data.user || null;
    } catch (error) {
        console.error("Failed to get user:", error);
        return null;
    }
};
