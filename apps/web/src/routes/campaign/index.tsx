import { getCampaign } from "@/apis/campaign";
import useUser from "@/hooks/useUser";
import { createFileRoute, Link, useLoaderData } from "@tanstack/react-router";
import {
    ArrowLeft,
    CheckCircle,
    Circle,
    CircleCheck,
    Lock,
} from "lucide-react";

export const Route = createFileRoute("/campaign/")({
    component: RouteComponent,
    loader: async () => {
        const data = await getCampaign();
        console.log(data);
        return data;
    },
});

function RouteComponent() {
    const data = useLoaderData({ from: "/campaign/" });
    const { user } = useUser();

    return (
        <div className="p-6">
            <div className="mb-8">
                <Link to=".." className="flex gap-2">
                    <ArrowLeft /> Go back
                </Link>
                <h2 className="text-3xl font-bold mb-2">Campaign</h2>
                <p className="">
                    Before starting the shift, get to know the system! :D
                </p>
            </div>

            <div className="grid grid-cols-2 gap-5">
                {Object.entries(data).map(([campaignId, campaign]) => {
                    const campaignProgress = user?.campaign_progress?.find(
                        (cp) => cp.campaign_id === campaignId
                    );
                    const isUnlocked = user?.campaign_progress?.find(
                        (cp) => cp.campaign_id === campaign?.requirement
                    );
                    if (!isUnlocked?.isCompleted && campaign.requirement) {
                        return (
                            <div className="border-5 border-green-500 p-6 flex flex-col items-center justify-center gap-5">
                                <Lock size={100} />

                                <p className="text-2xl font-bold">
                                    Access Denied!
                                </p>
                                <p>
                                    You need to complete [
                                    {campaign?.requirement?.replace(
                                        "campaign_",
                                        "Campaign "
                                    )}
                                    ] first!
                                </p>
                            </div>
                        );
                    }

                    return (
                        <div
                            key={campaignId}
                            className="border-5 border-green-500 flex-1 h-auto"
                        >
                            <div className="mb-4 flex flex-col gap-2.5 items-start border-b-2 border-b-green-500 p-5">
                                <h3 className="text-2xl font-bold mb-2">
                                    {campaign?.title}
                                </h3>
                                <p className="mb-2">{campaign?.description}</p>
                                {campaignProgress?.isCompleted && (
                                    <span className="inline-block px-3 py-1 bg-green-500 text-black font-bold text-sm">
                                        [ Completed ]
                                    </span>
                                )}
                            </div>

                            <div className="space-y-2 p-5">
                                {Object.entries(campaign?.levels).map(
                                    ([levelId, level]) => {
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
                                                className={`
                                            group flex items-center justify-between p-3 border border-transparent
                                            hover:border-green-500/50 hover:bg-green-500/10 transition-all cursor-pointer
                                            ${isLevelCompleted ? "opacity-50 hover:opacity-100" : "opacity-100"}
                                        `}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span
                                                        className={`text-xs font-bold ${isLevelCompleted ? "text-green-700" : "text-green-400"}`}
                                                    >
                                                        {levelId
                                                            .toUpperCase()
                                                            .replace(
                                                                "LEVEL_",
                                                                "0"
                                                            )}
                                                    </span>
                                                    <span className="font-bold group-hover:underline decoration-green-500 underline-offset-4">
                                                        {level?.title}
                                                    </span>
                                                </div>

                                                {isLevelCompleted ? (
                                                    <CheckCircle
                                                        size={18}
                                                        className="text-green-500"
                                                    />
                                                ) : (
                                                    <Circle
                                                        size={18}
                                                        className="text-green-900 group-hover:text-green-500"
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
    );
}
