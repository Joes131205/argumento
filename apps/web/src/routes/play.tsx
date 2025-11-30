import { judge } from "@/apis/judge";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/play")({
    component: RouteComponent,
});

const data = [
    {
        id: 1,
        headline: "You won't believe what Millennials are killing now!",
        content:
            "The napkin industry is dead and it is entirely their fault because they hate tradition.",
        type: "slop",
        slop_reason: "Generational Rage Bait",
    },
    {
        id: 2,
        headline: "NASA confirms asteroid will hit Earth tomorrow",
        content:
            "Sources say the elite are already building bunkers. Share this to warn your family!",
        type: "slop",
        slop_reason: "Fear Mongering / Fake News",
    },
    {
        id: 3,
        headline: "Cat saved from tree by local fireman",
        content:
            "Whiskers the cat is safe after spending 3 hours stuck in an oak tree.",
        type: "safe",
        slop_reason: null,
    },
];

function RouteComponent() {
    const [isRejected, setIsRejected] = useState(false);
    const [isResult, setIsResult] = useState(false);
    const [index, setIndex] = useState(0);
    const [reason, setReason] = useState("");
    const [verdict, setVerdict] = useState<{
        is_correct: boolean;
        message: string;
    } | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const current = data[index];

    if (!current) {
        return (
            <div className="p-10 text-center">
                <h2>🎉 Shift Complete!</h2>
                <p>You cleaned the internet for today.</p>
            </div>
        );
    }

    const { headline, content, type, slop_reason } = current;

    const showResult = () => {
        setIsResult(true);
    };

    const nextLevel = () => {
        setIsResult(false);
        setIsRejected(false);
        setReason("");
        setVerdict(null);
        setIndex(index + 1);
    };

    const handleApprove = () => {
        setIsRejected(false);
        const isSafe = type === "safe";
        setVerdict({
            is_correct: isSafe,
            message: isSafe ? "Correct!" : "Incorrect!",
        });
        showResult();
    };

    const handleReject = () => {
        setIsRejected(true);
    };

    const handleSendReport = async () => {
        setIsLoading(true);
        try {
            const { response } = await judge(
                headline,
                content,
                slop_reason || "",
                reason
            );
            console.log(response);
            setVerdict({
                is_correct: response.is_correct,
                message: response.feedback_message,
            });
        } catch (error) {
            console.error("Judge error: ", error);
            setVerdict({
                is_correct: true,
                message: "AI Offline, but we'll count it.",
            });
        } finally {
            setIsLoading(false);
            showResult();
        }
    };

    if (isResult) {
        return (
            <div>
                <h3>{verdict?.is_correct ? "Nice Job!" : "Issue!"}</h3>
                <p>{verdict?.message}</p>

                <div className="bg-gray-100 p-2 rounded mb-4 text-sm">
                    <p>
                        <strong>Your Action:</strong>{" "}
                        {isRejected ? "Rejected (Slop)" : "Approved (Safe)"}
                    </p>
                    <p>
                        <strong>Official Type:</strong> {type}
                    </p>
                    <p>Hidden Truth: {slop_reason || "None"}</p>
                </div>

                <button type="button" onClick={nextLevel}>
                    Next
                </button>
            </div>
        );
    }

    return (
        <div>
            <h2>Daily Shift</h2>
            <div>
                <p>Post #{index + 1}</p>
                <div className="flex flex-col gap-2">
                    <p className="text-2xl font-bold">{headline}</p>
                    <p>{content}</p>
                </div>
                <div>
                    <button
                        type="button"
                        onClick={handleApprove}
                        disabled={isLoading}
                    >
                        Approve
                    </button>
                    <button
                        type="button"
                        onClick={handleReject}
                        disabled={isLoading}
                    >
                        Reject
                    </button>
                    {isRejected && (
                        <div>
                            <p className="text-2xl font-bold">Reasoning</p>
                            <p>Why you reject it?</p>
                            <textarea
                                onChange={(e) => setReason(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={handleSendReport}
                                disabled={isLoading}
                                className="bg-red-600 text-white px-4 py-2 rounded disabled:opacity-50"
                            >
                                {isLoading ? "Analyzing..." : "Send Report"}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
