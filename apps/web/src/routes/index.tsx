import useUser from "@/hooks/useUser";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
    component: HomeComponent,
});

function HomeComponent() {
    const { user } = useUser();
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

    const accuracy = user?.postsHistory.length
        ? (((user.postsCorrect || 0) / user.postsHistory.length) * 100).toFixed(
              1
          )
        : "0";

    const isShiftDone = hasPlayedToday();

    return (
        <div className="min-h-screen bg-zinc-950 text-green-500 flex flex-col items-center p-8 gap-12">
            {/* Header */}
            <div className="text-center space-y-2 mt-8">
                <h1 className="font-black text-5xl md:text-6xl tracking-tight">
                    Welcome back,{" "}
                    <span className="text-green-400">{user?.username}</span>!
                </h1>
                <p className="text-green-500/60 text-lg">
                    {isShiftDone
                        ? "You've completed today's shift! 🎉"
                        : "Ready for your daily shift?"}
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
                {/* Total EXP Card */}
                <div className="bg-black/40 border-2 border-green-500/30 rounded-lg p-6 hover:border-green-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20 justify-center">
                    <div className="flex flex-col items-center gap-3">
                        <p className="text-green-500/80 text-sm font-semibold uppercase tracking-wider text-xl">
                            Total EXP
                        </p>
                        <p className="text-4xl font-black text-green-400">
                            {user?.totalExp?.toLocaleString() || 0}
                        </p>
                    </div>
                </div>

                {/* Streak Card */}
                <div className="bg-black/40 border-2 border-green-500/30 rounded-lg p-6 hover:border-green-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20 justify-center">
                    <p className="text-green-500/80 text-sm font-semibold uppercase tracking-wider text-xl text-center mb-4">
                        Streak
                    </p>
                    <div className="flex justify-around">
                        <div className="text-center">
                            <p className="text-3xl font-black text-green-400">
                                {user?.currentStreak || 0}
                            </p>
                            <p className="text-green-500/60 text-xs mt-1">
                                Current
                            </p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl font-black text-green-400">
                                {user?.bestStreak || 0}
                            </p>
                            <p className="text-green-500/60 text-xs mt-1">
                                Best
                            </p>
                        </div>
                    </div>
                </div>

                {/* Posts Card */}
                <div className="bg-black/40 border-2 border-green-500/30 rounded-lg p-6 hover:border-green-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20 justify-center">
                    <p className="text-green-500/80 text-sm font-semibold uppercase tracking-wider text-xl text-center mb-4">
                        Posts
                    </p>
                    <div className="flex justify-around items-center">
                        <div className="text-center">
                            <p className="text-2xl font-black text-green-400">
                                {user?.postsHistory.length || 0}
                            </p>
                            <p className="text-green-500/60 text-xs mt-1">
                                Processed
                            </p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-black text-green-400">
                                {user?.postsCorrect || 0}
                            </p>
                            <p className="text-green-500/60 text-xs mt-1">
                                Correct
                            </p>
                        </div>
                    </div>
                    <div className="mt-4 text-center border-t border-green-500/20 pt-3">
                        <p className="text-lg font-bold text-green-400">
                            {accuracy}%
                        </p>
                        <p className="text-green-500/60 text-xs">Accuracy</p>
                    </div>
                </div>

                {/* Daily Shift Card */}
                <div className="bg-black/40 border-2 border-green-500/30 rounded-lg p-6 hover:border-green-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20 justify-center flex flex-col items-center justify-center gap-4">
                    <p className="text-green-500/80 text-sm font-semibold uppercase tracking-wider text-xl">
                        Daily Shift
                    </p>
                    {isShiftDone ? (
                        <div className="text-center">
                            <div className="text-4xl mb-2">✓</div>
                            <p className="text-green-400 font-semibold">
                                Completed
                            </p>
                            <p className="text-green-500/60 text-xs mt-1">
                                Come back tomorrow
                            </p>
                        </div>
                    ) : (
                        <Link
                            to="/play/daily"
                            className="bg-green-500 text-black font-bold px-8 py-3 rounded-lg hover:bg-green-400 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/50"
                        >
                            Start Shift
                        </Link>
                    )}
                </div>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap gap-4 justify-center mt-8">
                <Link
                    to="/history"
                    className="px-6 py-2 border border-green-500/30 rounded-lg hover:border-green-500 hover:bg-green-500/10 transition-all"
                >
                    View History
                </Link>
                <Link
                    to="/leaderboard"
                    className="px-6 py-2 border border-green-500/30 rounded-lg hover:border-green-500 hover:bg-green-500/10 transition-all"
                >
                    Leaderboard
                </Link>
                <Link
                    to="/skills-radar"
                    className="px-6 py-2 border border-green-500/30 rounded-lg hover:border-green-500 hover:bg-green-500/10 transition-all"
                >
                    Skills Radar
                </Link>
                <Link
                    to="/campaign"
                    className="px-6 py-2 border border-green-500/30 rounded-lg hover:border-green-500 hover:bg-green-500/10 transition-all"
                >
                    Campaign
                </Link>
            </div>
        </div>
    );
}
