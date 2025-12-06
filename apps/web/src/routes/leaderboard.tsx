import { getLeaderboard } from "@/apis/leaderboard";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";

export const Route = createFileRoute("/leaderboard")({
    component: RouteComponent,
    loader: async () => {
        const data = await getLeaderboard();
        return data;
    },
});

function RouteComponent() {
    const data = useLoaderData({ from: "/leaderboard" });
    if (data === "SERVER ERROR") {
        return (
            <div>
                <p>Oops, something went wrong!</p>
            </div>
        );
    }
    return (
        <div>
            <h2>Leaderboard</h2>
            <p>Strive for Excellence!</p>
            <div>
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="border-b-2">
                            <th className="p-3 text-left">Rank</th>
                            <th className="p-3 text-left">Player</th>
                            <th className="p-3 text-right">Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((entry: any, index: number) => (
                            <tr
                                key={index.toString()}
                                className="border-b hover:bg-gray-50"
                            >
                                <td className="p-3 font-semibold">
                                    {index + 1}
                                </td>
                                <td className="p-3">{entry.username}</td>
                                <td className="p-3 text-right">
                                    {entry.totalExp}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
