import { getLeaderboard } from "@/apis/leaderboard";
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

function RouteComponent() {
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
            <div>
                <p>Loading...</p>
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
        <div>
            <h2>Leaderboard</h2>
            <p>Strive for Excellence!</p>
            <div>
                <p>Sort by</p>
                <div className="space-x-5">
                    {sortField.map((t: string) => (
                        <button
                            key={t}
                            type="button"
                            onClick={() => setType(t)}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            </div>
            <p>Current Type: {data.type}</p>
            <div className="w-full">
                {data?.data?.map((entry: any, index: number) => (
                    <div
                        key={index.toString()}
                        className="border-b hover:bg-gray-50 flex items-center p-3"
                    >
                        <div className="font-semibold w-12">{index + 1}</div>
                        <div className="flex-1">{entry.username}</div>
                        <div className="text-right">{entry[type]}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
