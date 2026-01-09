import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
    KeyRound,
    ArrowRight,
    CheckCircle2,
    Loader2,
    ChevronLeft,
} from "lucide-react";
import { motion } from "motion/react";
import { generateResetToken } from "@/apis/auth";

export const Route = createFileRoute("/reset-password/")({
    component: RouteComponent,
});

function RouteComponent() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success">(
        "idle"
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus("loading");

        await generateResetToken(email);

        setStatus("success");
    };

    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-zinc-950 p-6 font-mono text-zinc-300">
            <div className="w-full max-w-md">
                <Link
                    to="/sign-in"
                    className="mb-6 flex items-center text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
                >
                    <ChevronLeft size={14} className="mr-1" />
                    Return to Login
                </Link>

                <div className="relative overflow-hidden border border-zinc-800 bg-zinc-900/30 p-8 backdrop-blur-sm">
                    <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-zinc-800 via-green-500/50 to-zinc-800 opacity-50" />
                    {status === "success" ? (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-4"
                        >
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-900/20 text-green-500 border border-green-500/30">
                                <CheckCircle2 size={32} />
                            </div>
                            <h2 className="mb-2 text-xl font-bold text-white uppercase tracking-wider">
                                Transmission Sent
                            </h2>
                            <p className="text-sm text-zinc-400 mb-6">
                                If an account exists for{" "}
                                <span className="text-white font-bold">
                                    {email}
                                </span>
                                , we have sent a reset link. Check your inbox.
                            </p>
                            <button
                                type="button"
                                onClick={() => setStatus("idle")}
                                className="cursor-pointer text-xs uppercase tracking-widest text-zinc-500 hover:text-green-400 underline decoration-zinc-800 underline-offset-4"
                            >
                                Try a different email
                            </button>
                        </motion.div>
                    ) : (
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-6"
                        >
                            <div className="text-center sm:text-left">
                                <div className="mb-4 inline-flex items-center justify-center rounded border border-zinc-800 bg-zinc-900 p-3 text-zinc-400 sm:mb-6">
                                    <KeyRound size={24} />
                                </div>
                                <h1 className="text-2xl font-black uppercase tracking-tight text-white">
                                    Reset Access
                                </h1>
                                <p className="mt-2 text-sm text-zinc-500">
                                    Enter your registered email. We will send
                                    you a recovery key.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="email"
                                    className="text-xs font-bold uppercase tracking-wider text-zinc-500"
                                >
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    placeholder="e.g johndoe@gmail.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full border border-zinc-800 bg-zinc-950 px-4 py-3 text-white placeholder:text-zinc-700 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500/50 transition-all"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={status === "loading" || !email}
                                className="group relative flex w-full items-center justify-center gap-2 overflow-hidden theme-accent-solid px-4 py-3 text-sm font-bold uppercase tracking-widest text-black transition-all hover:bg-[var(--accent-light)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                            >
                                {status === "loading" ? (
                                    <>
                                        <Loader2
                                            size={16}
                                            className="animate-spin"
                                        />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        Send Recovery Key
                                        <ArrowRight
                                            size={16}
                                            className="transition-transform group-hover:translate-x-1"
                                        />
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
