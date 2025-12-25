import { createFileRoute, Link } from "@tanstack/react-router";
import BackButton from "@/components/BackButton";
import useUser from "@/hooks/useUser";
import { requireAuth } from "@/utils/requireAuth";

export const Route = createFileRoute("/history/")({
    beforeLoad: requireAuth,

    component: RouteComponent,
});

function RouteComponent() {
    const { user } = useUser();
    console.log(user?.postsHistory);
    return (
        <div className="flex flex-col items-center justify-center gap-5 p-6">
            <BackButton />

            <h2 className="mb-6 font-bold text-3xl">Your Processed Posts</h2>
            <div className="max-w-4xl space-y-4">
                {user?.postsHistory?.length === 0 ? (
                    <p className="text-gray-500">No posts processed yet.</p>
                ) : (
                    user?.postsHistory?.map((post: any, index: number) => (
                        <div
                            key={index.toString()}
                            className="rounded-lg border border-green-500 p-4 transition-shadow hover:shadow-md"
                        >
                            <Link
                                to="/history/$id"
                                params={{
                                    id: post?.post?._id,
                                }}
                            >
                                <div className="mb-2 flex items-start justify-between">
                                    <h3 className="font-semibold text-lg">
                                        {post.post.headline ||
                                            `Post ${index + 1}`}
                                    </h3>
                                    <span className="text-green-700 text-sm">
                                        {new Date(
                                            post.post.createdAt
                                        ).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="flex gap-4 text-sm">
                                    <span className="text-green-700">
                                        Post Type: {post.post.type}
                                    </span>
                                    {post?.post?.type === "slop" && (
                                        <span className="text-green-700">
                                            Fallacy:{" "}
                                            {post?.post?.reasons.join(", ") ||
                                                ""}
                                        </span>
                                    )}
                                </div>
                                <p
                                    className={`${post?.is_correct ? "text-green-500" : "text-red-500"}`}
                                >
                                    {post?.is_correct ? "Correct" : "Incorrect"}
                                </p>
                            </Link>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
