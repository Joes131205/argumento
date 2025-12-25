import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { healthCheck } from "@/apis";
import BackButton from "@/components/BackButton";

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
        <div className="flex h-screen flex-col items-center justify-center gap-10">
            <div
                className={`h-10 w-10 animate-pulse rounded-full ${res === "OK" ? "bg-green-500" : res === "NOT OK" ? "bg-orange-500" : res === "SERVER ERROR" ? "bg-red-500" : "bg-yellow-300"}`}
            />
            <p className="text-2xl">
                Server Status : <b>{res ?? "Loading"}</b>
            </p>
            <BackButton />
        </div>
    );
}
