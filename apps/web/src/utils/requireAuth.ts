import { getMe } from "@/apis/auth";
import { redirect } from "@tanstack/react-router";

export const requireAuth = async () => {
    const user = await getMe();
    if (!user) {
        throw redirect({
            to: "/sign-in",
            search: {
                redirect: window.location.pathname,
                message: "Please sign in to continue!",
            },
        });
    }
    return user;
};
