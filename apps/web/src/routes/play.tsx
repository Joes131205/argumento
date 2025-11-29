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
    },
    {
        id: 2,
        headline: "NASA confirms asteroid will hit Earth tomorrow",
        content:
            "Sources say the elite are already building bunkers. Share this to warn your family!",
        type: "slop",
    },
    {
        id: 3,
        headline: "Cat saved from tree by local fireman",
        content:
            "Whiskers the cat is safe after spending 3 hours stuck in an oak tree.",
        type: "safe",
    },
];

function RouteComponent() {
    const [isRejected, setIsRejected] = useState(false);
    const [isResult, setIsResult] = useState(false);
    const [index, setIndex] = useState(0);
    const [reason, setReason] = useState("");

    const current = data[index];

    const showResult = () => {
        setIsResult(true);
    };

    const nextLevel = () => {
        setIsResult(false);
        setIsRejected(false);
        setReason("");
        setIndex(index + 1);
    };

    const handleApprove = () => {
        setIsRejected(false);
        showResult();
    };

    const handleReject = () => {
        setIsRejected(true);
    };

    const handleSendReport = () => {
        // Should send the report to AI
        showResult();
    };

    if (!current) {
        return (
            <div>
                <p>Thats all folks!</p>
            </div>
        );
    }

    if (isResult) {
        return (
            <div>
                <p>You marked it as {isRejected ? "Slop" : "Legit"}</p>
                {isRejected && <p>Reason: {reason}</p>}
                <p>Actual type: {current.type}</p>
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
                    <p className="text-2xl font-bold">{current.headline}</p>
                    <p>{current.content}</p>
                </div>
                <div>
                    <button type="button" onClick={handleApprove}>
                        Approve
                    </button>
                    <button type="button" onClick={handleReject}>
                        Reject
                    </button>
                    {isRejected && (
                        <div>
                            <p className="text-2xl font-bold">Reasoning</p>
                            <p>Why you reject it?</p>
                            <textarea
                                onChange={(e) => setReason(e.target.value)}
                            />
                            <button type="button" onClick={handleSendReport}>
                                Send Report
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
