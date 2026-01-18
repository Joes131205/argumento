import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { Calendar, FileText, Hash } from "lucide-react";
import { getPost } from "@/apis/posts";
import { getApiErrorMessage } from "@/utils/api";
import { requireAuth } from "@/utils/requireAuth";

export const Route = createFileRoute("/history/$id")({
    beforeLoad: requireAuth,

    component: RouteComponent,
    loader: async ({ params }) => {
        try {
            const data = await getPost(params.id);
            return data;
        } catch (error) {
            const message = getApiErrorMessage(
                error,
                "Failed to load post history",
            );
            throw new Error(message);
        }
    },
});

function RouteComponent() {
    const data = useLoaderData({ from: "/history/$id" });
    return (
        <div className="flex min-h-screen flex-col items-center gap-5 p-6">
            <div className="relative w-full max-w-3xl overflow-hidden rounded-xl border border-current/50 bg-black shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                <div className="p-8 md:p-12">
                    <div className="mb-8 flex flex-wrap gap-4 border-zinc-900 border-b pb-6 font-mono text-accent text-xs uppercase tracking-wider">
                        <div className="theme-accent flex items-center gap-2">
                            <FileText size={14} />
                            <span>Type: {data?.type || "Unknown"}</span>
                        </div>
                        <div className="theme-accent flex items-center gap-2">
                            <Hash size={14} />
                            <span>ID: {data?._id || "N/A"}</span>
                        </div>
                        {data?.createdAt && (
                            <div className="ml-auto flex items-center gap-2 text-zinc-600">
                                <Calendar size={14} />
                                <span>
                                    {new Date(
                                        data.createdAt,
                                    ).toLocaleDateString()}
                                </span>
                            </div>
                        )}
                    </div>

                    <h1 className="mb-6 font-bold text-3xl text-white leading-tight md:text-4xl">
                        {data?.headline}
                    </h1>

                    <div className="prose prose-invert prose-lg max-w-none font-light text-zinc-400 leading-relaxed">
                        <p>{data?.content}</p>
                    </div>

                    {data?.reasons?.length > 0 && (
                        <div className="mt-10 border-zinc-900 border-t pt-6">
                            <p className="mb-3 font-bold text-xs text-zinc-500 uppercase">
                                Fallacies:
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {data.reasons.map(
                                    (reason: string, i: number) => (
                                        <span
                                            key={i.toString()}
                                            className="rounded-full border border-red-900/50 bg-red-950/30 px-3 py-1 text-red-400 text-xs"
                                        >
                                            {reason}
                                        </span>
                                    ),
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
