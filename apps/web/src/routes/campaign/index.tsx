import { getCampaign } from "@/apis/campaign";
import useUser from "@/hooks/useUser";
import { createFileRoute, Link, useLoaderData } from "@tanstack/react-router";

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
                <h2 className="text-3xl font-bold mb-2">Campaign</h2>
                <p className="">
                    Before starting the shift, get to know the system! :D
                </p>
            </div>

            <div className="space-y-8 flex gap-5 flex-wrap">
                {Object.entries(data).map(([campaignId, campaign]) => {
                    const campaignProgress = user?.campaign_progress?.find(
                        (cp) => cp.campaign_id === campaignId
                    );
                    const isUnlocked = user?.campaign_progress?.find(
                        (cp) => cp.campaign_id === campaign?.requirement
                    );
                    if (!isUnlocked?.isCompleted && campaign.requirement) {
                        return (
                            <div
                                key={campaignId}
                                className="border-5 border-green-500 p-6 flex-1 h-auto"
                            >
                                locked
                            </div>
                        );
                    }

                    return (
                        <div
                            key={campaignId}
                            className="border-5 border-green-500 p-6 flex-1 h-auto"
                        >
                            <div className="mb-4 flex flex-col gap-2.5 items-start">
                                <h3 className="text-2xl font-bold mb-2">
                                    {campaign?.title}
                                </h3>
                                <p className="mb-2">{campaign?.description}</p>
                                {campaignProgress?.isCompleted && (
                                    <span className="inline-block px-3 py-1 border-green-500 border-5 text-green-500 rounded-full text-sm">
                                        Completed
                                    </span>
                                )}
                            </div>

                            <div className="space-y-2">
                                {Object.entries(campaign?.levels).map(
                                    ([levelId, level]) => {
                                        const isLevelCompleted =
                                            campaignProgress?.levelsCompleted.includes(
                                                levelId
                                            );

                                        return (
                                            <div
                                                key={levelId}
                                                className="flex items-center justify-between gap-2"
                                            >
                                                <Link
                                                    to="/campaign/$level/$id"
                                                    params={{
                                                        level: campaignId,
                                                        id: levelId,
                                                    }}
                                                    className="text-green-500 underline p-3"
                                                >
                                                    {level?.title}
                                                </Link>
                                                {isLevelCompleted ? (
                                                    <span className="text-lg text-green-500 ">
                                                        ✓ Completed
                                                    </span>
                                                ) : (
                                                    <span className="text-lg text-red-500 ">
                                                        Incomplete
                                                    </span>
                                                )}
                                            </div>
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
