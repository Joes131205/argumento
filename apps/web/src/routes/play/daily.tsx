import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getMe } from "@/apis/auth";
import { judge } from "@/apis/judge";
import { completeShift, generateDailyShift } from "@/apis/shifts";
import { GameSetup } from "@/components/GameSetup";
import { GameState } from "@/components/GameState";
import Manual from "@/components/Manual";
import useUser from "@/hooks/useUser";
import type { ICampaignProgress, IPost, IPostLog, IPostVerdict } from "@/types";
import { getApiErrorMessage } from "@/utils/api";
import { requireAuth } from "@/utils/requireAuth";

export const Route = createFileRoute("/play/daily")({
    beforeLoad: requireAuth,

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
            toast.info("You already played for today!");
            throw redirect({ to: "/dashboard" });
        }
    },
});

function RouteComponent() {
    const router = useRouter();
    const { invalidateUser, user } = useUser();

    const [isPlayedBefore, setIsPlayedBefore] = useState<boolean>(false);
    const [data, setData] = useState<{
        currPosts: IPost[];
        log: IPostLog[];
    } | null>(null);
    const [isLoadingStorage, setIsLoadingStorage] = useState<boolean>(true);

    const [selectedTopics, setSelectedTopics] = useState<
        Record<string, string[]>
    >({
        logical_fallacies: [],
        cognitive_biases: [],
        media_manipulations: [],
        ai_hallucinations: [],
    });
    const [postAmount, setPostAmount] = useState<number>(3);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const [index, setIndex] = useState<number>(0);
    const [logs, setLogs] = useState<IPostVerdict[]>([]);
    const [isResult, setIsResult] = useState<boolean>(false);
    const [verdict, setVerdict] = useState<{
        is_correct: boolean;
        message: string;
    } | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [mobileMode, setMobileMode] = useState<"game_state" | "manual">(
        "game_state",
    );
    useEffect(() => {
        const storage = localStorage.getItem("shift_data");
        if (storage) {
            const parsed = JSON.parse(storage);
            console.log(parsed);
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
                (item: ICampaignProgress) =>
                    item?.campaign_id === "campaign_1" && item.isCompleted,
            );
            if (!isCompleted) {
                toast.error("Complete campaign_1 first!");
                return;
            }
            const posts = await generateDailyShift(postAmount, selectedTopics);

            const postData = posts?.data || posts;
            const newGame = { currPosts: postData, log: [] };

            localStorage.setItem("shift_data", JSON.stringify(newGame));
            setData(newGame);
            setLogs([]);
            setIndex(0);
            setIsPlayedBefore(true);
        } catch (error) {
            const message = getApiErrorMessage(
                error,
                "Failed to generate shift",
            );
            toast.error(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const currentPost = data?.currPosts?.[index];

    const handleApprove = () => {
        const isSafe = currentPost?.type === "safe";
        setVerdict({
            is_correct: isSafe,
            message: isSafe ? "Correct!" : "Incorrect! Hidden threat detected.",
        });
        setIsResult(true);
    };

    const handleReject = async (reason: string) => {
        if (!currentPost) return;

        setIsAnalyzing(true);
        try {
            const { response } = await judge(
                currentPost.headline,
                currentPost.content,
                Array.isArray(currentPost.slop_reason)
                    ? currentPost.slop_reason
                    : [currentPost.slop_reason || ""],
                reason,
            );
            const aiData = response.data || response;
            setVerdict({
                is_correct: aiData.is_correct,
                message: aiData.feedback_message,
            });
        } catch (error) {
            const message = getApiErrorMessage(
                error,
                "AI Offline. Points awarded automatically.",
            );
            setVerdict({
                is_correct: true,
                message,
            });
        } finally {
            setIsAnalyzing(false);
            setIsResult(true);
        }
    };

    const handleNext = () => {
        if (currentPost && verdict) {
            const newLogs = [
                ...logs,
                {
                    post_id: currentPost._id,
                    is_correct: verdict.is_correct,
                    message: verdict.message,
                },
            ];
            setLogs(newLogs);
            localStorage.setItem(
                "shift_data",
                JSON.stringify({ ...data, log: newLogs }),
            );
        }
        setIsResult(false);
        setVerdict(null);
        setIndex(index + 1);
    };

    const handleEndShift = async () => {
        setIsSaving(true);
        try {
            console.log(logs);
            await completeShift(logs);
            await invalidateUser();
            localStorage.removeItem("shift_data");
            toast.success("Shift Complete!");
            router.navigate({ to: "/dashboard" });
        } catch (error) {
            const message = getApiErrorMessage(
                error,
                "Failed to save progress",
            );
            toast.error(message);
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoadingStorage)
        return (
            <div className="flex h-screen min-h-[calc(100vh-4rem)] items-center justify-center bg-black text-green-500">
                Loading...
            </div>
        );

    if (!isPlayedBefore) {
        return (
            <GameSetup
                user={user}
                selectedTopics={selectedTopics}
                setSelectedTopics={setSelectedTopics}
                postAmount={postAmount}
                setPostAmount={setPostAmount}
                onStart={generateShift}
                isSubmitting={isSubmitting}
                mode={"daily"}
            />
        );
    }

    if (!currentPost) {
        return (
            <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-6">
                <h2 className="theme-accent font-black text-4xl uppercase">
                    Shift Complete
                </h2>
                <button
                    type="button"
                    onClick={handleEndShift}
                    disabled={isSaving}
                    className="theme-accent-solid cursor-pointer px-8 py-4 font-bold text-black uppercase tracking-widest hover:opacity-90"
                >
                    {isSaving ? "Saving..." : "Clock Out"}
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)] overflow-hidden md:flex-row md:gap-5 md:items-start md:justify-center">
            <div className="flex-1 w-full overflow-hidden relative flex md:gap-5">
                <div
                    className={`h-full w-full overflow-y-auto ${mobileMode === "manual" ? "hidden md:block" : "block"}`}
                >
                    <GameState
                        currentPost={currentPost}
                        currentIndex={index}
                        verdict={verdict}
                        isResult={isResult}
                        isAnalyzing={isAnalyzing}
                        onApprove={handleApprove}
                        onReject={handleReject}
                        onNext={handleNext}
                    />
                </div>

                <div
                    className={`h-full w-full overflow-hidden ${mobileMode === "game_state" ? "hidden md:block" : "block"}`}
                >
                    <Manual />
                </div>
            </div>

            <div className="w-full shrink-0 md:hidden border-t border-zinc-800 bg-black p-4 z-50">
                <div className="flex gap-4 justify-center">
                    <button
                        type="button"
                        onClick={() => setMobileMode("game_state")}
                        className={`cursor-pointer flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-colors ${
                            mobileMode === "game_state"
                                ? "bg-[var(--accent-color)] text-black"
                                : "bg-zinc-900 text-zinc-500 border border-zinc-800"
                        }`}
                    >
                        Terminal
                    </button>
                    <button
                        type="button"
                        onClick={() => setMobileMode("manual")}
                        className={`cursor-pointer flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-colors ${
                            mobileMode === "manual"
                                ? "bg-[var(--accent-color)] text-black"
                                : "bg-zinc-900 text-zinc-500 border border-zinc-800"
                        }`}
                    >
                        Manual
                    </button>
                </div>
            </div>
        </div>
    );
}
