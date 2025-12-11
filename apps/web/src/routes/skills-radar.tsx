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
        <div className="flex flex-col items-center justify-center gap-5 p-5">
            <h2 className="font-black text-5xl md:text-6xl tracking-tight">
                User Statistic
            </h2>
            <p>Which is your weakest and strongest area?</p>
            <div className="flex gap-5 ">
                {Object.entries(user?.stats ?? {}).map(([key, value]) => (
                    <div
                        key={key}
                        className="flex flex-col items-center justify-center border-3 border-green-500 p-5 grid-cols-1 gap-3"
                    >
                        <p className="text-lg font-black">{value.name}</p>
                        <p>
                            {value.correct} Correct | {value.total} Total
                        </p>
                        <p>
                            {(value.correct || 0 / value.total || 0) * 100} %
                            Acc
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
