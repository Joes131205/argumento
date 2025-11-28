import { healthCheck } from "@/apis";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";

export const Route = createFileRoute("/status")({
    component: RouteComponent,
    loader: async () => {
        const res = await healthCheck();
        return res;
    },
});

function RouteComponent() {
    const res = useLoaderData({ from: "/status" });
    return (
        <div>
            <p>
                Server Status : <b>{res ?? "Loading"}</b>
            </p>
        </div>
    );
}
