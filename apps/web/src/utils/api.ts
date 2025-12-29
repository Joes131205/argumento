import type { AxiosError } from "axios";
import axios from "axios";

type ApiErrorPayload = {
    message?: string;
    error?: string;
    errors?: string[];
};

export const getApiErrorMessage = (
    error: unknown,
    fallback = "Unexpected server error"
) => {
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiErrorPayload>;
        const data = axiosError.response?.data;
        const aggregatedErrors = Array.isArray(data?.errors)
            ? data?.errors.filter(Boolean).join(", ")
            : undefined;

        return (
            data?.message ||
            data?.error ||
            aggregatedErrors ||
            axiosError.message ||
            fallback
        );
    }

    if (error instanceof Error && error.message) {
        return error.message;
    }

    return fallback;
};

export const instance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    timeout: 50000,
});

instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);
