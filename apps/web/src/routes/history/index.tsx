import { createFileRoute, Link } from "@tanstack/react-router";
import useUser from "@/hooks/useUser";
import BackButton from "@/components/BackButton";

export const Route = createFileRoute("/history/")({
    component: RouteComponent,
});

function RouteComponent() {
    const { user } = useUser();
    console.log(user?.postsHistory);
    return (
        <div className="p-6 flex flex-col gap-5 items-center justify-center">
            <BackButton />

            <h2 className="text-3xl font-bold mb-6">Your Processed Posts</h2>
            <div className="space-y-4 max-w-4xl">
                {user?.postsHistory?.length === 0 ? (
                    <p className="text-gray-500">No posts processed yet.</p>
                ) : (
                    user?.postsHistory?.map((post: any, index: number) => (
                        <div
                            key={index.toString()}
                            className="border border-green-500 rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                            <Link
                                to="/history/$id"
                                params={{
                                    id: post?.post?._id,
                                }}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-semibold text-lg">
                                        {post.post.headline ||
                                            `Post ${index + 1}`}
                                    </h3>
                                    <span className="text-sm text-green-700">
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
