import BackButton from "@/components/BackButton";
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

    const getAccuracyColor = (accuracy: number) => {
        if (accuracy >= 80) return "text-green-500 border-green-500";
        if (accuracy >= 60) return "text-yellow-500 border-yellow-500";
        return "text-red-500 border-red-500";
    };

    const getProgressColor = (accuracy: number) => {
        if (accuracy >= 80) return "bg-green-500";
        if (accuracy >= 60) return "bg-yellow-500";
        return "bg-red-500";
    };

    return (
        <div className="flex flex-col items-center justify-center gap-8 p-5 md:p-10">
            <BackButton />
            <div className="text-center space-y-2">
                <h2 className="font-black text-5xl md:text-6xl tracking-tight">
                    User Statistics
                </h2>
                <p className="text-lg text-muted-foreground">
                    Which is your weakest and strongest area?
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
                {user?.stats?.length
                    ? user?.stats.map((item) => {
                          const accuracy =
                              item.total > 0
                                  ? ((item.correct / item.total) * 100).toFixed(
                                        1
                                    )
                                  : "0.0";
                          const accuracyNum = Number.parseFloat(accuracy);

                          return (
                              <div
                                  key={item.stats_id}
                                  className={`flex flex-col p-6 rounded-xl border-2 ${getAccuracyColor(accuracyNum)} shadow-lg hover:shadow-xl transition-all duration-300`}
                              >
                                  <h3 className="text-2xl font-bold mb-4 capitalize">
                                      {item.name}
                                  </h3>

                                  <div className="space-y-3 mb-4">
                                      <div className="flex justify-between text-sm">
                                          <span className="text-muted-foreground">
                                              Correct
                                          </span>
                                          <span className="font-semibold">
                                              {item.correct}
                                          </span>
                                      </div>
                                      <div className="flex justify-between text-sm">
                                          <span className="text-muted-foreground">
                                              Total
                                          </span>
                                          <span className="font-semibold">
                                              {item.total}
                                          </span>
                                      </div>
                                  </div>

                                  <div className="mt-auto">
                                      <div className="flex items-center justify-between mb-2">
                                          <span className="text-sm font-medium">
                                              Accuracy
                                          </span>
                                          <span
                                              className={`text-2xl font-bold ${getAccuracyColor(accuracyNum)}`}
                                          >
                                              {accuracy}%
                                          </span>
                                      </div>
                                      <div className="w-full bg-zinc-800 rounded-full h-3 overflow-hidden">
                                          <div
                                              className={`h-full ${getProgressColor(accuracyNum)} transition-all duration-500 rounded-full`}
                                              style={{
                                                  width: `${Math.min(accuracyNum, 100)}%`,
                                              }}
                                          />
                                      </div>
                                  </div>
                              </div>
                          );
                      })
                    : ""}
            </div>

            {(!user?.stats || Object.keys(user.stats).length === 0) && (
                <div className="text-center p-10 text-muted-foreground">
                    <p className="text-xl">
                        No statistics yet. Start playing to see your progress!
                    </p>
                </div>
            )}
        </div>
    );
}
