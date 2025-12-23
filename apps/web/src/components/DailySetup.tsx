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
        <div className="min-h-screen bg-zinc-950 text-green-500 font-mono relative overflow-x-hidden flex flex-col">
            <div className="relative z-10 max-w-6xl mx-auto w-full p-6 flex-1 flex flex-col gap-2">
                <BackButton />

                {/* Header */}
                <div className="mb-10 border-b border-green-950 pb-6">
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">
                        Custom Simulation
                    </h1>
                    <p className="mt-4 text-green-600 max-w-2xl">
                        Select specific protocols to test your detection
                        ability.
                    </p>
                </div>

                {/* Topics Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-24">
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
                                    key={i}
                                    className="border-2 border-dashed border-zinc-800 bg-zinc-900/30 p-8 flex flex-col items-center justify-center text-center gap-4 opacity-60 grayscale"
                                >
                                    <div className="bg-black p-4 rounded-full border border-zinc-800">
                                        <Lock size={32} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-xl uppercase tracking-widest text-zinc-500">
                                            {category.name}
                                        </h3>
                                        <p className="text-xs font-mono mt-2 bg-red-900/20 text-red-400 px-2 py-1 border border-red-900/50">
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
                                key={i}
                                className="border border-green-900 bg-black/60 p-6 hover:border-green-500 transition-all"
                            >
                                <h3 className="font-bold text-xl uppercase tracking-wider text-green-100 mb-6 border-b border-green-900/50 pb-4">
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
                                                className={`
                                                    cursor-pointer px-4 py-2 text-xs uppercase font-bold tracking-wider transition-all border
                                                    ${isSelected ? "bg-green-600 border-green-500 text-black" : "bg-black border-green-900 text-green-700 hover:border-green-500"}
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
            <div className="fixed bottom-0 left-0 right-0 bg-black border-t-2 border-green-600 p-4 z-50">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-2 text-[10px] text-green-800 uppercase tracking-widest hidden md:flex">
                        <AlertTriangle size={14} />
                        <span>
                            AI Judge and Post Generation could be wrong.
                        </span>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="flex items-center bg-zinc-900 border border-green-800 px-4 py-2">
                            <span className="font-bold text-xs uppercase mr-4 text-green-600">
                                Batch Size:
                            </span>
                            <input
                                type="number"
                                min={1}
                                max={5}
                                value={postAmount}
                                onChange={(e) =>
                                    setPostAmount(Number(e.target.value))
                                }
                                className="bg-transparent border-b border-green-500 text-white w-12 text-center font-black focus:outline-none"
                            />
                        </div>

                        <button
                            type="button"
                            onClick={onStart}
                            disabled={isSubmitting}
                            className="cursor-pointer bg-green-600 hover:bg-green-500 text-black text-lg font-black uppercase px-8 py-3 transition-all flex items-center gap-2 disabled:opacity-50"
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
