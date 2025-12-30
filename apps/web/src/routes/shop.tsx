import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/shop")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className="min-h-[calc(100vh-4rem)] bg-zinc-950 p-6 font-mono text-zinc-300 lg:p-12">
            <div className="mx-auto flex max-w-6xl flex-col gap-8">
                <div className="flex flex-col gap-4">
                    <div className="mt-4 border-zinc-800 border-b pb-6">
                        <h1 className="font-black text-4xl text-white uppercase tracking-tight md:text-5xl">
                            Shop
                        </h1>
                    </div>
                </div>
                <div className="">
                    <p>Not implemented yet!</p>
                    <p>Please come back later :D</p>
                </div>
            </div>
        </div>
    );
}
