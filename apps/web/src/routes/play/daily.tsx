import { getMe } from "@/apis/auth";
import { completeShift, generateDailyShift } from "@/apis/shifts";
import { judge } from "@/apis/judge";
import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { content_types } from "@/utils/content_types";
import Manual from "@/components/Manual"; // Ensure this is imported
import useUser from "@/hooks/useUser";

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
    const { invalidateUser } = useUser();

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
            <div className="flex flex-col items-center justify-center gap-5 p-5">
                <h1 className="text-4xl font-bold">CUSTOM TRAINING</h1>
                <p className="mb-8">Select specific topics to practice.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {content_types.map((category, i) => (
                        <div
                            key={i.toString()}
                            className="border p-4 rounded bg-zinc-900 border-green-500 text-center flex flex-col gap-5 items-center hover:shadow-lg transition-all shadow-green-500"
                        >
                            <h3 className="font-bold text-xl mb-1">
                                {category.name}
                            </h3>
                            <div className="flex flex-wrap gap-2 items-center justify-center">
                                {category.types.map((t) => (
                                    <button
                                        type="button"
                                        key={t.name}
                                        onClick={() =>
                                            setSelectedTopics((prev) => {
                                                const currentTopics =
                                                    prev[category.name] || [];
                                                const isSelected =
                                                    currentTopics.includes(
                                                        t.name
                                                    );
                                                return {
                                                    ...prev,
                                                    [category.name]: isSelected
                                                        ? currentTopics.filter(
                                                              (name) =>
                                                                  name !==
                                                                  t.name
                                                          )
                                                        : [
                                                              ...currentTopics,
                                                              t.name,
                                                          ],
                                                };
                                            })
                                        }
                                        className={`px-3 py-1 rounded text-sm border border-green-500 transition-all cursor-pointer ${
                                            selectedTopics[
                                                category.name
                                            ]?.includes(t.name)
                                                ? "border-4 font-black shadow-sm shadow-green-500"
                                                : "hover:border-2"
                                        }`}
                                    >
                                        {t.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col bg-zinc-800 items-center gap-4 p-4 shadow-lg sticky bottom-0 border border-2 border-green-500">
                    <div className="flex gap-5 items-center justify-center">
                        <div className="flex items-center gap-2">
                            <span className="font-bold">Amount:</span>
                            <input
                                type="number"
                                min={1}
                                max={5}
                                value={postAmount}
                                onChange={(e) =>
                                    setPostAmount(Number(e.target.value))
                                }
                                className="border-2 focus:outline-none border-green-500 p-2 rounded w-20 text-center font-bold"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={generateShift}
                            disabled={isSubmitting}
                            className="cursor-pointer bg-green-500 hover:bg-green-600 transition-all text-white text-xl font-bold px-10 py-3 rounded w-full disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? "Generating" : "Start Shift"}
                        </button>
                    </div>
                    <p>
                        Both the generated posts and AI evaluation may have
                        occasional inaccuracies. This is part of the training!
                        :)
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col lg:flex-row p-3 items-start">
            {/* LEFT: THE GAME */}
            <div className="flex-2 flex flex-col justify-center p-3">
                {!current ? (
                    <div className="text-center bg-zinc-800 p-10 rounded shadow">
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
                    <div className="bg-zinc-800 border-3 border-green-500 p-8 rounded">
                        <div className="flex justify-between items-end mb-6 border-b border-b-green-500 pb-4">
                            <h2 className="text-xl font-bold uppercase text-green-500">
                                Post #{index + 1}
                            </h2>
                            <span className="text-xs bg-zinc-700 px-2 py-1 rounded">
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

            {/* RIGHT: THE MANUAL */}
            <div className="hidden lg:block flex-2 h-auto p-3">
                <Manual />
            </div>
        </div>
    );
}
