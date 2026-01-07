import { createFileRoute, Link, useLoaderData } from "@tanstack/react-router";
import { CheckCircle, Circle, Lock } from "lucide-react";
import { getCampaign } from "@/apis/campaign";
import useUser from "@/hooks/useUser";
import { getApiErrorMessage } from "@/utils/api";
import { requireAuth } from "@/utils/requireAuth";
import type { ICampaign, ICampaignLevel } from "@/types";

export const Route = createFileRoute("/campaign/")({
    beforeLoad: requireAuth,
    component: RouteComponent,
    loader: async () => {
        try {
            const data = await getCampaign();
            return data;
        } catch (error) {
            const message = getApiErrorMessage(
                error,
                "Failed to load campaign"
            );
            throw new Error(message);
        }
    },
});

function RouteComponent() {
    const data = useLoaderData({ from: "/campaign/" });
    const { user } = useUser();

    return (
        <div className="relative flex min-h-[calc(100vh-4rem)] flex-col overflow-x-hidden font-mono theme-accent">
            <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col gap-2 p-6">
                <div className="mb-12 flex flex-col justify-between gap-4 theme-accent-border/50 border-b pb-6 md:flex-row md:items-end">
                    <div>
                        <h1 className="font-black text-4xl text-white uppercase tracking-tight md:text-5xl">
                            Campaign
                        </h1>
                    </div>
                </div>

                <div className="mb-24 grid grid-cols-1 gap-8 md:grid-cols-2">
                    {Object.entries(data).map(([campaignId, campaign]) => {
                        const typedCampaign = campaign as ICampaign;
                        const campaignProgress = user?.campaign_progress?.find(
                            (cp) => cp.campaign_id === campaignId
                        );

                        const requiredCampaign = user?.campaign_progress?.find(
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
                                className="group relative flex flex-col border-2 theme-accent-border bg-black shadow-lg transition-colors hover:theme-accent-border"
                            >
                                <div className="theme-accent-border/50 border-b theme-accent-bg/10 p-6">
                                    <div className="mb-3 flex items-start justify-between">
                                        <span className="font-mono text-gray-400 text-xs uppercase tracking-widest">
                                            {campaignId
                                                .replace("_", " ")
                                                .toUpperCase()}
                                        </span>
                                        {campaignProgress?.isCompleted && (
                                            <span className="theme-accent-solid px-2 py-1 font-black text-[10px] text-black uppercase tracking-wide">
                                                Completed
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="mb-2 font-black text-3xl text-white uppercase leading-none">
                                        {typedCampaign?.title}
                                    </h3>
                                    <p className="font-mono text-gray-400 text-sm leading-relaxed">
                                        {typedCampaign?.description}
                                    </p>
                                </div>

                                <div className="flex-1 space-y-2 bg-zinc-900/20 p-4">
                                    {Object.entries(typedCampaign?.levels).map(
                                        ([levelId, level]: [
                                            string,
                                            ICampaignLevel,
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
                                                            ? "theme-accent/30 theme-accent-bg/5 theme-accent/60 hover:theme-accent-bg/10 border-accent-foreground"
                                                            : "border-zinc-800 bg-black theme-accent/40 hover:theme-accent-border hover:theme-accent-bg/10"
                                                    }
                                                `}
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <span
                                                            className={`font-bold font-mono text-xs ${isLevelCompleted ? "opacity-50" : "theme-accent/80"}`}
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
                                                            className="theme-accent opacity-50"
                                                        />
                                                    ) : (
                                                        <Circle
                                                            size={16}
                                                            className="text-zinc-700 transition-colors group-hover/item:theme-accent"
                                                        />
                                                    )}
                                                </Link>
                                            );
                                        }
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
