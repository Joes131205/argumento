import useTheme from "@/hooks/useTheme";
import useUser from "@/hooks/useUser";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
    component: HomeComponent,
});

function HomeComponent() {
    const { user } = useUser();
    console.log(user);
    const { toggleTheme } = useTheme();

    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            toast.info("Please sign in to continue!");
            navigate({ to: "/sign-in" });
        }
    }, [user, navigate]);

    const hasPlayedToday = () => {
        if (!user?.lastPlayedDate) return false;

        const last = new Date(user.lastPlayedDate);
        const today = new Date();

        return (
            last.getDate() === today.getDate() &&
            last.getMonth() === today.getMonth() &&
            last.getFullYear() === today.getFullYear()
        );
    };

    const isShiftDone = hasPlayedToday();
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
                        {(user?.postsHistory.length ?? 0) > 0
                            ? Math.round(
                                  ((user?.postsCorrect ?? 0) /
                                      (user?.postsHistory.length ?? 0)) *
                                      100
                              )
                            : 0}
                        %
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                        {user?.postsCorrect || 0} /{" "}
                        {user?.postsHistory.length || 0} Correct
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {/* CARD 2: STREAK */}
                    <div className="bg-zinc-900 p-6 rounded border border-zinc-800">
                        <p className="text-xs font-bold uppercase text-zinc-500 mb-2">
                            Active Streak
                        </p>
                        <div className="flex items-baseline gap-3">
                            <p className="text-5xl font-black text-white">
                                {user?.currentStreak}
                            </p>
                            <span className="text-2xl">🔥</span>
                        </div>
                        <p className="text-xs text-zinc-500 mt-4 font-mono">
                            BEST: {user?.bestStreak} DAYS
                        </p>
                    </div>

                    {/* CARD 3: TOTAL XP */}
                    <div className="bg-zinc-900 p-6 rounded border border-zinc-800">
                        <p className="text-xs font-bold uppercase text-zinc-500 mb-2">
                            Total Experience
                        </p>
                        <p className="text-5xl font-black text-white">
                            {user?.totalExp}
                        </p>
                        <p className="text-xs text-zinc-500 mt-4 font-mono">
                            POSTS CLEANED: {user?.postProcessed || 0}
                        </p>
                    </div>
                </div>
                {/* Play Section */}
                <div className="lg:col-span-2 bg-zinc-900 p-8 rounded border border-zinc-700 relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold text-white mb-2">
                            DAILY SIMULATION
                        </h2>
                        <p className="text-zinc-400 mb-8 max-w-md">
                            {isShiftDone
                                ? "Protocol complete. New patterns generating..."
                                : "New viral misinformation detected. Immediate sanitization required."}
                        </p>

                        {isShiftDone ? (
                            <button
                                type="button"
                                disabled
                                className="bg-zinc-800 text-zinc-500 text-lg font-bold px-8 py-3 rounded cursor-not-allowed border border-zinc-700"
                            >
                                SHIFT COMPLETE (COOLDOWN)
                            </button>
                        ) : (
                            <Link
                                to="/play/daily"
                                className="inline-block bg-blue-600 hover:bg-blue-500 text-white text-lg font-bold px-10 py-4 rounded transition-transform hover:scale-105 shadow-[0_0_20px_rgba(37,99,235,0.3)]"
                            >
                                INITIALIZE SHIFT
                            </Link>
                        )}
                    </div>

                    {/* Decorative Background Element */}
                    <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-blue-900/20 to-transparent pointer-events-none" />
                </div>
            </div>
        </div>
    );
}
