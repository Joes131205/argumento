/** biome-ignore-all lint/suspicious/noExplicitAny: <don't have type inference> */
import {
    createFileRoute,
    notFound,
    useLoaderData,
} from "@tanstack/react-router";
import { Award, Calendar, Hash, Shield, User as UserIcon } from "lucide-react";
import { motion } from "motion/react";
import { getUserById } from "@/apis/user";

export const Route = createFileRoute("/profile/$id")({
    component: RouteComponent,
    loader: async ({ params }) => {
        try {
            const user = await getUserById(params.id);
            if (!user) throw notFound();
            return user;
        } catch (e) {
            console.log(e);
            throw notFound();
        }
    },
});

function RouteComponent() {
    const user = useLoaderData({ from: "/profile/$id" });

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-zinc-950 p-6 font-mono text-zinc-300 lg:p-12">
            <div className="relative z-10 mx-auto max-w-6xl">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="space-y-6"
                    >
                        <div className="group relative overflow-hidden border border-zinc-800 bg-zinc-900 p-4">
                            <div className="relative flex aspect-square items-center justify-center border border-zinc-800 bg-zinc-950">
                                <UserIcon size={64} className="text-zinc-700" />
                            </div>

                            <div className="mt-4 text-center">
                                <h2 className="font-bold text-2xl text-white uppercase">
                                    {user.username}
                                </h2>
                                <p className="mt-1 text-xs text-zinc-500 uppercase tracking-widest">
                                    ID: {user._id}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4 border border-zinc-800 bg-zinc-900/50 p-6">
                            <div className="flex items-center justify-between border-zinc-800 border-b pb-2">
                                <span className="flex items-center gap-2 text-sm text-zinc-400">
                                    <Award size={16} /> Total XP
                                </span>
                                <span className="font-bold text-white">
                                    {user.totalExp?.toLocaleString()}
                                </span>
                            </div>
                            <div className="flex items-center justify-between border-zinc-800 border-b pb-2">
                                <span className="flex items-center gap-2 text-sm text-zinc-400">
                                    <Calendar size={16} /> Joined at
                                </span>
                                <span className="font-bold text-white">
                                    {new Date(
                                        user.createdAt || Date.now()
                                    ).toLocaleDateString()}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="flex items-center gap-2 text-sm text-zinc-400">
                                    <Hash size={16} /> Shifts Done
                                </span>
                                <span className="font-bold text-white">
                                    {user.stats?.reduce(
                                        (acc: number, curr: any) =>
                                            acc + curr.total,
                                        0
                                    ) || 0}
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    <div className="space-y-8 lg:col-span-2">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h3 className="mb-3 flex items-center gap-2 font-bold text-sm text-zinc-500 uppercase">
                                <Shield size={14} /> Lemme break it down
                            </h3>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {user.stats?.map((stat: any) => (
                                    <div
                                        key={stat.name}
                                        className="flex items-center justify-between border border-zinc-800 bg-zinc-900/20 p-4 transition-colors hover:border-green-500/30"
                                    >
                                        <span className="font-bold text-sm text-zinc-300 capitalize">
                                            {stat.name}
                                        </span>
                                        <div className="text-right">
                                            <div className="font-bold text-green-500 text-xl">
                                                {stat.total > 0
                                                    ? Math.round(
                                                          (stat.correct /
                                                              stat.total) *
                                                              100
                                                      )
                                                    : 0}
                                                %
                                            </div>
                                            <div className="text-[10px] text-zinc-600 uppercase">
                                                ACCURACY (Total: {stat.total})
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {(!user.stats || user.stats.length === 0) && (
                                    <div className="col-span-full text-sm text-zinc-600 italic">
                                        No specific breakdown data logged.
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
