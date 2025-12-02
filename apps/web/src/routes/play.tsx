import { getMe } from "@/apis/auth";
import { judge } from "@/apis/judge";
import { fetchPost } from "@/apis/shifts";
import {
    createFileRoute,
    redirect,
    useLoaderData,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/play")({
    component: RouteComponent,
    loader: async () => {
        // Validate user's existence
        const user = await getMe();
        console.log(user);
        if (!user) {
            toast.warning("please sign in");
            throw redirect({ to: "/sign-in" });
        }

        const storage = localStorage.getItem("shift_data");
        if (!storage) {
            try {
                const posts = await fetchPost(3);
                const postData = posts.data || posts;
                const newGame = { currPosts: postData, log: [] };

                localStorage.setItem("shift_data", JSON.stringify(newGame));
                return newGame;
            } catch (error) {
                console.error(error);
                throw redirect({ to: "/" });
            }
        }
        return JSON.parse(storage);
    },
});

function RouteComponent() {
    const data = useLoaderData({ from: "/play" });

    const [isRejected, setIsRejected] = useState(false);
    const [isResult, setIsResult] = useState(false);
    const [index, setIndex] = useState(0);
    const [reason, setReason] = useState("");
    const [verdict, setVerdict] = useState<{
        is_correct: boolean;
        message: string;
    } | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [shiftResult, setShiftResult] = useState<
        { id: string; is_correct?: boolean }[]
    >([]);

    const current = data?.currPosts[data?.log?.length];

    useEffect(() => {
        console.log(shiftResult);
    }, [shiftResult]);

    const handleEndShift = () => {};

    if (!current) {
        return (
            <div className="p-10 text-center">
                <h2>🎉 Shift Complete!</h2>
                <p>You cleaned the internet for today.</p>
                <button type="button" onClick={handleEndShift}>
                    End Shift!
                </button>
            </div>
        );
    }

    const { headline, content, type, slop_reason } = current;

    const saveProgress = (item: { id: string; is_correct: boolean }) => {};

    const showResult = () => {
        setIsResult(true);
    };

    const addResult = () => {
        setShiftResult((prev) => [
            ...prev,
            {
                id: current.id,
                is_correct: verdict?.is_correct,
            },
        ]);
    };

    const nextLevel = () => {
        addResult();
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
