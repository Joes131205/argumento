import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getLeaderboard } from "@/apis/leaderboard";
import BackButton from "@/components/BackButton";
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

const sortField = [
    "totalExp",
    "bestStreak",
    "currentStreak",
    "postsProcessed",
    "postsCorrect",
];
const medals = ["🥇", "🥈", "🥉"];

const sortName = {
    totalExp: "Total EXP",
    bestStreak: "Best Streak",
    currentStreak: "Current Streak",
    postsProcessed: "Posts Processed",
    postsCorrect: "Posts Correct",
};

function RouteComponent() {
    const { user } = useUser();

    const [data, setData] = useState<LeaderboardData | undefined>(undefined);
    const [type, setType] = useState("totalExp");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | undefined>(undefined);
    useEffect(() => {
        const fetchLeaderboard = async () => {
            setIsLoading(true);
            setError(undefined);
            try {
                const response = await getLeaderboard(type);
                if (response === "SERVER ERROR") {
                    throw new Error("Server Error");
                }
                console.log(response);
                setData(response);
            } catch (error) {
                setError(
                    error instanceof Error ? error : new Error(String(error))
                );
            } finally {
                setIsLoading(false);
            }
        };

        fetchLeaderboard();
    }, [type]);

    if (isLoading) {
        return (
            <div className="flex h-screen flex-col items-center justify-center">
                <p className="font-mono text-xl">Loading leaderboard...</p>
            </div>
        );
    }
    if (error) {
        return (
            <div>
                <p>Error!</p>
                <p>{error.message || String(error)}</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center gap-5 p-5">
            <BackButton />

            <h2 className="font-black text-5xl tracking-tight md:text-6xl">
                Leaderboard
            </h2>
            <div className="flex flex-col items-center gap-2">
                <p className="font-semibold text-green-500/80 text-sm uppercase tracking-wider">
                    Sort by
                </p>
                <div className="space-x-5">
                    {sortField.map((t: string) => (
                        <button
                            key={t}
                            type="button"
                            onClick={() => setType(t)}
                            className={`group/btn relative cursor-pointer overflow-hidden border px-4 py-2 font-bold text-xs uppercase tracking-wider transition-all ${
                                type === t
                                    ? "border-green-500 bg-green-600 text-black shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                                    : "border-green-900 bg-black text-green-700 hover:border-green-500 hover:text-green-400"
                            }`}
                        >
                            {sortName[t as keyof typeof sortName]}
                        </button>
                    ))}
                </div>
            </div>
            {/* Leaderboard Table */}
            <div className="w-full max-w-4xl overflow-hidden rounded-lg border-2 border-green-500/30 bg-black/40 shadow-green-500/10 shadow-xl">
                {/* Table Header */}
                <div className="grid grid-cols-[60px_1fr_120px] gap-4 border-green-500/30 border-b bg-green-500/10 p-4 font-bold text-green-400">
                    <div>Rank</div>
                    <div>Username</div>
                    <div className="text-right">
                        {sortName[type as keyof typeof sortName]}
                    </div>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-green-500/20">
                    {data?.data?.map(
                        (entry: LeaderboardEntry, index: number) => {
                            const isCurrentUser = user?._id === entry._id;
                            return (
                                <div
                                    key={entry._id || index}
                                    className={`grid grid-cols-[60px_1fr_120px] items-center gap-4 p-4 transition-all duration-200 ${
                                        isCurrentUser
                                            ? "border-green-400 border-b-0 border-l-4 bg-green-500/20"
                                            : "hover:bg-green-500/5"
                                    }`}
                                >
                                    {/* Rank */}
                                    <div className="font-bold text-2xl">
                                        {index < 3 ? (
                                            <span className="text-3xl">
                                                {medals[index]}
                                            </span>
                                        ) : (
                                            <span className="text-green-500/60">
                                                #{index + 1}
                                            </span>
                                        )}
                                    </div>

                                    {/* Username */}
                                    <div className="flex items-center gap-2 font-semibold">
                                        {entry.username.slice(0, 15) +
                                            `${entry.username.length > 15 ? "..." : ""}`}
                                        {isCurrentUser && (
                                            <span className="rounded bg-green-500/20 px-2 py-1 text-green-400 text-xs">
                                                YOU
                                            </span>
                                        )}
                                    </div>

                                    {/* Score */}
                                    <div className="text-right font-bold font-mono text-green-400 text-lg">
                                        {entry[
                                            type as keyof LeaderboardEntry
                                        ]?.toLocaleString() || 0}
                                    </div>
                                </div>
                            );
                        }
                    )}
                </div>

                {/* Empty State */}
                {(!data?.data || data.data.length === 0) && (
                    <div className="p-12 text-center text-green-500/60">
                        <p className="mb-2 text-2xl">👻</p>
                        <p>No entries found</p>
                    </div>
                )}
            </div>
        </div>
    );
}
