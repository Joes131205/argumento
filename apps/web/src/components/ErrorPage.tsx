import { Link } from "@tanstack/react-router";
import { AlertTriangle, Home } from "lucide-react";

interface ErrorPageProps {
    error: Error;
    reset: () => void;
}

export function ErrorPage({ error }: ErrorPageProps) {
    return (
        <div className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden bg-zinc-950 p-6 font-mono text-red-500">
            <div className="relative z-10 w-full max-w-2xl border-2 border-red-600 bg-black p-8 shadow-[0_0_50px_rgba(220,38,38,0.2)]">
                <div className="mb-6 flex items-center gap-3 border-red-900/50 border-b pb-4">
                    <AlertTriangle size={32} className="animate-pulse" />
                    <div>
                        <h1 className="font-black text-2xl uppercase tracking-widest">
                            Error!
                        </h1>
                    </div>
                </div>

                <div className="mb-8 max-h-48 overflow-auto border border-red-900 bg-red-950/20 p-4">
                    <code className="block whitespace-pre-wrap font-bold text-sm">
                        {error.message || "Unknown error occurred"}
                    </code>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Link
                        to="/dashboard"
                        className="flex cursor-pointer items-center justify-center gap-2 border border-red-600 px-6 py-3 font-bold text-red-500 uppercase transition-all hover:bg-red-900/20"
                    >
                        <Home size={18} />
                        <span>Return</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
