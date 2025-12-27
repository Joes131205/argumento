import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import { healthCheck } from "@/apis";
import BackButton from "@/components/BackButton";

export const Route = createFileRoute("/status")({
    component: RouteComponent,
    loader: async () => {
        try {
            const res = await healthCheck();
            return res;
        } catch (e) {
            console.log(e);
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
                desc: "All services running within normal parameters.",
            };
        }
        if (status === "NOT OK") {
            return {
                color: "text-orange-500",
                bg: "bg-orange-500",
                border: "border-orange-500",
                icon: <AlertTriangle size={48} />,
                label: "PERFORMANCE DEGRADED",
                desc: "Non-critical systems reporting latency.",
            };
        }
        return {
            color: "text-red-500",
            bg: "bg-red-500",
            border: "border-red-500",
            icon: <XCircle size={48} />,
            label: "CRITICAL FAILURE",
            desc: "Unable to establish connection with core mainframe.",
        };
    };

    const config = getStatusConfig(res || "SERVER ERROR");

    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-zinc-950 p-6 font-mono text-zinc-300">
            <div className="relative z-10 w-full max-w-lg">
                {/* Main Status Card */}
                <div
                    className={`border-2 ${config.border} relative overflow-hidden bg-zinc-900/50 p-8 text-center shadow-[0_0_30px_rgba(0,0,0,0.5)]`}
                >
                    {/* Pulsing Background Glow */}
                    <div
                        className={`absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 ${config.bg} rounded-full opacity-5 blur-[80px]`}
                    />

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

                {/* Footer Controls */}
                <div className="mt-8 flex justify-center">
                    <BackButton />
                </div>
            </div>
        </div>
    );
}
