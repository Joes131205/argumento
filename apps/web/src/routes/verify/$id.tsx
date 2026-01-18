import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldAlert, ShieldCheck, Terminal } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import { verifyEmail } from "@/apis/auth";
import useUser from "@/hooks/useUser";

export const Route = createFileRoute("/verify/$id")({
    component: RouteComponent,
    loader: async ({ params }) => {
        try {
            await verifyEmail(params.id);
        } catch (error) {
            console.log(error);
            throw new Error("Invalid token");
        }
    },
    errorComponent: ErrorComponent,
});

function RouteComponent() {
    const { invalidateUser } = useUser();
    useEffect(() => {
        const invalidate = async () => {
            await invalidateUser();
        };
        invalidate();
    }, [invalidateUser]);
    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-zinc-950 p-6 font-mono text-zinc-300">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative w-full max-w-md overflow-hidden border border-green-900 bg-green-950/10 p-8 backdrop-blur-sm"
            >
                <div className="text-center">
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-green-500/30 bg-green-500/10 text-green-500 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                        <ShieldCheck size={40} />
                    </div>

                    <h1 className="mb-2 font-black text-2xl text-white uppercase tracking-tight">
                        Identity Confirmed
                    </h1>

                    <p className="mb-8 text-sm text-zinc-400">
                        Your account has been successfully verified!
                    </p>

                    <Link
                        to="/sign-in"
                        className="group relative flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden bg-green-600 px-4 py-3 font-bold text-black text-sm uppercase tracking-widest transition-all hover:bg-green-500"
                    >
                        Go Back
                        <ArrowRight
                            size={16}
                            className="transition-transform group-hover:translate-x-1"
                        />
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}

function ErrorComponent() {
    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-zinc-950 p-6 font-mono text-zinc-300">
            <div className="relative w-full max-w-md border border-red-900 bg-red-950/10 p-8">
                <div className="text-center">
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-red-500/30 bg-red-500/10 text-red-500">
                        <ShieldAlert size={40} />
                    </div>

                    <h1 className="mb-2 font-black text-2xl text-white uppercase tracking-tight">
                        Verification Failed
                    </h1>

                    <div className="mb-8 space-y-1 font-bold text-red-600/80 text-xs uppercase tracking-widest">
                        <p>Token invalid</p>
                    </div>

                    <p className="mb-8 text-sm text-zinc-400">
                        The verification link is invalid or has expired. Please
                        request a new verification email from the login
                        terminal.
                    </p>

                    <Link
                        to="/sign-in"
                        className="flex w-full items-center justify-center gap-2 border border-zinc-800 bg-black px-4 py-3 font-bold text-sm text-white uppercase tracking-widest transition-all hover:border-zinc-600 hover:bg-zinc-900"
                    >
                        <Terminal size={16} />
                        Return
                    </Link>
                </div>
            </div>
        </div>
    );
}
