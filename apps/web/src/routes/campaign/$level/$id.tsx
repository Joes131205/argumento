import { completeCampaignLevel, getLevel } from "@/apis/campaign";
import {
    createFileRoute,
    useLoaderData,
    useParams,
    useRouter,
} from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/campaign/$level/$id")({
    component: RouteComponent,
    loader: async ({ params }) => {
        const data = await getLevel(params.level, params.id);
        console.log(data);
        return data;
    },
});

function RouteComponent() {
    const data = useLoaderData({ from: "/campaign/$level/$id" });
    const router = useRouter();
    const params = useParams({ from: "/campaign/$level/$id" });

    const entries = Object.entries(data?.posts);
    console.log(entries);
    const [index, setIndex] = useState(0);

    const [isRejected, setIsRejected] = useState(false);
    const [isResult, setIsResult] = useState(false);
    const [reason, setReason] = useState("");
    const [verdict, setVerdict] = useState<{
        is_correct: boolean;
        message: string;
    } | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const current = entries[index]?.[1];
    console.log(current);

    const nextLevel = () => {
        setIsResult(false);
        setIsRejected(false);
        setReason("");
        setVerdict(null);
        setIndex(index + 1);
    };

    const handleApprove = () => {
        setIsRejected(false);
        const isSafe = current.type === "safe";
        setVerdict({
            is_correct: isSafe,
            message: isSafe ? "Correct!" : "Incorrect!",
        });
        setIsResult(true);
    };

    const handleSendReport = async () => {
        setIsAnalyzing(true);
        try {
            const isSafe = (isRejected ? "slop" : "safe") === current.type;
            setVerdict({
                is_correct: isSafe,
                message: isSafe ? "Correct!" : "Incorrect!",
            });
        } catch (error) {
            console.log(error);
            setVerdict({
                is_correct: true,
                message: "AI Offline. Points awarded.",
            });
        } finally {
            setIsAnalyzing(false);
            setIsResult(true);
        }
    };

    const handleEndShift = async () => {
        setIsSaving(true);
        try {
            await completeCampaignLevel(params.level, params.id);
            router.navigate({ to: "/campaign" });
            console.log("Yipee");
        } catch (error) {
            console.error(error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen p-3 gap-2">
            <div className="flex-1 text-center border-5 border-green-500 h-full p-3 flex flex-col gap-5">
                <p className="text-2xl font-bold">{data.title}</p>
                <p>{data.briefing}</p>
            </div>
            <div className="flex-1 flex flex-col justify-center h-full">
                {!current ? (
                    <div
                        className="text-center border-5 border-green-500 bg-zinc-800 p-10 rounded shadow h-full flex flex-col items-center justify-center
                    "
                    >
                        <h2 className="text-3xl font-bold mb-4">
                            🎉 Training Complete!
                        </h2>
                        <button
                            type="button"
                            onClick={handleEndShift}
                            disabled={isSaving}
                            className="bg-green-500 hover:bg-green-600 transition-all cursor-pointer text-white px-8 py-3 rounded font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSaving ? "Saving..." : "Clock Out"}
                        </button>
                    </div>
                ) : (
                    <div className="bg-zinc-800 border-5 border-green-500 p-8 rounded h-full">
                        <div className="flex justify-between items-end mb-6 border-b border-b-green-500 pb-4">
                            <h2 className="text-xl font-bold uppercase text-green-500">
                                Post #{index + 1}
                            </h2>
                            <span className="text-xs bg-zinc-700 px-2 py-1 rounded">
                                ID: {current.id}
                            </span>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-3xl font-black mb-4 leading-tight">
                                {current.headline}
                            </h3>
                            <p className="text-lg text-zinc-200 leading-relaxed">
                                {current.content}
                            </p>
                        </div>

                        {/* Controls */}
                        {isResult ? (
                            <div className="bg-zinc-700 p-4 rounded border-black">
                                <h3
                                    className={`text-xl font-bold mb-2 ${verdict?.is_correct ? "text-green-600" : "text-red-600"}`}
                                >
                                    {verdict?.is_correct
                                        ? "✅ CORRECT"
                                        : "❌ MISTAKE"}
                                </h3>
                                <p className="mb-4 text-white">
                                    {verdict?.message}
                                </p>
                                <button
                                    type="button"
                                    onClick={nextLevel}
                                    className="w-full bg-green-500 hover:bg-green-600 transition-all text-white py-3 font-bold rounded cursor-pointer"
                                >
                                    NEXT POST
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="flex gap-4">
                                    <button
                                        type="button"
                                        onClick={handleApprove}
                                        disabled={isAnalyzing}
                                        className="flex-1 bg-green-500 hover:bg-green-600 text-green-100 transition-all cursor-pointer py-3 font-bold rounded"
                                    >
                                        APPROVE
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsRejected(true)}
                                        disabled={isAnalyzing}
                                        className="flex-1 bg-red-500 hover:bg-red-600 text-red-100 transition-all cursor-pointer py-3 font-bold rounded"
                                    >
                                        REJECT
                                    </button>
                                </div>

                                {isRejected && (
                                    <div className="animate-in fade-in slide-in-from-top-2">
                                        <textarea
                                            onChange={(e) =>
                                                setReason(e.target.value)
                                            }
                                            placeholder="Why is this slop?"
                                            className="w-full border-2 focus:outline-none text-white resize-none border-red-500 p-3 rounded mb-2 h-24"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleSendReport}
                                            disabled={isAnalyzing}
                                            className="w-full bg-red-500 hover:bg-red-600 cursor-pointer transition-all text-white py-3 font-bold rounded disabled:opacity-50"
                                        >
                                            {isAnalyzing
                                                ? "Analyzing..."
                                                : "Submit Report"}
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
