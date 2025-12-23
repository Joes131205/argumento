import { getMe } from "@/apis/auth";
import { completeShift, generateDailyShift } from "@/apis/shifts";
import { judge } from "@/apis/judge";
import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import useUser from "@/hooks/useUser";
import { DailyActive } from "@/components/DailyActive";
import { DailySetup } from "@/components/DailySetup";

// Loader remains the same...
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
    const [isResult, setIsResult] = useState(false);
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
                (item: any) =>
                    item?.campaign_id === "campaign_1" && item.isCompleted
            );
            if (!isCompleted) {
                toast.error("Complete campaign_1 first!");
                return;
            }
            const posts = await generateDailyShift(postAmount, selectedTopics);
            if (posts === "SERVER ERROR") throw new Error("Server Error");

            const postData = posts?.data || posts;
            const newGame = { currPosts: postData, log: [] };

            localStorage.setItem("shift_data", JSON.stringify(newGame));
            setData(newGame);
            setLogs([]);
            setIndex(0);
            setIsPlayedBefore(true);
        } catch (error) {
            toast.error("Failed to generate shift");
        } finally {
            setIsSubmitting(false);
        }
    };

    const currentPost = data?.currPosts?.[index];

    const handleApprove = () => {
        const isSafe = currentPost.type === "safe";
        setVerdict({
            is_correct: isSafe,
            message: isSafe ? "Correct!" : "Incorrect! Hidden threat detected.",
        });
        setIsResult(true);
    };

    const handleReject = async (reason: string) => {
        setIsAnalyzing(true);
        try {
            const { response } = await judge(
                currentPost.headline,
                currentPost.content,
                currentPost.slop_reason || [],
                reason
            );
            const aiData = response.data || response;
            setVerdict({
                is_correct: aiData.is_correct,
                message: aiData.feedback_message,
            });
        } catch {
            setVerdict({
                is_correct: true,
                message: "AI Offline. Points awarded automatically.",
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
                { id: currentPost._id, is_correct: verdict.is_correct },
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
        setIsSaving(true);
        try {
            await completeShift(logs);
            await invalidateUser();
            localStorage.removeItem("shift_data");
            toast.success("Shift Complete!");
            router.navigate({ to: "/" });
        } catch (error) {
            toast.error("Failed to save progress");
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoadingStorage)
        return (
            <div className="bg-black text-green-500 h-screen flex items-center justify-center">
                Loading...
            </div>
        );

    if (!isPlayedBefore) {
        return (
            <DailySetup
                user={user}
                selectedTopics={selectedTopics}
                setSelectedTopics={setSelectedTopics}
                postAmount={postAmount}
                setPostAmount={setPostAmount}
                onStart={generateShift}
                isSubmitting={isSubmitting}
            />
        );
    }

    if (!currentPost) {
        return (
            <div className="h-screen bg-zinc-950 flex flex-col items-center justify-center gap-6">
                <h2 className="text-4xl font-black uppercase">
                    Shift Complete
                </h2>
                <button
                    type="button"
                    onClick={handleEndShift}
                    disabled={isSaving}
                    className="cursor-pointer bg-green-600 hover:bg-green-500 text-black px-8 py-4 font-bold uppercase tracking-widest"
                >
                    {isSaving ? "Saving..." : "Clock Out"}
                </button>
            </div>
        );
    }

    return (
        <DailyActive
            currentPost={currentPost}
            currentIndex={index}
            verdict={verdict}
            isResult={isResult}
            isAnalyzing={isAnalyzing}
            onApprove={handleApprove}
            onReject={handleReject}
            onNext={handleNext}
        />
    );
}
