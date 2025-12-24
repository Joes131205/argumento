import { completeCampaignLevel, getLevel } from "@/apis/campaign";
import { GameState } from "@/components/GameState";
import useUser from "@/hooks/useUser";
import { requireAuth } from "@/utils/requireAuth";
import {
    createFileRoute,
    useLoaderData,
    useParams,
    useRouter,
} from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/campaign/$level/$id")({
    beforeLoad: requireAuth,

    component: RouteComponent,
    loader: async ({ params }) => {
        const data = await getLevel(params.level, params.id);
        console.log(data);
        return data;
    },
});

function RouteComponent() {
    const data = useLoaderData({ from: "/campaign/$level/$id" });
    const params = useParams({ from: "/campaign/$level/$id" });
    const router = useRouter();
    const { invalidateUser } = useUser();
    const entries = Object.entries(data?.posts);

    const [index, setIndex] = useState(0);

    const [isRejected, setIsRejected] = useState(false);
    const [isResult, setIsResult] = useState(false);
    const [reason, setReason] = useState("");
    const [verdict, setVerdict] = useState<{
        is_correct: boolean;
        message: string;
    } | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const currentPost = entries[index]?.[1];
    const [isSaving, setIsSaving] = useState(false);

    const handleApprove = () => {
        const isSafe = currentPost.type === "safe";
        setVerdict({
            is_correct: isSafe,
            message: isSafe
                ? "Correct! Verified Truth."
                : "Incorrect. Threat detected.",
        });
        setIsResult(true);
    };

    const handleReject = (reason: string) => {
        const isActuallySlop = currentPost.type === "slop";

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
            toast.error("Failed to save progress.");
        } finally {
            setIsSaving(false);
        }
    };
    if (!currentPost) {
        return (
            <div className="h-screen bg-zinc-950 flex flex-col items-center justify-center gap-8 text-green-500 font-mono">
                <div className="border-2 border-green-500 p-10 bg-black shadow-[0_0_50px_rgba(22,163,74,0.2)] text-center max-w-md">
                    <h2 className="text-4xl font-black text-white uppercase mb-2">
                        Mission Complete
                    </h2>
                    <p className="mb-8 text-green-700">
                        Training module processed successfully.
                    </p>
                    <button
                        type="button"
                        onClick={handleCompleteLevel}
                        disabled={isSaving}
                        className="cursor-pointer w-full bg-green-600 hover:bg-green-500 text-black px-8 py-4 font-bold uppercase tracking-widest disabled:opacity-50"
                    >
                        {isSaving ? "Uploading..." : "Confirm"}
                    </button>
                </div>
            </div>
        );
    }
    return (
        <div className="flex items-center justify-center h-screen p-5 gap-6">
            <div className="flex-1 flex flex-col border-r border-green-900 bg-black/50 p-8 relative">
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-0" />
                <div className="relative z-10 h-full flex flex-col">
                    <div className="mb-8 border-b border-green-900 pb-4">
                        <h1 className="text-3xl font-black uppercase text-white tracking-tight leading-none">
                            {data.title}
                        </h1>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-4">
                        <div className="bg-green-900/10 border border-green-800 p-6 text-sm leading-7 text-green-400 whitespace-pre-wrap font-medium">
                            {data.briefing}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-1 flex flex-col justify-center h-full">
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
                        <span className="text-green-800 text-xs font-bold uppercase">
                            CAMPAIGN MODE
                        </span>
                    }
                />
            </div>
        </div>
    );
}
