import { instance } from "@/utils/api";

export const login = async (username: string, password: string) => {
    try {
        const res = await instance.post("/auth/login", { username, password });

        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const register = async (username: string, password: string) => {
    try {
        const res = await instance.post("/auth/register", {
            username,
            password,
        });
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getMe = async () => {
    try {
        const res = await instance.get("/auth");
        if (res.data?.data) {
            return res.data.data;
        }
        return null;
    } catch (error) {
        console.log(error);
    }
};
