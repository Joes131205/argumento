import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/play/campaign")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div>
            <p>Campaign</p>
        </div>
    );
}
