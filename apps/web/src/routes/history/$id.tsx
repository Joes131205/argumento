import { getPost } from "@/apis/posts";
import BackButton from "@/components/BackButton";
import { requireAuth } from "@/utils/requireAuth";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { FileText, Calendar, Hash } from "lucide-react";

export const Route = createFileRoute("/history/$id")({
    beforeLoad: requireAuth,

    component: RouteComponent,
    loader: async ({ params }) => {
        const data = await getPost(params.id);
        return data;
    },
});

function RouteComponent() {
    const data = useLoaderData({ from: "/history/$id" });
    console.log(data);
    return (
        <div className="min-h-screen p-6 flex flex-col items-center gap-5">
            <BackButton />

            <div className="w-full max-w-3xl bg-black border border-green-900/50 rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden relative">
                <div className="p-8 md:p-12">
                    {/* Meta Data Header */}
                    <div className="flex flex-wrap gap-4 mb-8 text-xs font-mono text-green-700 uppercase tracking-wider border-b border-zinc-900 pb-6">
                        <div className="flex items-center gap-2">
                            <FileText size={14} />
                            <span>Type: {data?.type || "Unknown"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Hash size={14} />
                            <span>ID: {data?._id || "N/A"}</span>
                        </div>
                        {data?.createdAt && (
                            <div className="flex items-center gap-2 ml-auto text-zinc-600">
                                <Calendar size={14} />
                                <span>
                                    {new Date(
                                        data.createdAt
                                    ).toLocaleDateString()}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                        {data?.headline}
                    </h1>

                    <div className="prose prose-invert prose-lg max-w-none text-zinc-400 font-light leading-relaxed">
                        <p>{data?.content}</p>
                    </div>

                    {/* Tags / Analysis (If available) */}
                    {data?.reasons?.length > 0 && (
                        <div className="mt-10 pt-6 border-t border-zinc-900">
                            <p className="text-xs font-bold text-zinc-500 uppercase mb-3">
                                Fallacies:
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {data.reasons.map(
                                    (reason: string, i: number) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 bg-red-950/30 border border-red-900/50 text-red-400 text-xs rounded-full"
                                        >
                                            {reason}
                                        </span>
                                    )
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
