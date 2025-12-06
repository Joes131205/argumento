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
    // --- GLOBAL STATE ---
    const [isPlayedBefore, setIsPlayedBefore] = useState(false);
    const [data, setData] = useState<any>(null); // The Game Object
    const [isLoadingStorage, setIsLoadingStorage] = useState(true);

    // --- FORM STATE ---
    const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
    const [postAmount, setPostAmount] = useState(3);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // --- GAME STATE ---
    // We initialize these safely. We will sync them when 'data' loads.
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

    // 1. LOAD GAME ON MOUNT
    useEffect(() => {
        const storage = localStorage.getItem("shift_data");
        if (storage) {
            const parsed = JSON.parse(storage);
            setData(parsed);
            setIsPlayedBefore(true);

            // SYNC GAME STATE
            setLogs(parsed.log);
            setIndex(parsed.log.length);
        }
        setIsLoadingStorage(false);
    }, []);

    // 2. GENERATE NEW GAME
    const generateShift = async () => {
        if (selectedTopics.length === 0) return toast.error("Select a topic!");
        setIsSubmitting(true);
        try {
            const posts = await generateDailyShift(postAmount, selectedTopics);
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

    // 3. FORM HANDLERS
    const toggleTopic = (type: string) => {
        if (selectedTopics.includes(type)) {
            setSelectedTopics((prev) => prev.filter((item) => item !== type));
        } else {
            setSelectedTopics((prev) => [...prev, type]);
        }
    };

    // 4. GAME LOGIC HANDLERS
    const current = data?.currPosts?.[index];

    const saveProgress = (item: { id: string; is_correct: boolean }) => {
        const newLogs = [...logs, item];
        setLogs(newLogs);

        // Persist to storage
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
                current.slop_reason || "",
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
            <div className="max-w-4xl mx-auto p-6">
                <h1 className="text-3xl font-black mb-2">CUSTOM TRAINING</h1>
                <p className="text-gray-500 mb-8">
                    Select specific topics to practice.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {content_types.map((category, i) => (
                        <div
                            key={i.toString()}
                            className="border p-4 rounded bg-gray-50"
                        >
                            <h3 className="font-bold text-lg mb-1">
                                {category.name}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {category.types.map((t) => (
                                    <button
                                        type="button"
                                        key={t.name}
                                        onClick={() => toggleTopic(t.name)}
                                        className={`px-3 py-1 rounded text-sm border transition-all ${
                                            selectedTopics.includes(t.name)
                                                ? "bg-black text-white"
                                                : "bg-white text-gray-700 hover:border-black"
                                        }`}
                                    >
                                        {t.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex items-center gap-4 bg-white p-4 shadow-lg sticky bottom-0 border-t">
                    <span className="font-bold">Amount:</span>
                    <input
                        type="number"
                        min={1}
                        max={5}
                        value={postAmount}
                        onChange={(e) => setPostAmount(Number(e.target.value))}
                        className="border p-2 rounded w-20 text-center font-bold"
                    />
                    <button
                        type="button"
                        onClick={generateShift}
                        disabled={isSubmitting}
                        className="bg-blue-600 text-white text-xl font-bold px-10 py-3 rounded w-full disabled:opacity-50"
                    >
                        {isSubmitting ? "GENERATING..." : "START SIMULATION"}
                    </button>
                </div>
            </div>
        );
    }

    // --- VIEW 2: GAME SCREEN (Split Layout) ---
    return (
        <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)] gap-6 p-6 bg-gray-50">
            {/* LEFT: THE GAME */}
            <div className="flex-1 flex flex-col justify-center max-w-2xl mx-auto w-full">
                {!current ? (
                    <div className="text-center bg-white p-10 rounded shadow border">
                        <h2 className="text-3xl font-bold mb-4">
                            🎉 Shift Complete!
                        </h2>
                        <button
                            type="button"
                            onClick={handleEndShift}
                            disabled={isSaving}
                            className="bg-black text-white px-8 py-3 rounded font-bold disabled:opacity-50"
                        >
                            {isSaving ? "Saving..." : "Clock Out"}
                        </button>
                    </div>
                ) : (
                    <div className="bg-white border-2 border-black p-8 rounded shadow-[6px_6px_0px_#000]">
                        <div className="flex justify-between items-end mb-6 border-b pb-4">
                            <h2 className="text-xl font-bold uppercase text-gray-500">
                                Post #{index + 1}
                            </h2>
                            <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                                ID: {current._id?.slice(-4)}
                            </span>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-3xl font-black mb-4 leading-tight">
                                {current.headline}
                            </h3>
                            <p className="text-lg text-gray-800 leading-relaxed">
                                {current.content}
                            </p>
                        </div>

                        {/* Controls */}
                        {isResult ? (
                            <div className="bg-gray-100 p-4 rounded border-l-4 border-black">
                                <h3
                                    className={`text-xl font-bold mb-2 ${verdict?.is_correct ? "text-green-600" : "text-red-600"}`}
                                >
                                    {verdict?.is_correct
                                        ? "✅ CORRECT"
                                        : "❌ MISTAKE"}
                                </h3>
                                <p className="mb-4">{verdict?.message}</p>
                                <button
                                    type="button"
                                    onClick={nextLevel}
                                    className="w-full bg-blue-600 text-white py-3 font-bold rounded"
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
                                        className="flex-1 bg-green-100 hover:bg-green-200 text-green-900 py-3 font-bold rounded"
                                    >
                                        APPROVE
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsRejected(true)}
                                        disabled={isAnalyzing}
                                        className="flex-1 bg-red-100 hover:bg-red-200 text-red-900 py-3 font-bold rounded"
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
                                            className="w-full border-2 border-red-200 p-3 rounded mb-2 h-24"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleSendReport}
                                            disabled={isAnalyzing}
                                            className="w-full bg-red-600 text-white py-3 font-bold rounded disabled:opacity-50"
                                        >
                                            {isAnalyzing
                                                ? "ANALYZING..."
                                                : "SUBMIT REPORT"}
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* RIGHT: THE MANUAL */}
            <div className="hidden lg:block w-[400px] shrink-0 h-full">
                <Manual />
            </div>
        </div>
    );
}
