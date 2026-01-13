import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
    User,
    Mail,
    Shield,
    LogOut,
    Trash2,
    Monitor,
    Smartphone,
    CheckCircle2,
    AlertTriangle,
    Laptop,
    ArrowRight,
    Loader2,
} from "lucide-react";
import useUser from "@/hooks/useUser";
import { themes } from "@/utils/themes"; // Import your themeso get Theme Names
import { useState } from "react";
import { toast } from "sonner";
import { sendVerifyEmail } from "@/apis/auth";
// import { logout } from "@/apis/auth"; // You'll need this later

export const Route = createFileRoute("/settings")({
    component: RouteComponent,
});

function RouteComponent() {
    const { user, logOut, invalidateUser } = useUser();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logOut();
        await invalidateUser();
        toast.info("Session Terminated.");
        navigate({ to: "/" });
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] p-6 font-mono text-zinc-300 lg:p-12 bg-zinc-950">
            <div className="mx-auto max-w-5xl flex flex-col gap-8">
                <div className="mt-4 border-zinc-800 border-b pb-6">
                    <h1 className="font-black text-4xl text-white uppercase tracking-tight md:text-5xl">
                        Settings
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <section className="border border-zinc-800 bg-zinc-900/30 p-6">
                            <h2 className="flex items-center gap-2 text-sm font-bold uppercase text-zinc-500 mb-6 tracking-widest">
                                <User size={16} /> Identity
                            </h2>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <p className="text-xs font-bold uppercase text-zinc-600">
                                        Username
                                    </p>
                                    <div className="flex items-center justify-between border border-zinc-800 bg-black px-4 py-3 text-white">
                                        <span>
                                            {user?.username || "Unknown"}
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <p className="text-xs font-bold uppercase text-zinc-600">
                                        User ID
                                    </p>
                                    <div className="flex items-center justify-between border border-zinc-800 bg-black px-4 py-3 text-white">
                                        <span>{user?._id || "Unknown"}</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <p className="text-xs font-bold uppercase text-zinc-600">
                                        Email
                                    </p>
                                    <div className="flex items-center justify-between border border-zinc-800 bg-black px-4 py-3">
                                        <span className="text-white">
                                            {user?.email || "No Data"}
                                        </span>

                                        {user?.isVerified ? (
                                            <div className="flex items-center gap-2 text-green-500">
                                                <CheckCircle2 size={14} />
                                                <span className="text-[10px] font-bold uppercase">
                                                    Verified
                                                </span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2 text-yellow-500">
                                                <AlertTriangle size={14} />
                                                <span className="text-[10px] font-bold uppercase">
                                                    Unverified
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    {!user?.isVerified && (
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-zinc-800 bg-zinc-900/20 p-4 rounded-sm">
                                            <div className="flex items-start gap-3">
                                                <div className="mt-1 flex h-8 w-8 items-center justify-center rounded bg-zinc-800 text-zinc-400">
                                                    <Mail size={14} />
                                                </div>
                                                <div className="space-y-1">
                                                    <h3 className="text-xs font-bold uppercase text-white tracking-wide">
                                                        Verification Needed
                                                    </h3>
                                                    <p className="text-[10px] text-zinc-500 max-w-sm leading-relaxed">
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
                            <h2 className="flex items-center gap-2 text-sm font-bold uppercase text-zinc-500 mb-6 tracking-widest">
                                <Shield size={16} /> Session Control
                            </h2>

                            <div className="space-y-3">
                                <button
                                    type="button"
                                    className="cursor-pointer w-full flex items-center justify-between p-4 border border-red-900/30 bg-red-950/5 hover:bg-red-900/20 text-red-500 transition-all text-xs font-bold uppercase"
                                    onClick={handleLogout}
                                >
                                    <span>Log Out</span>
                                    <LogOut size={14} />
                                </button>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
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
        } catch (error: any) {
            const msg = error.response?.data?.message || "Failed to send";
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
            className="cursor-pointer group flex items-center justify-center gap-2 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-600 bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap rounded-sm"
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
                        className="group-hover:translate-x-1 transition-transform opacity-50 group-hover:opacity-100"
                    />
                </>
            )}
        </button>
    );
}
