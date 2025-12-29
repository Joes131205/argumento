import { Link } from "@tanstack/react-router";
import { ArrowLeft, SearchX } from "lucide-react";

export function NotFoundComponent() {
    return (
        <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center bg-zinc-950 p-6 font-mono text-yellow-500">
            <div className="max-w-md rounded-lg border border-yellow-600/50 bg-yellow-950/10 p-10 text-center">
                <SearchX size={64} className="mx-auto mb-6 opacity-80" />
                <h1 className="mb-2 font-black text-4xl uppercase">404</h1>
                <p className="mb-8 text-sm text-yellow-700 uppercase tracking-widest">
                    Oops! The page you were looking for aren't available or just
                    gone! :P
                </p>
                <Link
                    to="/dashboard"
                    className="inline-flex items-center gap-2 font-bold text-sm text-yellow-500 uppercase underline-offset-4 hover:text-yellow-300 hover:underline"
                >
                    <ArrowLeft size={16} />
                    Return back
                </Link>
            </div>
        </div>
    );
}
