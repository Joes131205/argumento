import { createFileRoute } from "@tanstack/react-router";
import BackButton from "@/components/BackButton";
import useUser from "@/hooks/useUser";
import { requireAuth } from "@/utils/requireAuth";

export const Route = createFileRoute("/skills-radar")({
    beforeLoad: requireAuth,
    component: RouteComponent,
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
            <div className="space-y-2 text-center">
                <h2 className="font-black text-5xl tracking-tight md:text-6xl">
                    User Statistics
                </h2>
                <p className="text-lg text-muted-foreground">
                    Which is your weakest and strongest area?
                </p>
            </div>

            <div className="grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                                  key={item.stat_id}
                                  className={`flex flex-col rounded-xl border-2 p-6 ${getAccuracyColor(accuracyNum)} shadow-lg transition-all duration-300 hover:shadow-xl`}
                              >
                                  <h3 className="mb-4 font-bold text-2xl capitalize">
                                      {item.name}
                                  </h3>

                                  <div className="mb-4 space-y-3">
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
                                      <div className="mb-2 flex items-center justify-between">
                                          <span className="font-medium text-sm">
                                              Accuracy
                                          </span>
                                          <span
                                              className={`font-bold text-2xl ${getAccuracyColor(accuracyNum)}`}
                                          >
                                              {accuracy}%
                                          </span>
                                      </div>
                                      <div className="h-3 w-full overflow-hidden rounded-full bg-zinc-800">
                                          <div
                                              className={`h-full ${getProgressColor(accuracyNum)} rounded-full transition-all duration-500`}
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
                <div className="p-10 text-center text-muted-foreground">
                    <p className="text-xl">
                        No statistics yet. Start playing to see your progress!
                    </p>
                </div>
            )}
        </div>
    );
}
