import { useState } from "react";
import Manual from "@/components/Manual";
import { Loader2 } from "lucide-react";

interface GameStateProps {
    currentPost: any;
    currentIndex: number;
    verdict: { is_correct: boolean; message: string } | null;
    isResult: boolean;
    isAnalyzing: boolean;
    onApprove: () => void;
    onReject: (reason: string) => void;
    onNext: () => void;
    headerInfo?: React.ReactNode;
}

export const GameState = ({
    currentPost,
    currentIndex,
    verdict,
    isResult,
    isAnalyzing,
    onApprove,
    onReject,
    onNext,
    headerInfo,
}: GameStateProps) => {
    const [isRejecting, setIsRejecting] = useState(false);
    const [reason, setReason] = useState("");

    const handleNext = () => {
        setIsRejecting(false);
        setReason("");
        onNext();
    };

    return (
        <div className="flex flex-col lg:flex-row p-3 items-start gap-4 min-h-screen">
            {/* LEFT: THE GAME CARD */}
            <div className="flex-[2] w-full flex flex-col justify-center">
                <div className="bg-zinc-950 border-2 border-green-500 p-8 rounded relative shadow-[0_0_20px_rgba(22,163,74,0.1)]">
                    {/* Header */}
                    <div className="flex justify-between items-end mb-6 border-b border-b-green-900 pb-4">
                        <div className="flex flex-col">
                            <h2 className="text-xl font-bold uppercase text-green-500">
                                Post #{currentIndex + 1}
                            </h2>
                            {headerInfo}
                        </div>
                        <span className="text-xs font-mono text-green-700 bg-green-900/10 px-2 py-1 border border-green-900/30 rounded">
                            ID: {currentPost._id?.slice(-4) || "UNKNOWN"}
                        </span>
                    </div>

                    {/* Content */}
                    <div className="mb-10">
                        <h3 className="text-2xl md:text-3xl font-black mb-4 leading-tight text-white">
                            {currentPost.headline}
                        </h3>
                        <p className="text-lg text-zinc-300 leading-relaxed font-light">
                            {currentPost.content}
                        </p>
                    </div>

                    {/* ACTION AREA */}
                    {isResult ? (
                        <div className="bg-zinc-900/80 p-6 border border-zinc-800 animate-in fade-in slide-in-from-bottom-2">
                            <h3
                                className={`text-2xl font-black mb-2 uppercase ${verdict?.is_correct ? "text-green-500" : "text-red-500"}`}
                            >
                                {verdict?.is_correct ? "Verified!" : "Error!"}
                            </h3>
                            <p className="mb-6 text-zinc-300 border-l-2 border-zinc-700 pl-4">
                                {verdict?.message}
                            </p>
                            <button
                                type="button"
                                onClick={handleNext}
                                className="cursor-pointer w-full bg-green-600 hover:bg-green-500 text-black py-4 font-bold uppercase tracking-widest transition-all"
                            >
                                Get Next Post
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {!isRejecting ? (
                                <div className="flex gap-4">
                                    <button
                                        type="button"
                                        onClick={onApprove}
                                        disabled={isAnalyzing}
                                        className="cursor-pointer flex-1 bg-green-900/20 border border-green-600 text-green-500 hover:bg-green-600 hover:text-black transition-all py-4 font-bold uppercase tracking-widest"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsRejecting(true)}
                                        disabled={isAnalyzing}
                                        className="cursor-pointer flex-1 bg-red-900/20 border border-red-600 text-red-500 hover:bg-red-600 hover:text-black transition-all py-4 font-bold uppercase tracking-widest"
                                    >
                                        Reject
                                    </button>
                                </div>
                            ) : (
                                <div className="animate-in fade-in slide-in-from-top-2 border-t border-zinc-800 pt-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-red-500 text-xs font-bold uppercase">
                                            Reasoning Required{" "}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setIsRejecting(false)
                                            }
                                            className="cursor-pointer text-zinc-500 text-xs hover:text-white"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                    <textarea
                                        value={reason}
                                        onChange={(e) =>
                                            setReason(e.target.value)
                                        }
                                        placeholder="Identify the violation..."
                                        className="w-full bg-black border border-red-900 focus:border-red-500 text-red-100 p-4 mb-4 h-32 focus:outline-none resize-none"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => onReject(reason)}
                                        disabled={isAnalyzing || !reason.trim()}
                                        className={`${isAnalyzing || !reason.trim() ? "cursor-not-allowed" : "cursor-pointer"} w-full bg-red-600 hover:bg-red-500 disabled:opacity-50 text-black py-4 font-bold uppercase tracking-widest flex items-center justify-center gap-2`}
                                    >
                                        {isAnalyzing ? (
                                            <Loader2 className="animate-spin" />
                                        ) : (
                                            "Submit Report"
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {headerInfo === "CAMPAIGN_MODE" && (
                <div className="hidden lg:block flex-2 h-auto w-full">
                    <Manual />
                </div>
            )}
        </div>
    );
};
