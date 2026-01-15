import { judge } from "@/apis/judge";
import { generatePracticeShift } from "@/apis/shifts";
import { GameSetup } from "@/components/GameSetup";
import { GameState } from "@/components/GameState";
import Manual from "@/components/Manual";
import useUser from "@/hooks/useUser";
import type { ICampaignProgress, IPost, IPostLog, IPostVerdict } from "@/types";
import { getApiErrorMessage } from "@/utils/api";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/play/practice")({
    component: RouteComponent,
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
            const posts = await generatePracticeShift(
                postAmount,
                selectedTopics
            );

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
                "Failed to generate shift"
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
                reason
            );
            const aiData = response.data || response;
            setVerdict({
                is_correct: aiData.is_correct,
                message: aiData.feedback_message,
            });
        } catch (error) {
            const message = getApiErrorMessage(
                error,
                "AI Offline. Points awarded automatically."
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
                JSON.stringify({ ...data, log: newLogs })
            );
        }
        setIsResult(false);
        setVerdict(null);
        setIndex(index + 1);
    };

    const handleEndShift = async () => {
        toast.success("Practice Complete!");
        localStorage.removeItem("shift_data");
        router.navigate({ to: "/dashboard" });
    };

    if (isLoadingStorage)
        return (
            <div className="flex min-h-[calc(100vh-4rem)] h-screen items-center justify-center bg-black text-green-500">
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
                mode={"practice"}
            />
        );
    }

    if (!currentPost) {
        return (
            <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-6">
                <h2 className="font-black text-4xl uppercase theme-accent">
                    Shift Complete
                </h2>
                <button
                    type="button"
                    onClick={handleEndShift}
                    disabled={isSaving}
                    className="cursor-pointer theme-accent-solid px-8 py-4 font-bold text-black uppercase tracking-widest hover:opacity-90"
                >
                    {isSaving ? "Saving..." : "Clock Out"}
                </button>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center gap-5">
            <div className="flex-2">
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
            <div className="flex-2">
                <Manual />
            </div>
        </div>
    );
}
