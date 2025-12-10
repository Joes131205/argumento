import useUser from "@/hooks/useUser";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/skills-radar")({
    component: RouteComponent,
    beforeLoad: async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            throw redirect({
                to: "/sign-in",
                search: {
                    redirect: "/skills-radar",
                },
            });
        }
    },
});

function RouteComponent() {
    const { user } = useUser();
    console.log(user);
    return (
        <div>
            <h2>User Statistic</h2>
            <div>
                {Object.entries(user?.stats ?? {}).map(([key, value]) => (
                    <div key={key}>
                        <p>{value.name || "Something"}</p>
                        <p>
                            {value.correct} / {value.total}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
