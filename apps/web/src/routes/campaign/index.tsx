import { getCampaign } from "@/apis/campaign";
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
    console.log(data);
    return (
        <div>
            <h2>Campaign</h2>
            <p>Before starting the shift, get to know the system! :D</p>
            {/* TODO */}
            <div>
                {Object.entries(data).map(([key1, item1]) => {
                    return (
                        <div key={key1}>
                            <p className="text-2xl font-bold">{item1?.title}</p>
                            <p>{item1?.description}</p>
                            <div>
                                {Object.entries(item1?.levels).map(
                                    ([key2, item2]) => {
                                        return (
                                            <div key={key2}>
                                                <Link
                                                    to="/campaign/$level/$id"
                                                    params={{
                                                        level: key1,
                                                        id: key2,
                                                    }}
                                                >
                                                    {item2?.title}
                                                </Link>
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
