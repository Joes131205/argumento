import useUser from "@/hooks/useUser";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/history")({
    component: RouteComponent,
});

function RouteComponent() {
    const { user } = useUser();
    console.log(user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            toast.info("Please sign in to continue!");
            navigate({ to: "/sign-in" });
        }
    }, [user, navigate]);

    if (!user) {
        return null;
    }

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6">Your Processed Posts</h2>
            <div className="space-y-4 max-w-4xl">
                {user.postsHistory?.length === 0 ? (
                    <p className="text-gray-500">No posts processed yet.</p>
                ) : (
                    user.postsHistory?.map((post: any, index: number) => (
                        <div
                            key={index}
                            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-semibold text-lg">
                                    {post.headline || `Post ${index + 1}`}
                                </h3>
                                <span className="text-sm text-gray-500">
                                    {new Date(
                                        post.createdAt
                                    ).toLocaleDateString()}
                                </span>
                            </div>
                            <p className="text-gray-700 mb-2">{post.content}</p>
                            <div className="flex gap-4 text-sm">
                                <span className="text-gray-600">
                                    Post Type: {post.type}
                                </span>
                                {post.slop_reason && (
                                    <span className="text-gray-600">
                                        Fallacy: {post.slop_reason}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
