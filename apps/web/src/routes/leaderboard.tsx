import { getLeaderboard } from "@/apis/leaderboard";
import BackButton from "@/components/BackButton";
import useUser from "@/hooks/useUser";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { useEffect, useState } from "react";

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

    const [data, setData] = useState({});
    const [type, setType] = useState("totalExp");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchLeaderboard = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await getLeaderboard(type);
                if (response === "SERVER ERROR") {
                    throw new Error("Server Error");
                }
                setData(response);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchLeaderboard();
    }, [type]);

    if (isLoading) {
        return (
            <div className=" flex flex-col h-screen items-center justify-center">
                <p className="text-xl font-mono">Loading leaderboard...</p>
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

            <h2 className="font-black text-5xl md:text-6xl tracking-tight">
                Leaderboard
            </h2>
            <div className="flex flex-col items-center gap-2">
                <p className="text-green-500/80 text-sm font-semibold uppercase tracking-wider">
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
                                    ? "bg-green-600 border-green-500 text-black shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                                    : "bg-black border-green-900 text-green-700 hover:border-green-500 hover:text-green-400"
                            }`}
                        >
                            {sortName[t]}
                        </button>
                    ))}
                </div>
            </div>
            {/* Leaderboard Table */}
            <div className="w-full max-w-4xl bg-black/40 border-2 border-green-500/30 rounded-lg overflow-hidden shadow-xl shadow-green-500/10">
                {/* Table Header */}
                <div className="bg-green-500/10 border-b border-green-500/30 p-4 grid grid-cols-[60px_1fr_120px] gap-4 font-bold text-green-400">
                    <div>Rank</div>
                    <div>Username</div>
                    <div className="text-right">
                        {sortName[type as keyof typeof sortName]}
                    </div>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-green-500/20">
                    {data?.data?.map((entry: any, index: number) => {
                        const isCurrentUser = user?._id === entry._id;
                        return (
                            <div
                                key={entry._id || index}
                                className={`p-4 grid grid-cols-[60px_1fr_120px] gap-4 items-center transition-all duration-200 ${
                                    isCurrentUser
                                        ? "bg-green-500/20 border-b-0 border-l-4 border-green-400"
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
                                <div className="font-semibold flex items-center gap-2">
                                    {entry.username}
                                    {isCurrentUser && (
                                        <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                                            YOU
                                        </span>
                                    )}
                                </div>

                                {/* Score */}
                                <div className="text-right font-mono text-green-400 font-bold text-lg">
                                    {entry[type]?.toLocaleString() || 0}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Empty State */}
                {(!data?.data || data.data.length === 0) && (
                    <div className="p-12 text-center text-green-500/60">
                        <p className="text-2xl mb-2">👻</p>
                        <p>No entries found</p>
                    </div>
                )}
            </div>
        </div>
    );
}
