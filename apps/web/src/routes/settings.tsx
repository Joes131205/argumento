import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
    AlertTriangle,
    ArrowRight,
    CheckCircle2,
    Loader2,
    LogOut,
    Mail,
    Shield,
    Trash2,
    User,
    X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { deleteAccount, sendVerifyEmail } from "@/apis/auth";
import useUser from "@/hooks/useUser";

export const Route = createFileRoute("/settings")({
    component: RouteComponent,
});

function RouteComponent() {
    const { user, logOut, invalidateUser } = useUser();
    const navigate = useNavigate();

    const [deleteConfirmation, setDeleteConfirmation] = useState(false);

    const handleLogout = async () => {
        await logOut();
        await invalidateUser();
        toast.info("Logged Out.");
        navigate({ to: "/" });
    };

    const handleDelete = async () => {
        await deleteAccount();
        await invalidateUser();
        toast.info("Account Deleted.");
        navigate({ to: "/" });
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] p-6 font-mono text-zinc-300 lg:p-12">
            <div className="mx-auto flex max-w-5xl flex-col gap-8">
                <div className="mt-4 border-gray-400 border-b pb-6">
                    <h1 className="font-black text-4xl text-white uppercase tracking-tight md:text-5xl">
                        Settings
                    </h1>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div className="space-y-6 lg:col-span-2">
                        <section className="border border-zinc-800 bg-zinc-900/30 p-6">
                            <h2 className="mb-6 flex items-center gap-2 font-bold text-sm text-zinc-500 uppercase tracking-widest">
                                <User size={16} /> Identity
                            </h2>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <p className="font-bold text-xs text-zinc-600 uppercase">
                                        Username
                                    </p>
                                    <div className="flex items-center justify-between border border-zinc-800 bg-black px-4 py-3 text-white">
                                        <span>
                                            {user?.username || "Unknown"}
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <p className="font-bold text-xs text-zinc-600 uppercase">
                                        User ID
                                    </p>
                                    <div className="flex items-center justify-between border border-zinc-800 bg-black px-4 py-3 text-white">
                                        <span>{user?._id || "Unknown"}</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <p className="font-bold text-xs text-zinc-600 uppercase">
                                        Email
                                    </p>
                                    <div className="flex items-center justify-between border border-zinc-800 bg-black px-4 py-3">
                                        <span className="text-white">
                                            {user?.email || "No Data"}
                                        </span>

                                        {user?.isVerified ? (
                                            <div className="flex items-center gap-2 text-green-500">
                                                <CheckCircle2 size={14} />
                                                <span className="font-bold text-[10px] uppercase">
                                                    Verified
                                                </span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2 text-yellow-500">
                                                <AlertTriangle size={14} />
                                                <span className="font-bold text-[10px] uppercase">
                                                    Unverified
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    {!user?.isVerified && (
                                        <div className="flex flex-col justify-between gap-4 rounded-sm border border-zinc-800 bg-zinc-900/20 p-4 sm:flex-row sm:items-center">
                                            <div className="flex items-start gap-3">
                                                <div className="mt-1 flex h-8 w-8 items-center justify-center rounded bg-zinc-800 text-zinc-400">
                                                    <Mail size={14} />
                                                </div>
                                                <div className="space-y-1">
                                                    <h3 className="font-bold text-white text-xs uppercase tracking-wide">
                                                        Verification Needed
                                                    </h3>
                                                    <p className="max-w-sm text-[10px] text-zinc-500 leading-relaxed">
                                                        Verify your email to
                                                        unlock all features.
                                                        Check your inbox (and
                                                        spam email) for the
                                                        link.
                                                    </p>
                                                </div>
                                            </div>

                                            <ResendButton email={user?.email} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </section>
                    </div>
                    <div className="space-y-6">
                        <section className="border border-zinc-800 bg-zinc-900/30 p-6">
                            <h2 className="mb-6 flex items-center gap-2 font-bold text-sm text-zinc-500 uppercase tracking-widest">
                                <Shield size={16} /> Session Control
                            </h2>

                            <div className="space-y-3">
                                <button
                                    type="button"
                                    className="flex w-full cursor-pointer items-center justify-between border border-red-900/30 bg-red-950/5 p-4 font-bold text-red-500 text-xs uppercase transition-all hover:bg-red-900/20"
                                    onClick={handleLogout}
                                >
                                    <span>Log Out</span>
                                    <LogOut size={14} />
                                </button>
                                <button
                                    type="button"
                                    className="flex w-full cursor-pointer items-center justify-between border border-red-900/30 bg-red-950/5 p-4 font-bold text-red-500 text-xs uppercase transition-all hover:bg-red-900/20"
                                    onClick={() => setDeleteConfirmation(true)}
                                >
                                    <span>Delete Account</span>
                                    <X size={14} />
                                </button>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            {deleteConfirmation && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
                    <div className="w-full max-w-md border-2 border-red-500 bg-zinc-900 p-6">
                        <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center border border-red-500 bg-red-500/10 text-red-500">
                                <Trash2 size={20} />
                            </div>
                            <div>
                                <h2 className="font-bold text-lg text-white uppercase">
                                    Delete Account
                                </h2>
                                <p className="text-xs text-zinc-500">
                                    This action is irreversible
                                </p>
                            </div>
                        </div>

                        <p className="mb-6 text-sm text-zinc-400">
                            All your data, progress, and purchases will be
                            permanently deleted.
                        </p>

                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => setDeleteConfirmation(false)}
                                className="flex-1 cursor-pointer border border-zinc-700 bg-zinc-800 px-4 py-3 font-bold text-white text-xs uppercase transition-all hover:bg-zinc-700"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleDelete}
                                className="flex-1 cursor-pointer border border-red-500 bg-red-500/10 px-4 py-3 font-bold text-red-500 text-xs uppercase transition-all hover:bg-red-500 hover:text-white"
                            >
                                Delete Forever
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function ResendButton({ email }: { email?: string }) {
    const [isLoading, setIsLoading] = useState(false);

    const handleResend = async () => {
        if (!email) return;
        setIsLoading(true);

        try {
            await sendVerifyEmail(email);
            toast.success("Email Sent", {
                description: "Check your inbox.",
            });
        } catch (error: unknown) {
            const msg =
                // biome-ignore lint/suspicious/noExplicitAny: <error>
                (error as any).response?.data?.message || "Failed to send";
            toast.error("Error", { description: msg });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            type="button"
            onClick={handleResend}
            disabled={isLoading}
            className="group flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-sm border border-zinc-800 bg-black px-4 py-2 font-bold text-[10px] text-zinc-400 uppercase tracking-widest transition-all hover:border-zinc-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
            {isLoading ? (
                <>
                    <Loader2 size={12} className="animate-spin" />
                    Sending...
                </>
            ) : (
                <>
                    Resend Email
                    <ArrowRight
                        size={12}
                        className="opacity-50 transition-transform group-hover:translate-x-1 group-hover:opacity-100"
                    />
                </>
            )}
        </button>
    );
}
