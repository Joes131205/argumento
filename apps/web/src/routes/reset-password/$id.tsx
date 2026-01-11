import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
    Lock,
    CheckCircle2,
    AlertCircle,
    ArrowRight,
    Loader2,
    Terminal,
    EyeOff,
    Eye,
} from "lucide-react";
import { motion } from "motion/react";
import { resetPassword } from "@/apis/auth";

export const Route = createFileRoute("/reset-password/$id")({
    component: RouteComponent,
});

function RouteComponent() {
    const { id } = Route.useParams();

    const [passwords, setPasswords] = useState({ new: "", confirm: "" });
    const [status, setStatus] = useState<
        "idle" | "loading" | "success" | "error"
    >("idle");
    const [errorMsg, setErrorMsg] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmationPassword, setShowConfirmationPassword] =
        useState(false);

    const doPasswordsMatch =
        passwords.new && passwords.new === passwords.confirm;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!doPasswordsMatch) {
            setErrorMsg("Passwords do not match");
            return;
        }

        setStatus("loading");
        setErrorMsg("");

        await resetPassword(id, passwords.new);

        try {
            setStatus("success");
        } catch (err) {
            setStatus("error");
            setErrorMsg("Token expired or invalid.");
        }
    };

    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-zinc-950 p-6 font-mono text-zinc-300">
            <div className="w-full max-w-md">
                {status === "success" ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="border border-green-900 bg-green-950/10 p-8 text-center"
                    >
                        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 text-green-500 border border-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.2)]">
                            <CheckCircle2 size={32} />
                        </div>
                        <h2 className="text-xl font-bold text-white uppercase tracking-wider mb-2">
                            Credentials Updated
                        </h2>
                        <p className="text-sm text-zinc-400 mb-8">
                            Your password has been reset, you may log in with
                            your new credentials
                        </p>
                        <Link
                            to="/sign-in"
                            className="inline-flex w-full items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-black px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all"
                        >
                            Proceed to Login <ArrowRight size={14} />
                        </Link>
                    </motion.div>
                ) : (
                    <div className="border border-zinc-800 bg-zinc-900/30 p-8 relative overflow-hidden backdrop-blur-sm">
                        <div className="mb-8 border-b border-zinc-800 pb-6">
                            <div className="flex items-center gap-3 text-white mb-2">
                                <Terminal
                                    size={24}
                                    className="text-green-500"
                                />
                                <h1 className="text-xl font-black uppercase tracking-tight">
                                    Reset Password
                                </h1>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-zinc-500 font-bold bg-zinc-950 p-2 border border-zinc-800/50 rounded-sm">
                                <span>Key:</span>
                                <span className="text-zinc-300 font-mono">
                                    {id}
                                </span>
                            </div>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-5"
                        >
                            <div className="space-y-2">
                                <label
                                    htmlFor="password"
                                    className="text-xs font-bold uppercase tracking-wider text-zinc-500"
                                >
                                    New Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        required
                                        className="w-full border border-zinc-800 bg-zinc-950 pl-10 pr-4 py-3 text-white placeholder:text-zinc-700 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500/50 transition-all"
                                        placeholder="••••••••"
                                        value={passwords.new}
                                        onChange={(e) =>
                                            setPasswords({
                                                ...passwords,
                                                new: e.target.value,
                                            })
                                        }
                                        id="password"
                                    />
                                    <Lock
                                        size={16}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-zinc-500 transition-colors hover:text-white"
                                    >
                                        {showPassword ? (
                                            <EyeOff size={16} />
                                        ) : (
                                            <Eye size={16} />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <label
                                        htmlFor="confirmPassword"
                                        className="text-xs font-bold uppercase tracking-wider text-zinc-500"
                                    >
                                        Confirm Password
                                    </label>
                                    {passwords.confirm && (
                                        <span
                                            className={`text-[10px] uppercase font-bold ${doPasswordsMatch ? "text-green-500" : "text-red-500"}`}
                                        >
                                            {doPasswordsMatch
                                                ? "Match Verified"
                                                : "Mismatch"}
                                        </span>
                                    )}
                                </div>
                                <div className="relative">
                                    <input
                                        type={
                                            showConfirmationPassword
                                                ? "text"
                                                : "password"
                                        }
                                        required
                                        className={`w-full border bg-zinc-950 pl-10 pr-4 py-3 text-white placeholder:text-zinc-700 focus:outline-none transition-all
                                        ${passwords.confirm && !doPasswordsMatch ? "border-red-900 focus:border-red-500" : "border-zinc-800 focus:border-green-500"}
                                    `}
                                        placeholder="••••••••"
                                        value={passwords.confirm}
                                        onChange={(e) =>
                                            setPasswords({
                                                ...passwords,
                                                confirm: e.target.value,
                                            })
                                        }
                                        id="confirmPassword"
                                    />
                                    <Lock
                                        size={16}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowConfirmationPassword(
                                                !showConfirmationPassword
                                            )
                                        }
                                        className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-zinc-500 transition-colors hover:text-white"
                                    >
                                        {showConfirmationPassword ? (
                                            <EyeOff size={16} />
                                        ) : (
                                            <Eye size={16} />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {errorMsg && (
                                <div className="flex items-center gap-2 bg-red-950/20 border border-red-900/50 p-3 text-red-400 text-xs">
                                    <AlertCircle size={14} />
                                    {errorMsg}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={
                                    status === "loading" || !doPasswordsMatch
                                }
                                className="cursor-pointer inline-flex w-full items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-black px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all"
                            >
                                {status === "loading" ? (
                                    <>
                                        <Loader2
                                            size={16}
                                            className="animate-spin"
                                        />
                                        Updating...
                                    </>
                                ) : (
                                    "Update Credentials"
                                )}
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}
