import { AlertTriangle, Lock, Play } from "lucide-react";
import BackButton from "@/components/BackButton";
import { content_types } from "@/utils/content_types";

interface DailySetupProps {
    user: any;
    selectedTopics: Record<string, string[]>;
    setSelectedTopics: React.Dispatch<
        React.SetStateAction<Record<string, string[]>>
    >;
    postAmount: number;
    setPostAmount: (n: number) => void;
    onStart: () => void;
    isSubmitting: boolean;
}

export const DailySetup = ({
    user,
    selectedTopics,
    setSelectedTopics,
    postAmount,
    setPostAmount,
    onStart,
    isSubmitting,
}: DailySetupProps) => {
    // Helper to toggle topics
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
        <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-zinc-950 font-mono text-green-500">
            <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col gap-2 p-6">
                <BackButton />

                {/* Header */}
                <div className="mb-10 border-green-950 border-b pb-6">
                    <h1 className="font-black text-4xl uppercase tracking-tighter md:text-5xl">
                        Custom Simulation
                    </h1>
                    <p className="mt-4 max-w-2xl text-green-600">
                        Select specific protocols to test your detection
                        ability.
                    </p>
                </div>

                {/* Topics Grid */}
                <div className="mb-24 grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {content_types.map((category, i) => {
                        const isCompleted = user?.campaign_progress?.find(
                            (item: any) =>
                                item?.campaign_id === category?.requirements &&
                                item.isCompleted
                        );

                        // LOCKED STATE
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

                        // UNLOCKED STATE
                        return (
                            <div
                                key={i.toString()}
                                className="border border-green-900 bg-black/60 p-6 transition-all hover:border-green-500"
                            >
                                <h3 className="mb-6 border-green-900/50 border-b pb-4 font-bold text-green-100 text-xl uppercase tracking-wider">
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
                                                className={`cursor-pointer border px-4 py-2 font-bold text-xs uppercase tracking-wider transition-all ${isSelected ? "border-green-500 bg-green-600 text-black" : "border-green-900 bg-black text-green-700 hover:border-green-500"}
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

            {/* Bottom Controls */}
            <div className="fixed right-0 bottom-0 left-0 z-50 border-green-600 border-t-2 bg-black p-4">
                <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
                    <div className="flex items-center gap-2 text-[10px] text-green-800 uppercase tracking-widest md:flex">
                        <AlertTriangle size={14} />
                        <span>
                            AI Judge and Post Generation could be wrong.
                        </span>
                    </div>

                    <div className="flex w-full items-center gap-4 md:w-auto">
                        <div className="flex items-center border border-green-800 bg-zinc-900 px-4 py-2">
                            <span className="mr-4 font-bold text-green-600 text-xs uppercase">
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
                                className="w-12 border-green-500 border-b bg-transparent text-center font-black text-white focus:outline-none"
                            />
                        </div>

                        <button
                            type="button"
                            onClick={onStart}
                            disabled={isSubmitting}
                            className="flex cursor-pointer items-center gap-2 bg-green-600 px-8 py-3 font-black text-black text-lg uppercase transition-all hover:bg-green-500 disabled:opacity-50"
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
