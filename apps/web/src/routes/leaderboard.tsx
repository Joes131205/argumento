import { createFileRoute, Link } from "@tanstack/react-router";
import { Crown, Filter, Loader2, Medal } from "lucide-react";
import { useEffect, useState } from "react";
import { getLeaderboard } from "@/apis/leaderboard";
import useUser from "@/hooks/useUser";

interface LeaderboardEntry {
    _id: string;
    username: string;
    totalExp: number;
    bestStreak: number;
    currentStreak: number;
    postsProcessed: number;
    postsCorrect: number;
}

interface LeaderboardData {
    data: LeaderboardEntry[];
}

export const Route = createFileRoute("/leaderboard")({
    component: RouteComponent,
});

const sortFields = [
    { key: "totalExp", label: "Total EXP" },
    { key: "bestStreak", label: "Best Streak" },
    { key: "currentStreak", label: "Current Streak" },
    { key: "postsProcessed", label: "Processed" },
    { key: "postsCorrect", label: "Accuracy Score" },
];

function RouteComponent() {
    const { user } = useUser();

    const [data, setData] = useState<LeaderboardData | undefined>(undefined);
    const [type, setType] = useState("totalExp");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            setIsLoading(true);
            try {
                const response = await getLeaderboard(type);
                setData(response);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchLeaderboard();
    }, [type]);

    const getRankIcon = (index: number) => {
        if (index === 0) return <Crown className="text-yellow-400" size={24} />;
        if (index === 1) return <Medal className="text-zinc-300" size={24} />;
        if (index === 2) return <Medal className="text-amber-600" size={24} />;
        return <span className="font-mono text-zinc-600">#{index + 1}</span>;
    };

    const getRowStyle = (index: number, isMe: boolean) => {
        if (isMe) {
            return {
                backgroundColor: "var(--accent-muted)",
                borderLeftWidth: "4px",
                borderLeftColor: "var(--accent-color)",
            };
        }
        if (index === 0)
            return {
                backgroundColor: "rgba(180, 83, 9, 0.1)",
                borderLeftWidth: "2px",
                borderLeftColor: "rgba(217, 119, 6, 0.5)",
            };
        if (index === 1)
            return {
                backgroundColor: "rgba(24, 24, 27, 1)",
                borderLeftWidth: "2px",
                borderLeftColor: "rgb(113, 113, 122)",
            };
        if (index === 2)
            return {
                backgroundColor: "rgba(180, 83, 9, 0.1)",
                borderLeftWidth: "2px",
                borderLeftColor: "rgba(180, 83, 9, 0.5)",
            };
        return {
            backgroundColor: "transparent",
            borderLeftWidth: "2px",
            borderLeftColor: "transparent",
        };
    };

    if (isLoading && !data) {
        return (
            <div className="theme-accent flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-4 font-mono">
                <Loader2 className="animate-spin" size={40} />
                <p className="animate-pulse text-sm uppercase tracking-widest">
                    Fetching Global Rankings...
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-4rem)] p-6 font-mono text-zinc-300 lg:p-12">
            <div className="mx-auto flex max-w-6xl flex-col gap-8">
                <div className="flex flex-col gap-4">
                    <div className="mt-4 border-zinc-800 border-b pb-6">
                        <h1 className="font-black text-4xl text-white uppercase tracking-tight md:text-5xl">
                            Leaderboard
                        </h1>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 font-bold text-xs text-zinc-500 uppercase tracking-wider">
                        <Filter size={14} />
                        Sort Parameters
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {sortFields.map((t) => (
                            <button
                                key={t.key}
                                type="button"
                                onClick={() => setType(t.key)}
                                className={`cursor-pointer border px-4 py-2 font-bold text-xs uppercase tracking-wider transition-all ${
                                    type === t.key
                                        ? "theme-accent-solid theme-glow border-current text-black"
                                        : "hover:theme-accent border-zinc-800 bg-zinc-950 text-zinc-500 hover:border-current"
                                }
                                `}
                            >
                                {t.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="w-full border border-zinc-800 bg-zinc-950/50">
                    <div className="grid grid-cols-[60px_1fr_120px] gap-4 border-zinc-800 border-b bg-zinc-950 p-4 font-bold text-xs text-zinc-500 uppercase tracking-widest md:grid-cols-[80px_1fr_150px]">
                        <p className="text-center">Rank</p>
                        <p>Username</p>
                        <p className="text-right">Score Value</p>
                    </div>

                    <div className="divide-y divide-zinc-900">
                        {data?.data?.map(
                            (entry: LeaderboardEntry, index: number) => {
                                const isCurrentUser = user?._id === entry._id;
                                const activeSortLabel = sortFields.find(
                                    (s) => s.key === type,
                                )?.label;

                                return (
                                    <Link
                                        to="/profile/$id"
                                        params={{ id: entry?._id || "" }}
                                        key={entry._id || index}
                                        className="grid grid-cols-[60px_1fr_120px] items-center gap-4 p-4 transition-all md:grid-cols-[80px_1fr_150px]"
                                        style={getRowStyle(
                                            index,
                                            isCurrentUser,
                                        )}
                                    >
                                        <div className="flex items-center justify-center">
                                            {getRankIcon(index)}
                                        </div>

                                        <div className="flex items-center gap-3 overflow-hidden">
                                            <span
                                                className={`truncate font-bold ${isCurrentUser ? "theme-accent" : "text-zinc-300"}`}
                                            >
                                                {entry.username}
                                            </span>
                                            {isCurrentUser && (
                                                <span className="theme-accent-border theme-accent-bg theme-accent hidden rounded border px-1.5 py-0.5 text-[10px] uppercase md:inline-block">
                                                    YOU
                                                </span>
                                            )}
                                        </div>

                                        <div className="text-right">
                                            <span className="block font-bold font-mono text-lg text-white">
                                                {entry[
                                                    type as keyof LeaderboardEntry
                                                ]?.toLocaleString() || 0}
                                            </span>
                                            {index === 0 && (
                                                <span className="hidden text-[10px] text-zinc-600 uppercase md:block">
                                                    {activeSortLabel}
                                                </span>
                                            )}
                                        </div>
                                    </Link>
                                );
                            },
                        )}
                    </div>

                    {(!data?.data || data.data.length === 0) && (
                        <div className="border-zinc-800 border-t p-16 text-center">
                            <p className="text-sm text-zinc-600 uppercase tracking-widest">
                                No Data Found
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
