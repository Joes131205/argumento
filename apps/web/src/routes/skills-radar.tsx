import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, Crosshair, Target } from "lucide-react";
import useUser from "@/hooks/useUser";
import { requireAuth } from "@/utils/requireAuth";

export const Route = createFileRoute("/skills-radar")({
    beforeLoad: requireAuth,
    component: RouteComponent,
});

function RouteComponent() {
    const { user } = useUser();

    const getPerformanceMetrics = (accuracy: number) => {
        if (accuracy >= 90)
            return {
                color: "text-green-500",
                border: "border-green-500",
                bg: "bg-green-500",
                grade: "S",
            };
        if (accuracy >= 80)
            return {
                color: "text-emerald-400",
                border: "border-emerald-500",
                bg: "bg-emerald-500",
                grade: "A",
            };
        if (accuracy >= 60)
            return {
                color: "text-yellow-500",
                border: "border-yellow-500",
                bg: "bg-yellow-500",
                grade: "B",
            };
        if (accuracy >= 40)
            return {
                color: "text-orange-500",
                border: "border-orange-500",
                bg: "bg-orange-500",
                grade: "C",
            };
        return {
            color: "text-red-600",
            border: "border-red-600",
            bg: "bg-red-600",
            grade: "F",
        };
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] theme-accent p-6 font-mono text-zinc-300 lg:p-12">
            <div className="mx-auto max-w-6xl space-y-8">
                <div className="flex flex-col gap-4">
                    <div className="mt-4 border-zinc-800 border-b pb-6">
                        <h1 className="font-black text-4xl text-white uppercase tracking-tight md:text-5xl">
                            Skill Radar
                        </h1>
                        <p className="mt-2 max-w-2xl text-sm text-zinc-500">
                            Analyze detection accuracy across different threat
                            sectors.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {user?.stats?.length ? (
                        user.stats.map((item) => {
                            const accuracy =
                                item.total > 0
                                    ? (item.correct / item.total) * 100
                                    : 0;
                            const accuracyFixed = accuracy.toFixed(1);
                            const metrics = getPerformanceMetrics(accuracy);

                            return (
                                <div
                                    key={item.stat_id}
                                    className={
                                        "group relative overflow-hidden border border-zinc-800 bg-zinc-900/50 p-6 transition-all hover:border-zinc-600"
                                    }
                                >
                                    <div
                                        className={`absolute top-0 bottom-0 left-0 w-1 ${metrics.bg} opacity-50`}
                                    />

                                    <div className="mb-6 flex items-start justify-between">
                                        <div>
                                            <h3 className="font-bold text-white text-xl capitalize transition-colors group-hover:text-[var(--accent-dark)]">
                                                {item.name}
                                            </h3>
                                        </div>
                                        <div
                                            className={`flex h-10 w-10 items-center justify-center border-2 font-black text-xl ${metrics.border} ${metrics.color} bg-black`}
                                        >
                                            {metrics.grade}
                                        </div>
                                    </div>

                                    <div className="mb-6 space-y-4">
                                        <div className="flex items-center justify-between border-zinc-800 border-b pb-2 text-sm">
                                            <div className="flex items-center gap-2 text-zinc-500">
                                                <Target size={14} />
                                                <span>Correct</span>
                                            </div>
                                            <span className="font-bold text-white">
                                                {item.correct}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between border-zinc-800 border-b pb-2 text-sm">
                                            <div className="flex items-center gap-2 text-zinc-500">
                                                <Crosshair size={14} />
                                                <span>Attempts</span>
                                            </div>
                                            <span className="font-bold text-zinc-400">
                                                {item.total}
                                            </span>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="mb-2 flex items-end justify-between">
                                            <span
                                                className={`font-bold text-2xl ${metrics.color}`}
                                            >
                                                {accuracyFixed}%
                                            </span>
                                        </div>

                                        <div className="h-2 w-full border border-zinc-800 bg-black p-[1px]">
                                            <div
                                                className={`h-full ${metrics.bg} transition-all duration-700 ease-out`}
                                                style={{
                                                    width: `${Math.min(accuracy, 100)}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="col-span-full border-2 border-zinc-800 border-dashed bg-zinc-900/20 py-20 text-center">
                            <div className="mb-4 flex justify-center">
                                <AlertTriangle
                                    className="text-zinc-600"
                                    size={48}
                                />
                            </div>
                            <h3 className="font-bold text-xl text-zinc-400 uppercase tracking-widest">
                                No Metrics Found
                            </h3>
                            <p className="mt-2 text-zinc-600">
                                Begin simulation to generate stats.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
