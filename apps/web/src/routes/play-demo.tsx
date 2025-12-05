import { getMe } from "@/apis/auth";
import { judge } from "@/apis/judge";
import { completeShift, fetchPost } from "@/apis/shifts";
import Manual from "@/components/Manual";
import {
    createFileRoute,
    redirect,
    useLoaderData,
    useRouter,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/play-demo")({
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
        console.log(JSON.parse(storage));
        return JSON.parse(storage);
    },
});

function RouteComponent() {
    const data = useLoaderData({ from: "/play-demo" });

    const router = useRouter();

    const [isRejected, setIsRejected] = useState(false);
    const [isResult, setIsResult] = useState(false);
    const [index, setIndex] = useState(data.log.length);
    const [reason, setReason] = useState("");
    const [verdict, setVerdict] = useState<{
        is_correct: boolean;
        message: string;
    } | null>(null);

    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [logs, setLogs] = useState(data.log);

    const current = data?.currPosts[index];

    useEffect(() => {
        console.log(logs);
    }, [logs]);

    const handleEndShift = async () => {
        setIsSaving(true);
        try {
            const xpEarned =
                logs.filter((item) => item.is_correct).length * 100;

            await completeShift(logs);

            localStorage.removeItem("shift_data");

            toast.success(`Shift Complete! +${xpEarned} XP`);

            router.navigate({ to: "/" });

            console.log(logs);
        } catch (error) {
            console.log(error);
        } finally {
            setIsSaving(false);
        }
    };

    if (!current) {
        return (
            <div className="p-10 text-center">
                <h2>🎉 Shift Complete!</h2>
                <p>You finished this shift for today!</p>
                <button
                    type="button"
                    onClick={handleEndShift}
                    disabled={isSaving}
                >
                    End Shift!
                </button>
            </div>
        );
    }

    const { headline, content, type, slop_reason } = current;

    const saveProgress = (item: { id: string; is_correct: boolean }) => {
        const savedLogs = [...logs, item];
        localStorage.setItem(
            "shift_data",
            JSON.stringify({ currPosts: data.currPosts, log: savedLogs })
        );
        setLogs(savedLogs);
    };

    const showResult = () => {
        setIsResult(true);
    };

    const nextLevel = () => {
        if (current && verdict) {
            saveProgress({ id: current._id, is_correct: verdict.is_correct });
        }
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

                <div className="p-2 rounded mb-4 text-sm">
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
        <div className="flex gap-5 justify-between p-5">
            <div>
                <h2>Daily Shift</h2>

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
            <div>
                <Manual />
            </div>
        </div>
    );
}
