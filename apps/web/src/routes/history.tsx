import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/history")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div>
            <h2>History</h2>
        </div>
    );
}
