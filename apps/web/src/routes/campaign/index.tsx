import { getCampaign } from "@/apis/campaign";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";

export const Route = createFileRoute("/campaign/")({
    component: RouteComponent,
    beforeLoad: async () => {
        const data = await getCampaign();
        return data;
    },
});

function RouteComponent() {
    const data = useLoaderData({ from: "/campaign/" });
    return (
        <div>
            <h2>Campaign</h2>
            <p>Before starting the shift, get to know the system! :D</p>
            {/* TODO */}
            <div>{Object.entries(data).map((item, i) => {})}</div>
        </div>
    );
}
