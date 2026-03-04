import {
    Loader2,
    ShieldCheck,
    ShieldX,
    FileText,
    AlertTriangle,
} from "lucide-react";
import { useState } from "react";
import Manual from "@/components/Manual";
import type { IPost } from "@/types";

interface GameStateProps {
    currentPost: IPost;
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
        <div className="flex flex-col items-center gap-4 p-3 lg:flex-row h-full">
            <div className="flex w-full flex-[2] flex-col justify-center h-full">
                <div className="theme-accent-border theme-glow relative rounded-sm border-2 bg-zinc-950 overflow-hidden h-full">
                    <div className="theme-accent-bg/10 border-b-2 theme-accent-border px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <FileText className="theme-accent h-5 w-5" />
                                <div>
                                    <h2 className="theme-accent font-bold text-lg uppercase tracking-wider">
                                        Post #{currentIndex + 1}
                                    </h2>
                                    <div className="text-zinc-500 text-xs uppercase tracking-widest">
                                        {headerInfo}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                                <span className="theme-accent-border theme-accent-bg theme-accent rounded-sm border px-3 py-1 font-mono text-xs tracking-wider">
                                    REF:{" "}
                                    {currentPost._id?.slice(-6).toUpperCase() ||
                                        currentPost.id?.toUpperCase() ||
                                        "UNKNOWN"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Document Content */}
                    <div className="relative p-6 md:p-8">
                        {/* Content Area */}
                        <div className="mb-8 border-l-4 theme-accent-border pl-6">
                            <span className="theme-accent text-[10px] font-bold uppercase tracking-[0.2em] mb-2 block">
                                Headline
                            </span>
                            <h3 className="mb-6 font-black text-2xl text-white leading-tight md:text-3xl">
                                {currentPost.headline}
                            </h3>

                            <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-2 block">
                                Content
                            </span>
                            <p className="font-light text-lg text-zinc-300 leading-relaxed">
                                {currentPost.content}
                            </p>
                        </div>

                        {/* Result Display */}
                        {isResult ? (
                            <div className="fade-in slide-in-from-bottom-2 animate-in relative">
                                <div
                                    className={`border-2 ${verdict?.is_correct ? "border-green-500/50 bg-green-950/30" : "border-red-500/50 bg-red-950/30"} p-6`}
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        {verdict?.is_correct ? (
                                            <ShieldCheck className="h-6 w-6 text-green-500" />
                                        ) : (
                                            <AlertTriangle className="h-6 w-6 text-red-500" />
                                        )}
                                        <h3
                                            className={`font-black text-xl uppercase tracking-wider ${verdict?.is_correct ? "text-green-500" : "text-red-500"}`}
                                        >
                                            {verdict?.is_correct
                                                ? "Assessment Correct"
                                                : "Assessment Failed"}
                                        </h3>
                                    </div>
                                    <p className="mb-6 border-l-2 border-zinc-700 pl-4 text-zinc-300 text-sm leading-relaxed">
                                        {verdict?.message}
                                    </p>
                                    <button
                                        type="button"
                                        onClick={handleNext}
                                        className="theme-accent-solid w-full cursor-pointer py-4 font-bold text-black uppercase tracking-widest transition-all hover:opacity-90 rounded-sm"
                                    >
                                        Next Document →
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {!isRejecting ? (
                                    <>
                                        <div className="text-center mb-2">
                                            <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.3em]">
                                                Render Verdict
                                            </span>
                                        </div>
                                        <div className="flex gap-4">
                                            <button
                                                type="button"
                                                onClick={onApprove}
                                                disabled={isAnalyzing}
                                                className="group flex-1 cursor-pointer border-2 border-green-500 bg-green-500/10 py-5 font-bold text-green-500 uppercase tracking-widest transition-all hover:bg-green-500 hover:text-black rounded-sm flex items-center justify-center gap-3"
                                            >
                                                <ShieldCheck className="h-5 w-5 transition-transform group-hover:scale-110" />
                                                Approve
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setIsRejecting(true)
                                                }
                                                disabled={isAnalyzing}
                                                className="group flex-1 cursor-pointer border-2 border-red-500 bg-red-500/10 py-5 font-bold text-red-500 uppercase tracking-widest transition-all hover:bg-red-500 hover:text-black rounded-sm flex items-center justify-center gap-3"
                                            >
                                                <ShieldX className="h-5 w-5 transition-transform group-hover:scale-110" />
                                                Reject
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <div className="fade-in slide-in-from-top-2 animate-in border-2 border-red-900/50 bg-red-950/20 p-5 rounded-sm">
                                        <div className="mb-4 flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <AlertTriangle className="h-4 w-4 text-red-500" />
                                                <span className="font-bold text-red-500 text-xs uppercase tracking-wider">
                                                    Violation Report
                                                </span>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setIsRejecting(false)
                                                }
                                                className="cursor-pointer text-xs text-zinc-500 hover:text-white uppercase tracking-wider"
                                            >
                                                [Cancel]
                                            </button>
                                        </div>
                                        <textarea
                                            value={reason}
                                            onChange={(e) =>
                                                setReason(e.target.value)
                                            }
                                            placeholder="Describe the identified violation or manipulation tactic..."
                                            className="mb-4 h-32 w-full resize-none border-2 border-red-900/50 bg-black/50 p-4 text-red-100 placeholder:text-red-900/50 focus:border-red-500 focus:outline-none rounded-sm font-mono text-sm"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => onReject(reason)}
                                            disabled={
                                                isAnalyzing || !reason.trim()
                                            }
                                            className={`${isAnalyzing || !reason.trim() ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:bg-red-400"} flex w-full items-center justify-center gap-3 bg-red-500 py-4 font-bold text-black uppercase tracking-widest transition-all rounded-sm`}
                                        >
                                            {isAnalyzing ? (
                                                <>
                                                    <Loader2 className="animate-spin h-5 w-5" />
                                                    Analyzing...
                                                </>
                                            ) : (
                                                <>
                                                    <ShieldX className="h-5 w-5" />
                                                    Submit Report
                                                </>
                                            )}
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {headerInfo === "CAMPAIGN_MODE" && (
                <div className="hidden h-auto w-full flex-2 lg:block">
                    <Manual />
                </div>
            )}
        </div>
    );
};
