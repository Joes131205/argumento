import { createFileRoute, Link } from "@tanstack/react-router";
import {
    Calendar,
    CheckCircle2,
    ChevronRight,
    FileText,
    XCircle,
} from "lucide-react";
import useUser from "@/hooks/useUser";
import type { IPostHistory } from "@/types";
import { requireAuth } from "@/utils/requireAuth";

export const Route = createFileRoute("/history/")({
    beforeLoad: requireAuth,
    component: RouteComponent,
});

function RouteComponent() {
    const { user } = useUser();

    return (
        <div className="theme-accent min-h-screen p-6 font-mono text-zinc-300 lg:p-12">
            <div className="mx-auto max-w-6xl space-y-8">
                <div className="mb-12 flex flex-col justify-between gap-4 border-gray-400 border-b pb-6 md:flex-row md:items-end">
                    <div>
                        <h1 className="font-black text-4xl text-white uppercase tracking-tight md:text-5xl">
                            Processed Log
                        </h1>
                    </div>
                </div>
                <div className="space-y-3">
                    {user?.postsHistory?.length === 0 ? (
                        <div className="rounded-lg border-2 border-zinc-800 border-dashed bg-zinc-900/20 py-20 text-center">
                            <FileText
                                className="mx-auto mb-4 text-zinc-700"
                                size={48}
                            />
                            <p className="font-bold text-zinc-500 uppercase tracking-widest">
                                No Posts Processed Yet
                            </p>
                        </div>
                    ) : (
                        user?.postsHistory?.map(
                            (entry: IPostHistory, index: number) => {
                                if (!entry.post) return null;

                                const isCorrect = entry.is_correct;
                                const isSlop = entry.post.type === "slop";

                                return (
                                    <Link
                                        key={index.toString()}
                                        to="/history/$id"
                                        params={{ id: entry.post._id }}
                                        className="group block"
                                    >
                                        <div className="relative flex flex-col gap-4 overflow-hidden border border-zinc-800 bg-zinc-900/40 p-4 transition-all hover:border-current/50 hover:bg-zinc-900 md:flex-row md:items-center md:p-5">
                                            <div
                                                className={`absolute top-0 bottom-0 left-0 w-1 ${isCorrect ? "bg-green-600" : "bg-red-600"}`}
                                            />

                                            <div className="shrink-0 text-center">
                                                {isCorrect ? (
                                                    <div className="flex items-center justify-center rounded border border-current/50 bg-green-900/20 p-2 text-center text-green-500">
                                                        <CheckCircle2
                                                            size={20}
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center justify-center rounded border border-red-900/50 bg-red-900/20 p-2 text-center text-red-500">
                                                        <XCircle size={20} />
                                                    </div>
                                                )}
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <div className="mb-1.5 flex items-center gap-3">
                                                    <span className="font-bold text-[10px] text-zinc-500 uppercase tracking-wider">
                                                        LOG #
                                                        {String(
                                                            index + 1,
                                                        ).padStart(4, "0")}
                                                    </span>
                                                    <span className="text-zinc-700">
                                                        |
                                                    </span>
                                                    <span
                                                        className={`border px-1.5 py-0.5 font-bold text-[10px] uppercase ${
                                                            isSlop
                                                                ? "border-red-900/50 bg-red-900/10 text-red-400"
                                                                : "border-blue-900/50 bg-blue-900/10 text-blue-400"
                                                        }`}
                                                    >
                                                        {isSlop
                                                            ? "CONTAINS THREAT"
                                                            : "VERIFIED SAFE"}
                                                    </span>
                                                </div>

                                                <h3 className="group-hover:theme-accent truncate pr-4 font-bold text-white transition-colors">
                                                    {entry.post.headline ||
                                                        "Corrupted Data Header"}
                                                </h3>
                                            </div>

                                            {/* Date & Arrow */}
                                            <div className="flex min-w-[140px] items-center justify-between gap-6 md:justify-end">
                                                <div className="text-right">
                                                    <div className="flex items-center justify-end gap-1.5 text-xs text-zinc-400">
                                                        <Calendar size={12} />
                                                        {new Date(
                                                            entry.post.createdAt,
                                                        ).toLocaleDateString()}
                                                    </div>
                                                    <div className="mt-0.5 text-[10px] text-zinc-600 uppercase">
                                                        {isCorrect
                                                            ? "Correct"
                                                            : "Wrong"}
                                                    </div>
                                                </div>
                                                <ChevronRight
                                                    className="text-zinc-700 transition-colors group-hover:text-current/50"
                                                    size={20}
                                                />
                                            </div>
                                        </div>
                                    </Link>
                                );
                            },
                        )
                    )}
                </div>

                <div className="flex justify-between border-zinc-800 border-t pt-6 text-xs text-zinc-500 uppercase tracking-widest">
                    <span>Total Logs: {user?.postsHistory?.length || 0}</span>
                </div>
            </div>
        </div>
    );
}
