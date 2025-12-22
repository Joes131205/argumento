import { getMe } from "@/apis/auth";
import { completeShift, generateDailyShift } from "@/apis/shifts";
import { judge } from "@/apis/judge";
import {
    createFileRoute,
    Link,
    redirect,
    useRouter,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { content_types } from "@/utils/content_types";
import Manual from "@/components/Manual";
import useUser from "@/hooks/useUser";
import {
    AlertTriangle,
    ArrowLeft,
    Cpu,
    Lock,
    Play,
    Terminal,
} from "lucide-react";
import BackButton from "@/components/BackButton";

export const Route = createFileRoute("/play/daily")({
    component: RouteComponent,
    loader: async () => {
        const user = await getMe();

        const last = new Date(user.lastPlayedDate);
        const today = new Date();

        if (
            last.getDate() === today.getDate() &&
            last.getMonth() === today.getMonth() &&
            last.getFullYear() === today.getFullYear()
        ) {
            throw redirect({ to: "/" });
        }
        if (!user) {
            toast.warning("please sign in");
            throw redirect({ to: "/sign-in" });
        }
    },
});

function RouteComponent() {
    const router = useRouter();
    const { invalidateUser, user } = useUser();

    const [isPlayedBefore, setIsPlayedBefore] = useState(false);
    const [data, setData] = useState<any>(null);
    const [isLoadingStorage, setIsLoadingStorage] = useState(true);

    const [selectedTopics, setSelectedTopics] = useState<
        Record<string, string[]>
    >({
        logical_fallacies: [],
        cognitive_biases: [],
        media_manipulations: [],
        ai_hallucinations: [],
    });
    const [postAmount, setPostAmount] = useState(3);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [index, setIndex] = useState(0);
    const [logs, setLogs] = useState<any[]>([]);

    const [isRejected, setIsRejected] = useState(false);
    const [isResult, setIsResult] = useState(false);
    const [reason, setReason] = useState("");
    const [verdict, setVerdict] = useState<{
        is_correct: boolean;
        message: string;
    } | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const storage = localStorage.getItem("shift_data");
        if (storage) {
            const parsed = JSON.parse(storage);
            setData(parsed);
            setIsPlayedBefore(true);

            setLogs(parsed.log);
            setIndex(parsed.log.length);
        }
        setIsLoadingStorage(false);
    }, []);

    const generateShift = async () => {
        setIsSubmitting(true);
        try {
            const isCompleted = user?.campaign_progress?.find(
                (item) => item?.campaign_id === "campaign_1" && item.isCompleted
            );
            if (!isCompleted) {
                toast.error("Complete campaign_1 first to continue!");
                return;
            }
            const posts = await generateDailyShift(postAmount, selectedTopics);
            if (posts === "SERVER ERROR") {
                toast("Error while generating a shift, try again later");
                return;
            }
            const postData = posts?.data || posts;
            const newGame = { currPosts: postData, log: [] };

            localStorage.setItem("shift_data", JSON.stringify(newGame));

            // Update State to switch views
            setData(newGame);
            setLogs([]);
            setIndex(0);
            setIsPlayedBefore(true);
        } catch (error) {
            console.error(error);
            toast.error("Failed to generate");
        } finally {
            setIsSubmitting(false);
        }
    };

    const current = data?.currPosts?.[index];

    const saveProgress = (item: { id: string; is_correct: boolean }) => {
        const newLogs = [...logs, item];
        setLogs(newLogs);

        localStorage.setItem(
            "shift_data",
            JSON.stringify({ ...data, log: newLogs })
        );
    };

    const nextLevel = () => {
        if (current && verdict) {
            saveProgress({ id: current._id, is_correct: verdict.is_correct });
        }
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
            const { response } = await judge(
                current.headline,
                current.content,
                current.slop_reason || [],
                reason
            );
            const aiData = response.data || response;
            setVerdict({
                is_correct: aiData.is_correct,
                message: aiData.feedback_message,
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
            const xpEarned =
                logs.filter((item: any) => item.is_correct).length * 100;

            await completeShift(logs);
            await invalidateUser();
            localStorage.removeItem("shift_data");
            toast.success(`Shift Complete! +${xpEarned} XP`);
            router.navigate({ to: "/" });
        } catch (error) {
            console.error(error);
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoadingStorage) return <div>Loading...</div>;
    if (!isPlayedBefore) {
        return (
            <div className="min-h-screen bg-zinc-950 text-green-500 font-mono relative overflow-x-hidden flex flex-col">
                <div className="relative z-10 max-w-6xl mx-auto w-full p-6 flex-1 flex flex-col gap-2">
                    <BackButton />

                    <div className="mb-10 border-b border-green-950 pb-6">
                        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white text-shadow-green">
                            Custom Simulation
                        </h1>
                        <p className="mt-4 text-green-600 max-w-2xl">
                            Select specific protocols to test your detection
                            algorithms. Warning: AI-generated content may
                            contain hallucinations.
                        </p>
                    </div>

                    {/* GRID */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-24">
                        {content_types.map((category, i) => {
                            // Logic: Check if locked
                            const isCompleted = user?.campaign_progress?.find(
                                (item) =>
                                    item?.campaign_id ===
                                        category?.requirements &&
                                    item.isCompleted
                            );

                            if (
                                category.requirements &&
                                isCompleted === undefined
                            ) {
                                return (
                                    <div
                                        key={i.toString()}
                                        className="border-2 border-dashed border-zinc-800 bg-zinc-900/30 p-8 flex flex-col items-center justify-center text-center gap-4 opacity-60 grayscale relative overflow-hidden"
                                    >
                                        <div className="bg-black p-4 rounded-full border border-zinc-800 z-10">
                                            <Lock
                                                size={32}
                                                className="text-zinc-500"
                                            />
                                        </div>
                                        <div className="z-10">
                                            <h3 className="font-bold text-xl uppercase tracking-widest text-zinc-500">
                                                {category.name}
                                            </h3>
                                            <p className="text-xs font-mono mt-2 text-white bg-red-500/10 px-2 py-1 inline-block border border-red-900/50">
                                                REQUIRES: [
                                                {category?.requirements.replace(
                                                    "campaign_",
                                                    "CAMPAIGN "
                                                )}
                                                ]
                                            </p>
                                        </div>
                                    </div>
                                );
                            }

                            return (
                                <div
                                    key={i.toString()}
                                    className="group border border-green-900 bg-black/60 p-6 hover:border-green-500 transition-all hover:shadow-[0_0_20px_rgba(34,197,94,0.1)] relative"
                                >
                                    <div className="flex items-center gap-3 mb-6 border-b border-green-900/50 pb-4">
                                        <h3 className="font-bold text-xl uppercase tracking-wider text-green-100">
                                            {category.name}
                                        </h3>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {category.types.map((t) => {
                                            const isSelected = selectedTopics[
                                                category.name
                                            ]?.includes(t.name);
                                            return (
                                                <button
                                                    type="button"
                                                    key={t.name}
                                                    onClick={() =>
                                                        setSelectedTopics(
                                                            (prev) => {
                                                                const currentTopics =
                                                                    prev[
                                                                        category
                                                                            .name
                                                                    ] || [];
                                                                const isSelected =
                                                                    currentTopics.includes(
                                                                        t.name
                                                                    );
                                                                return {
                                                                    ...prev,
                                                                    [category.name]:
                                                                        isSelected
                                                                            ? currentTopics.filter(
                                                                                  (
                                                                                      name
                                                                                  ) =>
                                                                                      name !==
                                                                                      t.name
                                                                              )
                                                                            : [
                                                                                  ...currentTopics,
                                                                                  t.name,
                                                                              ],
                                                                };
                                                            }
                                                        )
                                                    }
                                                    className={`
                                                    cursor-pointer px-4 py-2 text-xs uppercase font-bold tracking-wider transition-all
                                                    border relative overflow-hidden group/btn
                                                    ${
                                                        isSelected
                                                            ? "bg-green-600 border-green-500 text-black shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                                                            : "bg-black border-green-900 text-green-700 hover:border-green-500 hover:text-green-400"
                                                    }
                                                `}
                                                >
                                                    <span className="relative z-10 flex items-center gap-2">
                                                        {isSelected
                                                            ? "[V]"
                                                            : "[ ]"}{" "}
                                                        {t.name}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="fixed bottom-0 left-0 right-0 bg-black border-t-2 border-green-600 p-4 z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.8)]">
                    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-2 text-[10px] text-green-800 uppercase tracking-widest md:max-w-md hidden md:flex">
                            <AlertTriangle size={14} />
                            <span>
                                AI output variance is expected. Treat it as
                                training data only.
                            </span>
                        </div>

                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <div className="flex items-center bg-zinc-900 border border-green-800 px-4 py-2">
                                <span className="font-bold text-xs uppercase mr-4 text-green-600">
                                    Post Amount:
                                </span>
                                <input
                                    type="number"
                                    min={1}
                                    max={5}
                                    value={postAmount}
                                    onChange={(e) =>
                                        setPostAmount(Number(e.target.value))
                                    }
                                    className="bg-transparent border-b border-green-500 text-white w-12 text-center font-black focus:outline-none"
                                />
                            </div>

                            <button
                                type="button"
                                onClick={generateShift}
                                disabled={isSubmitting}
                                className="flex-1 md:flex-none cursor-pointer bg-green-600 hover:bg-green-500 text-black text-lg font-black uppercase px-8 py-3 transition-all hover:scale-105 disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <span className="animate-pulse">
                                        Generating...
                                    </span>
                                ) : (
                                    <>
                                        <Play size={20} fill="black" />
                                        Start
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col lg:flex-row p-3 items-start">
            {/* LEFT: THE GAME */}
            <div className="flex-2 flex flex-col justify-center p-3">
                {!current ? (
                    <div className="text-center bg-zinc-900 p-10 rounded shadow">
                        <h2 className="text-3xl font-bold mb-4">
                            🎉 Shift Complete!
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
                    <div className="bg-zinc-950 border-3 border-green-500 p-8 rounded">
                        <div className="flex justify-between items-end mb-6 border-b border-b-green-500 pb-4">
                            <h2 className="text-xl font-bold uppercase text-green-500">
                                Post #{index + 1}
                            </h2>
                            <span className="text-xs bg-zinc-900 px-2 py-1 rounded">
                                ID: {current._id?.slice(-4)}
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
                            <div className="bg-zinc-900 p-4 rounded border-black">
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

            {/* RIGHT: THE MANUAL */}
            <div className="hidden lg:block flex-2 h-auto p-3">
                <Manual />
            </div>
        </div>
    );
}
