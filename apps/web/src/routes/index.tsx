import useTheme from "@/hooks/useTheme";
import useUser from "@/hooks/useUser";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
    component: HomeComponent,
});

function HomeComponent() {
    const { user } = useUser();

    const { toggleTheme } = useTheme();

    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            toast.info("Please sign in to continue!");
            navigate({ to: "/sign-in" });
        }
    }, [user, navigate]);

    return (
        <div className="container mx-auto max-w-3xl px-4 py-2">
            <h3>Welcome back! {user?.username}</h3>
            <button type="button" onClick={toggleTheme}>
                Change Theme
            </button>
        </div>
    );
}
