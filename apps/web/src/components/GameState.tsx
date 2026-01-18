import { Loader2 } from "lucide-react";
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
		<div className="flex min-h-[calc(100vh-4rem)] flex-col items-center gap-4 p-3 lg:flex-row">
			<div className="flex w-full flex-[2] flex-col justify-center">
				<div className="theme-accent-border theme-glow relative rounded border-2 bg-zinc-950 p-8">
					<div className="mb-6 flex items-end justify-between border-b border-b-current/20 pb-4">
						<div className="flex flex-col">
							<h2 className="theme-accent font-bold text-xl uppercase">
								Post #{currentIndex + 1}
							</h2>
							{headerInfo}
						</div>
						<span className="theme-accent-border theme-accent-bg theme-accent rounded border px-2 py-1 font-mono text-xs">
							ID: {currentPost._id?.slice(-4) || currentPost.id || "Unknown"}
						</span>
					</div>

					<div className="mb-10">
						<h3 className="mb-4 font-black text-2xl text-white leading-tight md:text-3xl">
							{currentPost.headline}
						</h3>
						<p className="font-light text-lg text-zinc-300 leading-relaxed">
							{currentPost.content}
						</p>
					</div>

					{isResult ? (
						<div className="fade-in slide-in-from-bottom-2 animate-in border border-zinc-800 bg-zinc-900/80 p-6">
							<h3
								className={`mb-2 font-black text-2xl uppercase ${verdict?.is_correct ? "theme-accent" : "text-red-500"}`}
							>
								{verdict?.is_correct ? "Verified!" : "Error!"}
							</h3>
							<p className="mb-6 border-zinc-700 border-l-2 pl-4 text-zinc-300">
								{verdict?.message}
							</p>
							<button
								type="button"
								onClick={handleNext}
								className="theme-accent-solid w-full cursor-pointer py-4 font-bold text-black uppercase tracking-widest transition-all hover:opacity-90"
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
										className="theme-accent flex-1 cursor-pointer border border-green-500 bg-green-500/20 py-4 font-bold text-green-500 uppercase tracking-widest transition-all hover:bg-green-600 hover:text-black"
									>
										Approve
									</button>
									<button
										type="button"
										onClick={() => setIsRejecting(true)}
										disabled={isAnalyzing}
										className="flex-1 cursor-pointer border border-red-600 bg-red-900/20 py-4 font-bold text-red-500 uppercase tracking-widest transition-all hover:bg-red-600 hover:text-black"
									>
										Reject
									</button>
								</div>
							) : (
								<div className="fade-in slide-in-from-top-2 animate-in border-zinc-800 border-t pt-4">
									<div className="mb-2 flex items-center justify-between">
										<span className="font-bold text-red-500 text-xs uppercase">
											Reasoning Required{" "}
										</span>
										<button
											type="button"
											onClick={() => setIsRejecting(false)}
											className="cursor-pointer text-xs text-zinc-500 hover:text-white"
										>
											Cancel
										</button>
									</div>
									<textarea
										value={reason}
										onChange={(e) => setReason(e.target.value)}
										placeholder="Identify the violation..."
										className="mb-4 h-32 w-full resize-none border border-red-900 bg-black p-4 text-red-100 focus:border-red-500 focus:outline-none"
									/>
									<button
										type="button"
										onClick={() => onReject(reason)}
										disabled={isAnalyzing || !reason.trim()}
										className={`${isAnalyzing || !reason.trim() ? "cursor-not-allowed" : "cursor-pointer"} flex w-full items-center justify-center gap-2 bg-red-600 py-4 font-bold text-black uppercase tracking-widest hover:bg-red-500 disabled:opacity-50`}
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
				<div className="hidden h-auto w-full flex-2 lg:block">
					<Manual />
				</div>
			)}
		</div>
	);
};
