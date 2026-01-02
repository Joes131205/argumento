import { createFileRoute, Link } from "@tanstack/react-router";
import {
    Activity,
    BarChart3,
    CheckCircle,
    Coins,
    Flame,
    Play,
    Shield,
} from "lucide-react";
import { useEffect, useState } from "react";
import useUser from "@/hooks/useUser";
import { requireAuth } from "@/utils/requireAuth";
import { motion } from "motion/react";

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    show: { opacity: 1, y: 0 },
};

export const Route = createFileRoute("/dashboard")({
    beforeLoad: requireAuth,
    component: HomeComponent,
});

function HomeComponent() {
    const { user } = useUser();
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
        <div className="min-h-screen max-w-10xl p-6 font-mono text-zinc-300 lg:p-12">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="mx-auto max-w-6xl space-y-8"
            >
                <div className="flex flex-col items-start justify-between gap-4 border-b border-current pb-6 md:flex-row md:items-end">
                    <div>
                        <div className="mb-2 flex items-center gap-2">
                            <Shield size={20} className="theme-accent" />
                            <span className="font-bold text-xs uppercase tracking-widest theme-accent">
                                Logged in as
                            </span>
                        </div>
                        <h1 className="font-black text-4xl uppercase tracking-tight text-white md:text-5xl">
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

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col justify-between border theme-accent-border bg-zinc-950/50 p-6 transition-colors"
                    >
                        <div className="mb-4 flex items-start justify-between">
                            <span className="font-bold text-xs text-zinc-500 uppercase tracking-wider">
                                Total Exp
                            </span>
                            <Activity size={18} className="theme-accent" />
                        </div>
                        <div>
                            <span className="block font-bold text-3xl text-white">
                                {user?.totalExp?.toLocaleString() || 0}
                            </span>
                            <span className="text-xs text-zinc-600">
                                XP Points Accumulated
                            </span>
                        </div>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col justify-between border theme-accent-border bg-zinc-950/50 p-6 transition-colors"
                    >
                        <div className="mb-4 flex items-start justify-between">
                            <span className="font-bold text-xs text-zinc-500 uppercase tracking-wider">
                                Total Coins
                            </span>
                            <Coins size={18} className="theme-accent" />
                        </div>
                        <div>
                            <span className="block font-bold text-3xl text-white">
                                {user?.totalCoins?.toLocaleString() || 0}
                            </span>
                            <span className="text-xs text-zinc-600">
                                Total Coins Accumulated
                            </span>
                        </div>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col justify-between border theme-accent-border bg-zinc-950/50 p-6 transition-color"
                    >
                        <div className="mb-4 flex items-start justify-between">
                            <span className="font-bold text-xs text-zinc-500 uppercase tracking-wider">
                                Streak
                            </span>
                            <Flame size={18} className="theme-accent" />
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
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col justify-between border theme-accent-border bg-zinc-950/50 p-6 transition-colors"
                    >
                        <div className="mb-4 flex items-start justify-between">
                            <span className="font-bold text-xs text-zinc-500 uppercase tracking-wider">
                                Performance
                            </span>
                            <BarChart3 size={18} className="theme-accent" />
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
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className={`flex flex-col justify-between border-l-4 border theme-accent-border p-6 transition-all ${
                            isShiftDone
                                ? "border-zinc-700 border-l-zinc-500 bg-zinc-950/30"
                                : "theme-accent-bg/40 hover:theme-accent-bg/50"
                        }
                    `}
                    >
                        <div className="mb-4 flex items-start justify-between">
                            <span
                                className={`font-bold text-xs uppercase tracking-wider ${isShiftDone ? "text-zinc-500" : "theme-accent"}`}
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
                                    className="animate-pulse theme-accent"
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
                                    className="w-full theme-accent-solid px-4 py-2 text-center font-bold text-sm text-black uppercase transition-colors hover:opacity-90"
                                >
                                    Initiate Shift
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
