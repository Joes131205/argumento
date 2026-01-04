import {
    createFileRoute,
    useLoaderData,
    useParams,
    useRouter,
} from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { completeCampaignLevel, getLevel } from "@/apis/campaign";
import { GameState } from "@/components/GameState";
import useUser from "@/hooks/useUser";
import { getApiErrorMessage } from "@/utils/api";
import { requireAuth } from "@/utils/requireAuth";
import type { IPost } from "@/types";

export const Route = createFileRoute("/campaign/$level/$id")({
    beforeLoad: requireAuth,

    component: RouteComponent,
    loader: async ({ params }) => {
        try {
            const data = await getLevel(params.level, params.id);
            return data;
        } catch (error) {
            const message = getApiErrorMessage(
                error,
                "Failed to load campaign level"
            );
            throw new Error(message);
        }
    },
});

function RouteComponent() {
    const data = useLoaderData({ from: "/campaign/$level/$id" });
    const params = useParams({ from: "/campaign/$level/$id" });
    const router = useRouter();
    const { invalidateUser } = useUser();
    const entries = Object.entries(data?.posts);

    const [index, setIndex] = useState(0);

    const [isResult, setIsResult] = useState(false);
    const [verdict, setVerdict] = useState<{
        is_correct: boolean;
        message: string;
    } | null>(null);
    const [isAnalyzing] = useState(false);
    const currentPost: IPost | undefined = entries[index]?.[1] as
        | IPost
        | undefined;
    const [isSaving, setIsSaving] = useState(false);

    const handleApprove = () => {
        const isSafe = currentPost?.type === "safe";
        setVerdict({
            is_correct: isSafe,
            message: isSafe
                ? "Correct! Verified Truth."
                : "Incorrect. Threat detected.",
        });
        setIsResult(true);
    };

    const handleReject = (reason: string) => {
        const isActuallySlop = currentPost?.type === "slop";

        setVerdict({
            is_correct: isActuallySlop,
            message: isActuallySlop
                ? "Correct! You spotted the manipulation."
                : "Incorrect. This content is actually verified safe.",
        });

        setIsResult(true);

        console.log("User rejected because:", reason);
    };
    const handleNext = () => {
        setIsResult(false);
        setVerdict(null);
        setIndex((prev) => prev + 1);
    };

    const handleCompleteLevel = async () => {
        setIsSaving(true);
        try {
            await completeCampaignLevel(params.level, params.id);
            await invalidateUser();
            toast.success("Level Complete!");
            router.navigate({ to: "/campaign" });
        } catch (error) {
            const message = getApiErrorMessage(
                error,
                "Failed to save progress"
            );
            toast.error(message);
        } finally {
            setIsSaving(false);
        }
    };
    if (!currentPost) {
        return (
            <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-8 bg-zinc-950 font-mono text-green-500">
                <div className="max-w-md border-2 theme-accent-border bg-black p-10 text-center shadow-[0_0_50px_rgba(22,163,74,0.2)]">
                    <h2 className="mb-2 font-black text-4xl text-white uppercase">
                        Mission Complete
                    </h2>
                    <p className="mb-8 theme-accent">
                        Training module processed successfully.
                    </p>
                    <button
                        type="button"
                        onClick={handleCompleteLevel}
                        disabled={isSaving}
                        className="w-full cursor-pointer theme-accent-solid px-8 py-4 font-bold text-black uppercase tracking-widest hover:bg-[var(--accent-light)] disabled:opacity-50"
                    >
                        {isSaving ? "Uploading..." : "Confirm"}
                    </button>
                </div>
            </div>
        );
    }
    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center gap-6 p-5">
            <div className="flex h-full flex-1 flex-col items-center justify-center">
                <GameState
                    currentPost={currentPost}
                    currentIndex={index}
                    verdict={verdict}
                    isResult={isResult}
                    isAnalyzing={isAnalyzing}
                    onApprove={handleApprove}
                    onReject={handleReject}
                    onNext={handleNext}
                    headerInfo={
                        <span className="font-bold theme-accent-dark text-xs uppercase">
                            CAMPAIGN MODE
                        </span>
                    }
                />
            </div>
            <div className="relative flex flex-1 flex-col theme-accent-border border-2 bg-black/50 p-8">
                <div className="pointer-events-none absolute inset-0 z-0 bg-[length:100%_4px,3px_100%] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))]" />
                <div className="relative z-10 flex h-full flex-col">
                    <div className="mb-8 theme-accent-border border-b pb-4">
                        <h1 className="font-black text-3xl text-white uppercase leading-none tracking-tight">
                            {data.title}
                        </h1>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-4">
                        <div className="whitespace-pre-wrap border theme-accent-border bg-green-900/10 p-6 font-medium text-white text-sm leading-7">
                            {data.briefing}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
