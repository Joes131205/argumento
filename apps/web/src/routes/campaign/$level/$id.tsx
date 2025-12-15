import { getLevel } from "@/apis/campaign";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";

export const Route = createFileRoute("/campaign/$level/$id")({
    component: RouteComponent,
    loader: async ({ params }) => {
        const data = await getLevel(params.level, params.id);
        console.log(data);
        return data;
    },
});

function RouteComponent() {
    const data = useLoaderData({ from: "/campaign/$level/$id" });
    console.log(data);
    return (
        <div>
            <p>{data.title}</p>
            <p>{data.briefing}</p>
        </div>
    );
}
