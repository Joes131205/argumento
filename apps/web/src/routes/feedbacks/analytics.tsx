import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getFeedbackAnalytics } from "@/apis/feedback";
import { requireAuth } from "@/utils/requireAuth";
import {
    Loader2,
    BarChart3,
    PieChart,
    Sparkles,
    MessageSquare,
    TrendingUp,
    AlertCircle,
} from "lucide-react";

interface ExpectationsDist {
    better: number;
    same: number;
    worse: number;
}

interface LearnedDist {
    yes_lot: number;
    yes_little: number;
    not_really: number;
    already_knew: number;
}

interface ChangeBehaviorDist {
    yes: number;
    maybe: number;
    probably_not: number;
    no: number;
}

interface FeedbackItem {
    _id: string;
    userId: string;
    description: string;
    expectation: string;
    favoritePart: string;
    frustrated: string;
    clarity: number;
    playAgainTomorrow: number;
    improvements: string;
    learnedSomething: string;
    changesSocialMedia: string;
    anythingElse?: string;
    createdAt?: string;
}

interface AnalyticsData {
    totalResponses: number;
    avgRetention: string; // server returns toFixed(2)
    avgClarity: string; // server returns toFixed(2)
    expectations: ExpectationsDist;
    learnedDistribution: LearnedDist;
    changeBehavior: ChangeBehaviorDist;
}

interface ApiResponse {
    success: boolean;
    analytics: AnalyticsData;
    allFeedback: FeedbackItem[];
}

export const Route = createFileRoute("/feedbacks/analytics")({
    beforeLoad: async () => {
        await requireAuth();
    },
    component: RouteComponent,
});

function StatCard({
    title,
    value,
    icon,
}: {
    title: string;
    value: string | number;
    icon?: JSX.Element;
}) {
    return (
        <div className="flex items-center gap-3 border border-zinc-800 bg-zinc-950/50 p-4">
            {icon}
            <div className="flex flex-col">
                <span className="font-bold text-xs uppercase text-zinc-500 tracking-wider">
                    {title}
                </span>
                <span className="font-black text-2xl text-white">{value}</span>
            </div>
        </div>
    );
}

function DistRow({
    label,
    value,
    total,
}: {
    label: string;
    value: number;
    total: number;
}) {
    const pct = total > 0 ? Math.round((value / total) * 100) : 0;
    return (
        <div className="flex items-center gap-3">
            <span className="w-40 text-xs font-bold uppercase text-zinc-500">
                {label}
            </span>
            <div className="h-2 w-full bg-zinc-900">
                <div
                    className="h-2 bg-green-600"
                    style={{ width: `${pct}%` }}
                />
            </div>
            <span className="w-14 text-right text-xs text-zinc-400">
                {pct}%
            </span>
        </div>
    );
}

