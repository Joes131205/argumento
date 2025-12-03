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
            <div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <p>Total EXP</p>
                    <p>{user?.totalExp || 0} EXP</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <p className="text-xs font-bold uppercase text-gray-400 mb-2">
                        Accuracy Rating
                    </p>
                    <p className="text-4xl font-black">
                        {(user?.postProcessed ?? 0) > 0
                            ? Math.round(
                                  ((user?.postsCorrect ?? 0) /
                                      (user?.postProcessed ?? 0)) *
                                      100
                              )
                            : 0}
                        %
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                        {user?.postsCorrect || 0} / {user?.postProcessed || 0}{" "}
                        Correct
                    </p>
                </div>
            </div>
        </div>
    );
}
