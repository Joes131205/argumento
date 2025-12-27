import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
    Activity,
    BarChart3,
    CheckCircle,
    Flame,
    History,
    LogOut,
    Map as MapIcon,
    Play,
    Radar,
    Shield,
    Trophy,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import useUser from "@/hooks/useUser";
import { requireAuth } from "@/utils/requireAuth";

export const Route = createFileRoute("/")({
    beforeLoad: requireAuth,
    component: HomeComponent,
});

function HomeComponent() {
    const { user, logOut, invalidateUser } = useUser();
    const navigate = useNavigate();
    const [currentTime, setCurrentTime] = useState(
        new Date().toLocaleTimeString()
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

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
        : "0.0";

    const isShiftDone = hasPlayedToday();

    return (
        <div className="min-h-screen bg-zinc-950 p-6 font-mono text-zinc-300 lg:p-12">
            <div className="mx-auto max-w-7xl space-y-8">
                {/* --- HEADER SECTION --- */}
                <div className="flex flex-col items-start justify-between gap-4 border-green-500 border-b pb-6 md:flex-row md:items-end">
                    <div>
                        <div className="mb-2 flex items-center gap-2 text-green-600">
                            <Shield size={20} />
                            <span className="font-bold text-xs uppercase tracking-widest">
                                Logged in as
                            </span>
                        </div>
                        <h1 className="font-bold text-4xl text-white uppercase tracking-tight">
                            {user?.username}
                        </h1>
                    </div>
                    <div className="hidden text-right md:block">
                        <p className="text-xs text-zinc-600 uppercase tracking-widest">
                            Server Time
                        </p>
                        <p className="font-bold text-xl text-zinc-400">
                            {currentTime}
                        </p>
                    </div>
                </div>

                {/* --- MAIN STATS GRID --- */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {/* 1. EXPERIENCE CARD */}
                    <div className="flex flex-col justify-between border border-green-500 bg-zinc-950/50 p-6 transition-colors hover:border-zinc-700">
                        <div className="mb-4 flex items-start justify-between">
                            <span className="font-bold text-xs text-zinc-500 uppercase tracking-wider">
                                Total Exp
                            </span>
                            <Activity size={18} className="text-green-600" />
                        </div>
                        <div>
                            <span className="block font-bold text-3xl text-white">
                                {user?.totalExp?.toLocaleString() || 0}
                            </span>
                            <span className="text-xs text-zinc-600">
                                XP Points Accumulated
                            </span>
                        </div>
                    </div>

                    {/* 2. STREAK CARD */}
                    <div className="flex flex-col justify-between border border-green-500 bg-zinc-950/50 p-6 transition-colors hover:border-zinc-700">
                        <div className="mb-4 flex items-start justify-between">
                            <span className="font-bold text-xs text-zinc-500 uppercase tracking-wider">
                                Streak
                            </span>
                            <Flame size={18} className="text-green-600" />
                        </div>
                        <div className="flex gap-8">
                            <div>
                                <span className="block font-bold text-3xl text-white">
                                    {user?.currentStreak || 0}
                                </span>
                                <span className="text-xs text-zinc-600">
                                    Current
                                </span>
                            </div>
                            <div>
                                <span className="block font-bold text-3xl text-zinc-500">
                                    {user?.bestStreak || 0}
                                </span>
                                <span className="text-xs text-zinc-600">
                                    Record
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* 3. PERFORMANCE CARD */}
                    <div className="flex flex-col justify-between border border-green-500 bg-zinc-950/50 p-6 transition-colors hover:border-zinc-700">
                        <div className="mb-4 flex items-start justify-between">
                            <span className="font-bold text-xs text-zinc-500 uppercase tracking-wider">
                                Performance
                            </span>
                            <BarChart3 size={18} className="text-green-600" />
                        </div>
                        <div className="flex items-end justify-between">
                            <div>
                                <span className="block font-bold text-3xl text-white">
                                    {accuracy}%
                                </span>
                                <span className="text-xs text-zinc-600">
                                    Accuracy Rating
                                </span>
                            </div>
                            <div className="text-right">
                                <span className="block font-bold text-lg text-zinc-400">
                                    {user?.postsCorrect}/
                                    {user?.postsHistory.length}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* 4. ACTIVE ASSIGNMENT (CTA) */}
                    <div
                        className={`flex flex-col justify-between border-l-4 p-6 transition-all ${
                            isShiftDone
                                ? "border-zinc-700 border-l-zinc-500 bg-zinc-950/30"
                                : "border-green-500 border-l-green-500 bg-green-950/10 hover:bg-green-950/20"
                        }
                    `}
                    >
                        <div className="mb-4 flex items-start justify-between">
                            <span
                                className={`font-bold text-xs uppercase tracking-wider ${isShiftDone ? "text-zinc-500" : "text-green-600"}`}
                            >
                                Daily Assignment
                            </span>
                            {isShiftDone ? (
                                <CheckCircle
                                    size={18}
                                    className="text-zinc-500"
                                />
                            ) : (
                                <Play
                                    size={18}
                                    className="animate-pulse text-green-500"
                                />
                            )}
                        </div>

                        {isShiftDone ? (
                            <div>
                                <span className="mb-1 block font-bold text-xl text-zinc-400">
                                    Shift Complete
                                </span>
                                <span className="text-xs text-zinc-600">
                                    Come back tomorrow.
                                </span>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3">
                                <span className="text-sm text-zinc-400">
                                    Pending tasks available.
                                </span>
                                <Link
                                    to="/play/daily"
                                    className="w-full bg-green-600 px-4 py-2 text-center font-bold text-black text-sm uppercase transition-colors hover:bg-green-500"
                                >
                                    Initiate Shift
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* --- QUICK NAVIGATION --- */}
                <div className="pt-8">
                    <h3 className="mb-4 font-bold text-xs text-zinc-500 uppercase tracking-widest">
                        Navigation
                    </h3>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
                        <Link
                            to="/history"
                            className="group flex flex-col items-center gap-3 border border-green-500 bg-zinc-950 p-4 text-center transition-all hover:border-green-600"
                        >
                            <History className="text-zinc-500 transition-colors group-hover:text-green-500" />
                            <span className="font-bold text-sm text-zinc-300 group-hover:text-white">
                                History Logs
                            </span>
                        </Link>

                        <Link
                            to="/leaderboard"
                            className="group flex flex-col items-center gap-3 border border-green-500 bg-zinc-950 p-4 text-center transition-all hover:border-green-600"
                        >
                            <Trophy className="text-zinc-500 transition-colors group-hover:text-green-500" />
                            <span className="font-bold text-sm text-zinc-300 group-hover:text-white">
                                Rankings
                            </span>
                        </Link>

                        <Link
                            to="/skills-radar"
                            className="group flex flex-col items-center gap-3 border border-green-500 bg-zinc-950 p-4 text-center transition-all hover:border-green-600"
                        >
                            <Radar className="text-zinc-500 transition-colors group-hover:text-green-500" />
                            <span className="font-bold text-sm text-zinc-300 group-hover:text-white">
                                Skill Matrix
                            </span>
                        </Link>

                        <Link
                            to="/campaign"
                            className="group flex flex-col items-center gap-3 border border-green-500 bg-zinc-950 p-4 text-center transition-all hover:border-green-600"
                        >
                            <MapIcon className="text-zinc-500 transition-colors group-hover:text-green-500" />
                            <span className="font-bold text-sm text-zinc-300 group-hover:text-white">
                                Campaign Map
                            </span>
                        </Link>

                        <button
                            type="button"
                            onClick={async () => {
                                await logOut();
                                await invalidateUser();
                                toast.info("Session Terminated.");
                                navigate({ to: "/sign-in" });
                            }}
                            className="group flex cursor-pointer flex-col items-center gap-3 border border-green-500 bg-zinc-950 p-4 text-center transition-all hover:border-red-600"
                        >
                            <LogOut className="text-zinc-500 transition-colors group-hover:text-red-500" />
                            <span className="font-bold text-sm text-zinc-300 group-hover:text-white">
                                Terminate Session
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
