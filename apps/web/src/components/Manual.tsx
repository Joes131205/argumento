import { ArrowLeft, BookMarked, ListChecks } from "lucide-react";
import { useState } from "react";
import { content_types } from "@/utils/content_types";

const Manual = () => {
    const [currTypeIndex, setCurrTypeIndex] = useState(0);
    const [currTopicIndex, setCurrTopicIndex] = useState(0);

    const [isOpened, setIsOpened] = useState<boolean>(false);

    return (
        <div className="relative flex h-full w-full flex-col overflow-hidden rounded-lg border border-zinc-700 bg-zinc-900 shadow-[0_0_30px_rgba(0,255,100,0.1)]">
            <div className="flex shrink-0 items-center justify-between border-b border-zinc-700 bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 p-6">
                <div className="flex items-center gap-4">
                    <div className="theme-accent mb-4 inline-flex rounded bg-zinc-900/50 p-2">
                        <BookMarked size={24} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="font-black text-xl uppercase tracking-tight text-white">
                            Manual
                        </p>
                        <p className="text-sm text-zinc-400">
                            Use this whenever necessary
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 scrollbar-track-transparent scrollbar-thumb-zinc-700 scrollbar-thin">
                {isOpened ? (
                    <div className="space-y-8">
                        <button
                            type="button"
                            onClick={() => setIsOpened(false)}
                            className="theme-accent mb-6 flex cursor-pointer items-center gap-2 font-bold font-mono text-sm uppercase tracking-wide transition-all hover:text-[var(--accent-light)] hover:translate-x-1"
                        >
                            <ArrowLeft size={16} /> Back to Topics
                        </button>

                        <div className="theme-accent-border border-l-4 pl-6">
                            <h3 className="mb-4 font-black text-4xl uppercase tracking-tight text-white">
                                {
                                    content_types[currTypeIndex].types[
                                        currTopicIndex
                                    ].name
                                }
                            </h3>
                            <p className="font-mono text-sm uppercase tracking-widest text-zinc-400">
                                {content_types[currTypeIndex].name} • Topic{" "}
                                {currTopicIndex + 1}
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-3 rounded-lg border border-zinc-800 bg-zinc-950/50 p-6">
                                <h4 className="font-bold text-lg text-white uppercase tracking-wider">
                                    Definition
                                </h4>
                                <p className="font-light text-lg leading-relaxed text-zinc-300">
                                    {
                                        content_types[currTypeIndex].types[
                                            currTopicIndex
                                        ].definition
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-8">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            {content_types.map((item, i) => (
                                <div
                                    key={i.toString()}
                                    className="group rounded-lg border border-zinc-800 bg-gradient-to-br from-zinc-900/50 to-zinc-950 p-6 transition-all duration-300 hover:border-[var(--accent-color)] hover:bg-zinc-900 hover:shadow-[0_0_20px_rgba(22,163,74,0.15)]"
                                >
                                    <div className="theme-accent mb-4 inline-flex rounded bg-zinc-900/50 p-2">
                                        <BookMarked size={20} />
                                    </div>
                                    <h3 className="mb-2 font-black text-lg text-white uppercase tracking-tight">
                                        {item.name}
                                    </h3>
                                    <p className="mb-6 text-sm text-zinc-400 leading-relaxed">
                                        {item.description}
                                    </p>
                                    <div className="flex flex-wrap items-center gap-2">
                                        {item.types.map((type, j) => (
                                            <button
                                                type="button"
                                                key={type.name}
                                                className="theme-accent-border relative cursor-pointer overflow-hidden border px-4 py-2 font-bold text-white text-xs uppercase tracking-wider transition-all duration-200 hover:bg-[var(--accent-color)] hover:text-black hover:shadow-[0_0_15px_rgba(22,163,74,0.3)]"
                                                onClick={() => {
                                                    setCurrTypeIndex(i);
                                                    setCurrTopicIndex(j);
                                                    setIsOpened(true);
                                                }}
                                            >
                                                {type.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Manual;
