import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import { healthCheck } from "@/apis";
import { getApiErrorMessage } from "@/utils/api";

export const Route = createFileRoute("/status")({
    component: RouteComponent,
    loader: async () => {
        try {
            const res = await healthCheck();
            return res;
        } catch (e) {
            const message = getApiErrorMessage(e, "Health check failed");
            console.error(message, e);
            return "SERVER ERROR";
        }
    },
});

function RouteComponent() {
    const res = useLoaderData({ from: "/status" });

    const getStatusConfig = (status: string) => {
        if (status === "OK") {
            return {
                color: "text-green-500",
                bg: "bg-green-500",
                border: "border-green-500",
                icon: <CheckCircle2 size={48} />,
                label: "SYSTEM OPERATIONAL",
                desc: "All services running normally",
            };
        }
        if (status === "NOT OK") {
            return {
                color: "text-orange-500",
                bg: "bg-orange-500",
                border: "border-orange-500",
                icon: <AlertTriangle size={48} />,
                label: "PERFORMANCE DEGRADED",
                desc: "Backend showing delayed performance.",
            };
        }
        return {
            color: "text-red-500",
            bg: "bg-red-500",
            border: "border-red-500",
            icon: <XCircle size={48} />,
            label: "CRITICAL FAILURE",
            desc: "Unable to establish connection with the backend.",
        };
    };

    const config = getStatusConfig(res || "SERVER ERROR");

    return (
        <div className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden bg-zinc-950 p-6 font-mono text-zinc-300">
            <div className="relative z-10 w-full max-w-lg">
                <div
                    className={`border-2 ${config.border} relative overflow-hidden bg-zinc-900/50 p-8 text-center shadow-[0_0_30px_rgba(0,0,0,0.5)]`}
                >
                    <div
                        className={`inline-flex rounded-full border-2 p-4 ${config.border} ${config.color} relative mb-6 bg-black/50`}
                    >
                        {config.icon}
                        {res === "OK" && (
                            <span
                                className={`absolute top-0 right-0 h-3 w-3 ${config.bg} animate-ping rounded-full`}
                            />
                        )}
                    </div>

                    <h1
                        className={`mb-2 font-black text-3xl uppercase tracking-tight ${config.color}`}
                    >
                        {config.label}
                    </h1>
                    <p className="mx-auto mb-8 max-w-xs text-sm text-zinc-400">
                        {config.desc}
                    </p>
                </div>
            </div>
        </div>
    );
}