function RouteComponent() {
    const [data, setData] = useState<AnalyticsData | null>(null);
    const [allFeedback, setAllFeedback] = useState<FeedbackItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAnalytics = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const res: ApiResponse = await getFeedbackAnalytics();
                setData(res.analytics);
                setAllFeedback(res.allFeedback || []);
            } catch (err) {
                setError("Failed to fetch analytics");
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAnalytics();
    }, []);

    if (isLoading && !data) {
        return (
            <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-4 font-mono theme-accent">
                <Loader2 className="animate-spin" size={40} />
                <p className="animate-pulse text-sm uppercase tracking-widest">
                    Fetching Feedback Analytics...
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-4rem)] p-6 font-mono text-zinc-300 lg:p-12">
            <div className="mx-auto flex max-w-4xl flex-col gap-8">
                <div className="mt-4 border-b border-zinc-800 pb-6">
                    <h1 className="font-black text-4xl text-white uppercase tracking-tight md:text-5xl">
                        Feedback Analytics
                    </h1>
                    <p className="mt-2 text-sm text-zinc-500">
                        Survey insights across all submissions.
                    </p>
                </div>

                {error && (
                    <div className="border border-red-900 bg-red-950/30 p-4 text-red-300">
                        {error}
                    </div>
                )}

                {data && (
                    <>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <StatCard
                                title="Total Responses"
                                value={data.totalResponses}
                                icon={
                                    <BarChart3
                                        size={18}
                                        className="text-green-500"
                                    />
                                }
                            />
                            <StatCard
                                title="Avg Retention"
                                value={`${data.avgRetention}/5`}
                                icon={
                                    <TrendingUp
                                        size={18}
                                        className="text-green-500"
                                    />
                                }
                            />
                            <StatCard
                                title="Avg Clarity"
                                value={`${data.avgClarity}/4`}
                                icon={
                                    <PieChart
                                        size={18}
                                        className="text-green-500"
                                    />
                                }
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div className="flex flex-col gap-3 border border-zinc-800 bg-zinc-950/50 p-5">
                                <h2 className="font-bold text-xs uppercase text-zinc-500 tracking-widest">
                                    Expectation vs Reality
                                </h2>
                                <DistRow
                                    label="Better"
                                    value={data.expectations.better}
                                    total={data.totalResponses}
                                />
                                <DistRow
                                    label="Same"
                                    value={data.expectations.same}
                                    total={data.totalResponses}
                                />
                                <DistRow
                                    label="Worse"
                                    value={data.expectations.worse}
                                    total={data.totalResponses}
                                />
                            </div>

                            <div className="flex flex-col gap-3 border border-zinc-800 bg-zinc-950/50 p-5">
                                <h2 className="font-bold text-xs uppercase text-zinc-500 tracking-widest">
                                    Learning Outcome
                                </h2>
                                <DistRow
                                    label="Yes, a lot"
                                    value={data.learnedDistribution.yes_lot}
                                    total={data.totalResponses}
                                />
                                <DistRow
                                    label="Yes, a little"
                                    value={data.learnedDistribution.yes_little}
                                    total={data.totalResponses}
                                />
                                <DistRow
                                    label="Not really"
                                    value={data.learnedDistribution.not_really}
                                    total={data.totalResponses}
                                />
                                <DistRow
                                    label="Already knew"
                                    value={
                                        data.learnedDistribution.already_knew
                                    }
                                    total={data.totalResponses}
                                />
                            </div>

                            <div className="flex flex-col gap-3 border border-zinc-800 bg-zinc-950/50 p-5 md:col-span-2">
                                <h2 className="font-bold text-xs uppercase text-zinc-500 tracking-widest">
                                    Behavior Change (Social Media)
                                </h2>
                                <DistRow
                                    label="Yes"
                                    value={data.changeBehavior.yes}
                                    total={data.totalResponses}
                                />
                                <DistRow
                                    label="Maybe"
                                    value={data.changeBehavior.maybe}
                                    total={data.totalResponses}
                                />
                                <DistRow
                                    label="Probably not"
                                    value={data.changeBehavior.probably_not}
                                    total={data.totalResponses}
                                />
                                <DistRow
                                    label="No"
                                    value={data.changeBehavior.no}
                                    total={data.totalResponses}
                                />
                            </div>
                        </div>

                        {allFeedback.length > 0 && (
                            <div className="flex flex-col gap-3 border border-zinc-800 bg-zinc-950/50 p-5">
                                <h2 className="flex items-center gap-2 font-bold text-xs uppercase text-blue-500 tracking-widest">
                                    <MessageSquare size={14} />
                                    All Feedback ({allFeedback.length}{" "}
                                    responses)
                                </h2>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-xs border-collapse">
                                        <thead>
                                            <tr className="border-b border-zinc-700">
                                                <th className="text-left p-2 text-zinc-500 font-bold">
                                                    Description
                                                </th>
                                                <th className="text-left p-2 text-zinc-500 font-bold">
                                                    Favorite
                                                </th>
                                                <th className="text-left p-2 text-zinc-500 font-bold">
                                                    Frustrated
                                                </th>
                                                <th className="text-center p-2 text-zinc-500 font-bold">
                                                    Clarity
                                                </th>
                                                <th className="text-center p-2 text-zinc-500 font-bold">
                                                    Retention
                                                </th>
                                                <th className="text-center p-2 text-zinc-500 font-bold">
                                                    Expectation
                                                </th>
                                                <th className="text-left p-2 text-zinc-500 font-bold">
                                                    Improvements
                                                </th>
                                                <th className="text-left p-2 text-zinc-500 font-bold">
                                                    Learned
                                                </th>
                                                <th className="text-left p-2 text-zinc-500 font-bold">
                                                    Behavior Change
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {allFeedback.map((item, i) => (
                                                <tr
                                                    key={i}
                                                    className="border-b border-zinc-800 hover:bg-zinc-900/30"
                                                >
                                                    <td className="p-2 text-zinc-300 max-w-xs truncate">
                                                        {item.description}
                                                    </td>
                                                    <td className="p-2 text-zinc-300 max-w-xs truncate">
                                                        {item.favoritePart}
                                                    </td>
                                                    <td className="p-2 text-zinc-300 max-w-xs truncate">
                                                        {item.frustrated}
                                                    </td>
                                                    <td className="text-center p-2 text-zinc-300">
                                                        {item.clarity}/4
                                                    </td>
                                                    <td className="text-center p-2 text-zinc-300">
                                                        {item.playAgainTomorrow}
                                                        /5
                                                    </td>
                                                    <td className="text-center p-2">
                                                        <span
                                                            className={`px-2 py-1 rounded text-xs font-bold ${
                                                                item.expectation ===
                                                                "better"
                                                                    ? "bg-green-900 text-green-300"
                                                                    : item.expectation ===
                                                                        "worse"
                                                                      ? "bg-red-900 text-red-300"
                                                                      : "bg-yellow-900 text-yellow-300"
                                                            }`}
                                                        >
                                                            {item.expectation}
                                                        </span>
                                                    </td>
                                                    <td className="p-2 text-zinc-300 max-w-xs truncate">
                                                        {item.improvements}
                                                    </td>
                                                    <td className="p-2 text-zinc-300 max-w-xs truncate">
                                                        {item.learnedSomething}
                                                    </td>
                                                    <td className="p-2 text-zinc-300 max-w-xs truncate">
                                                        {
                                                            item.changesSocialMedia
                                                        }
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
