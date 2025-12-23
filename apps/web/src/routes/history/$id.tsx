import { getPost } from "@/apis/posts";
import BackButton from "@/components/BackButton";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";

export const Route = createFileRoute("/history/$id")({
    component: RouteComponent,
    loader: async ({ params }) => {
        const data = await getPost(params.id);
        return data;
    },
});

function RouteComponent() {
    const data = useLoaderData({ from: "/history/$id" });
    return (
        <div>
            <BackButton />
            <h1>{data?.headline}</h1>
            <p>{data?.content}</p>
        </div>
    );
}
