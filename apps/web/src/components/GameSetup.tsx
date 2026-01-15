import { AlertTriangle, Lock, Play } from "lucide-react";
import { content_types } from "@/utils/content_types";
import type { ICampaignProgress, IUser } from "@/types";

interface GameSetupProps {
    user: IUser | null;
    selectedTopics: Record<string, string[]>;
    setSelectedTopics: React.Dispatch<
        React.SetStateAction<Record<string, string[]>>
    >;
    postAmount: number;
    setPostAmount: (n: number) => void;
    onStart: () => void;
    isSubmitting: boolean;
    mode: string;
}

export const GameSetup = ({
    user,
    selectedTopics,
    setSelectedTopics,
    postAmount,
    setPostAmount,
    onStart,
    isSubmitting,
    mode,
}: GameSetupProps) => {
    const toggleTopic = (category: string, topic: string) => {
        setSelectedTopics((prev) => {
            const current = prev[category] || [];
            const exists = current.includes(topic);
            return {
                ...prev,
                [category]: exists
                    ? current.filter((t) => t !== topic)
                    : [...current, topic],
            };
        });
    };

    return (
        <div className="relative flex min-h-[calc(100vh-4rem)] flex-col overflow-x-hidden font-mono theme-accent">
            <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col gap-2 p-6">
                <div className="mb-10 border-gray-800 border-b pb-6">
                    <div className="flex items-center gap-3 mb-4">
                        <h1 className="font-black text-4xl text-white uppercase tracking-tighter md:text-5xl">
                            {mode === "practice"
                                ? "Practice Mode"
                                : "Custom Simulation"}
                        </h1>
                        {mode === "practice" && (
                            <div className="px-3 py-1 border border-blue-500/50 bg-blue-500/10 rounded-sm">
                                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">
                                    No Stats Tracked
                                </span>
                            </div>
                        )}
                    </div>
                    <p className="mt-4 max-w-2xl text-gray-600">
                        {mode === "practice"
                            ? "Perfect your detection skills with no pressure. Your progress won't be recorded."
                            : "Select specific protocols to test your detection ability."}
                    </p>
                </div>

                <div className="mb-24 grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {content_types.map((category, i) => {
                        if (mode === "daily") {
                            const isCompleted = user?.campaign_progress?.find(
                                (item: ICampaignProgress) =>
                                    item?.campaign_id ===
                                        category?.requirements &&
                                    item.isCompleted
                            );

                            if (category.requirements && !isCompleted) {
                                return (
                                    <div
                                        key={i.toString()}
                                        className="flex flex-col items-center justify-center gap-4 border-2 border-zinc-800 border-dashed bg-zinc-900/30 p-8 text-center opacity-60 grayscale"
                                    >
                                        <div className="rounded-full border border-zinc-800 bg-black p-4">
                                            <Lock size={32} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-xl text-zinc-500 uppercase tracking-widest">
                                                {category.name}
                                            </h3>
                                            <p className="mt-2 border border-red-900/50 bg-red-900/20 px-2 py-1 font-mono text-red-400 text-xs">
                                                LOCKED: Complete{" "}
                                                {category.requirements}
                                            </p>
                                        </div>
                                    </div>
                                );
                            }
                        }

                        return (
                            <div
                                key={i.toString()}
                                className="border theme-accent-border bg-black/60 p-6 transition-all hover:theme-accent-border"
                            >
                                <h3 className="mb-6 theme-accent-border/50 border-b pb-4 font-bold theme-accent text-xl uppercase tracking-wider">
                                    {category.name}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {category.types.map((t) => {
                                        const isSelected = selectedTopics[
                                            category.name
                                        ]?.includes(t.name);
                                        return (
                                            <button
                                                key={t.name}
                                                type="button"
                                                onClick={() =>
                                                    toggleTopic(
                                                        category.name,
                                                        t.name
                                                    )
                                                }
                                                className={`cursor-pointer border px-4 py-2 font-bold text-xs uppercase tracking-wider transition-all ${isSelected ? "theme-accent-solid theme-accent-border text-black" : "theme-accent-border bg-black theme-accent hover:theme-accent-border"}
                                                `}
                                            >
                                                {isSelected ? "[X]" : "[ ]"}{" "}
                                                {t.name}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="md:fixed md:right-0 md:bottom-0 md:left-0 md:z-50 theme-accent-border border-t-2 bg-black p-4">
                <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
                    <div className="flex items-center gap-2 text-[10px] theme-accent/60 uppercase tracking-widest md:flex">
                        <AlertTriangle size={14} />
                        <span>
                            AI Judge and Post Generation could be wrong.
                        </span>
                    </div>

                    <div className="flex flex-col md:flex-row w-full items-center gap-4 md:w-auto">
                        <div className="flex items-center border theme-accent-border bg-zinc-900 px-4 py-2">
                            <span className="mr-4 font-bold theme-accent text-xs uppercase">
                                Post Amount:
                            </span>
                            <input
                                type="number"
                                min={1}
                                max={5}
                                value={postAmount}
                                onChange={(e) =>
                                    setPostAmount(Number(e.target.value))
                                }
                                className="w-12 theme-accent-border bg-transparent text-center font-black text-white focus:outline-none"
                            />
                        </div>

                        <button
                            type="button"
                            onClick={onStart}
                            disabled={isSubmitting}
                            className="flex cursor-pointer items-center gap-2 theme-accent-solid px-8 py-3 font-black text-black text-lg uppercase transition-all hover:opacity-90 disabled:opacity-50"
                        >
                            {isSubmitting ? (
                                "Generating..."
                            ) : (
                                <>
                                    <Play size={20} fill="black" /> Generate
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
