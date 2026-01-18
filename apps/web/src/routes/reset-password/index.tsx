import { createFileRoute, Link } from "@tanstack/react-router";
import {
    ArrowRight,
    CheckCircle2,
    ChevronLeft,
    KeyRound,
    Loader2,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { generateResetToken } from "@/apis/auth";

export const Route = createFileRoute("/reset-password/")({
    component: RouteComponent,
});

function RouteComponent() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success">(
        "idle",
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
                    className="mb-6 flex items-center font-bold text-xs text-zinc-500 uppercase tracking-widest transition-colors hover:text-[var(--accent-color)]"
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
                            className="py-4 text-center"
                        >
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-green-500/30 bg-green-900/20 text-green-500">
                                <CheckCircle2 size={32} />
                            </div>
                            <h2 className="mb-2 font-bold text-white text-xl uppercase tracking-wider">
                                Email Sent
                            </h2>
                            <p className="mb-6 text-sm text-zinc-400">
                                If an account exists for{" "}
                                <span className="font-bold text-white">
                                    {email}
                                </span>
                                , we have sent a reset link. Check your inbox.
                            </p>
                            <button
                                type="button"
                                onClick={() => setStatus("idle")}
                                className="cursor-pointer text-xs text-zinc-500 uppercase tracking-widest underline decoration-zinc-800 underline-offset-4 transition-all hover:text-green-400"
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
                                <h1 className="font-black text-2xl text-white uppercase tracking-tight">
                                    Reset Access
                                </h1>
                                <p className="mt-2 text-sm text-zinc-500">
                                    Enter your registered email. We will send
                                    you a reset email
                                </p>
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="email"
                                    className="font-bold text-xs text-zinc-500 uppercase tracking-wider"
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
                                    className="w-full border border-zinc-800 bg-zinc-950 px-4 py-3 text-white transition-all placeholder:text-zinc-700 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500/50"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={status === "loading" || !email}
                                className="inline-flex w-full cursor-pointer items-center justify-center gap-2 bg-green-600 px-6 py-3 font-bold text-black text-xs uppercase tracking-widest transition-all hover:bg-green-500 disabled:cursor-not-allowed"
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
                                        Send Email
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
