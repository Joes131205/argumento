import { createFileRoute, Link, useLoaderData } from "@tanstack/react-router";
import { CheckCircle, Circle, Lock } from "lucide-react";
import { getCampaign } from "@/apis/campaign";
import BackButton from "@/components/BackButton";
import useUser from "@/hooks/useUser";
import { requireAuth } from "@/utils/requireAuth";
import type { ICampaign } from "@/types";

export const Route = createFileRoute("/campaign/")({
    beforeLoad: requireAuth,
    component: RouteComponent,
    loader: async () => {
        const data = await getCampaign();
        return data;
    },
});

function RouteComponent() {
    const data = useLoaderData({ from: "/campaign/" });
    const { user } = useUser();

    return (
        <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-zinc-950 font-sans text-green-500">
            <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col gap-2 p-6">
                <div className="flex items-center gap-4">
                    <BackButton />
                </div>

                <div className="mb-12 flex flex-col justify-between gap-4 border-green-900/50 border-b pb-6 md:flex-row md:items-end">
                    <div>
                        <h1 className="font-black text-4xl text-shadow-green uppercase tracking-tighter md:text-5xl">
                            Campaign
                        </h1>
                        <p className="mt-2 max-w-xl font-mono text-green-600 text-sm">
                            Get to know the system before you go on with only
                            yourself.
                        </p>
                    </div>
                </div>

                <div className="mb-24 grid grid-cols-1 gap-8 md:grid-cols-2">
                    {Object.entries(data).map(
                        ([campaignId, campaign]) => {
                            const typedCampaign = campaign as ICampaign;
                            const campaignProgress =
                                user?.campaign_progress?.find(
                                    (cp) => cp.campaign_id === campaignId
                                );

                            const requiredCampaign =
                                user?.campaign_progress?.find(
                                    (cp) =>
                                        cp.campaign_id === typedCampaign?.requirement
                                );

                            const isUnlocked =
                                !typedCampaign.requirement ||
                                requiredCampaign?.isCompleted;

                            if (!isUnlocked) {
                                return (
                                    <div
                                        key={campaignId}
                                        className="group relative flex min-h-[300px] flex-col items-center justify-center gap-6 overflow-hidden border-2 border-zinc-800 border-dashed bg-zinc-900/20 p-8 text-center opacity-60 grayscale transition-opacity hover:opacity-100"
                                    >
                                        <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(0,0,0,0.5)_10px,rgba(0,0,0,0.5)_20px)]" />

                                        <div className="z-10 rounded-full border border-zinc-800 bg-black p-5 shadow-xl">
                                            <Lock
                                                size={32}
                                                className="text-zinc-600"
                                            />
                                        </div>
                                        <div className="z-10">
                                            <h3 className="mb-2 font-bold text-2xl text-zinc-500 uppercase tracking-widest">
                                                Locked!{" "}
                                            </h3>
                                            <div className="inline-block border border-red-900/50 bg-red-950/30 px-3 py-1 font-mono text-red-500 text-xs">
                                                REQUIRES: [
                                                {typedCampaign?.requirement?.replace(
                                                    "campaign_",
                                                    "CAMPAIGN "
                                                )}
                                                ]
                                            </div>
                                        </div>
                                    </div>
                                );
                            }

                            return (
                                <div
                                    key={campaignId}
                                    className="group relative flex flex-col border-2 border-green-900 bg-black shadow-lg transition-colors hover:border-green-500"
                                >
                                    <div className="border-green-900/50 border-b bg-green-950/10 p-6">
                                        <div className="mb-3 flex items-start justify-between">
                                            <span className="font-mono text-green-700 text-xs uppercase tracking-widest">
                                                {campaignId
                                                    .replace("_", " ")
                                                    .toUpperCase()}
                                            </span>
                                            {campaignProgress?.isCompleted && (
                                                <span className="bg-green-500 px-2 py-1 font-black text-[10px] text-black uppercase tracking-wide">
                                                    Completed
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="mb-2 font-black text-3xl uppercase leading-none">
                                            {typedCampaign?.title}
                                        </h3>
                                        <p className="font-mono text-green-600/80 text-sm leading-relaxed">
                                            {typedCampaign?.description}
                                        </p>
                                    </div>

                                    {/* Level List */}
                                    <div className="flex-1 space-y-2 bg-zinc-900/20 p-4">
                                        {Object.entries(typedCampaign?.levels).map(
                                            ([levelId, level]: [
                                                string,
                                                any,
                                            ]) => {
                                                const isLevelCompleted =
                                                    campaignProgress?.levelsCompleted.includes(
                                                        levelId
                                                    );

                                                return (
                                                    <Link
                                                        key={levelId}
                                                        to="/campaign/$level/$id"
                                                        params={{
                                                            level: campaignId,
                                                            id: levelId,
                                                        }}
                                                        className={`group/item flex cursor-pointer items-center justify-between border p-3 transition-all ${
                                                            isLevelCompleted
                                                                ? "border-green-900/30 bg-green-900/5 text-green-700 hover:bg-green-900/10"
                                                                : "border-zinc-800 bg-black text-green-400 hover:border-green-500 hover:bg-green-500/10"
                                                        }
                                                `}
                                                    >
                                                        <div className="flex items-center gap-4">
                                                            <span
                                                                className={`font-bold font-mono text-xs ${isLevelCompleted ? "opacity-50" : "text-green-600"}`}
                                                            >
                                                                {levelId
                                                                    .toUpperCase()
                                                                    .replace(
                                                                        "LEVEL_",
                                                                        "0"
                                                                    )}
                                                            </span>
                                                            <span className="font-bold text-sm uppercase tracking-wide">
                                                                {level?.title}
                                                            </span>
                                                        </div>

                                                        {isLevelCompleted ? (
                                                            <CheckCircle
                                                                size={16}
                                                                className="text-green-600 opacity-50"
                                                            />
                                                        ) : (
                                                            <Circle
                                                                size={16}
                                                                className="text-zinc-700 transition-colors group-hover/item:text-green-500"
                                                            />
                                                        )}
                                                    </Link>
                                                );
                                            }
                                        )}
                                    </div>
                                </div>
                            );
                        }
                    )}
                </div>
            </div>
        </div>
    );
}
