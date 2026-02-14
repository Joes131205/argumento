import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { content_types } from "@/utils/content_types";

const Manual = () => {
    const [currTypeIndex, setCurrTypeIndex] = useState(0);
    const [currTopicIndex, setCurrTopicIndex] = useState(0);

    const [isOpened, setIsOpened] = useState<boolean>(false);

    return (
        <div className="relative flex h-full w-full flex-col overflow-y-scroll rounded-lg border border-zinc-700 bg-zinc-900 shadow-[0_0_30px_rgba(0,255,100,0.1)]">
            <div className="flex shrink-0 items-center justify-between border-zinc-700 border-b bg-zinc-950 p-4">
                <div className="flex flex-col gap-3">
                    <p className="font-bold text-2xl text-white">
                        Manual v1.1.1
                    </p>
                    <p className="text-white">
                        Use the manual when it's necessary
                    </p>
                </div>
            </div>

            <div className=" overflow-visible scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent flex-1 overflow-y-auto p-6">
                {isOpened ? (
                    <div>
                        <button
                            type="button"
                            onClick={() => setIsOpened(false)}
                            className="theme-accent mb-6 flex cursor-pointer items-center gap-2 font-bold font-mono text-sm uppercase tracking-wide transition-colors hover:text-[var(--accent-light)]"
                        >
                            <ArrowLeft /> Return
                        </button>

                        <h3 className="mb-6 font-black text-4xl text-white tracking-tight">
                            {
                                content_types[currTypeIndex].types[
                                    currTopicIndex
                                ].name
                            }
                        </h3>

                        <div className="prose prose-invert max-w-none">
                            <p className="mb-8 font-light text-xl text-zinc-300 leading-relaxed">
                                {
                                    content_types[currTypeIndex].types[
                                        currTopicIndex
                                    ].definition
                                }
                            </p>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="grid grid-cols-1 gap-4 overflow-y-auto sm:grid-cols-2">
                            {content_types.map((item, i) => (
                                <div
                                    key={i.toString()}
                                    className="rounded-lg border border-zinc-800 bg-zinc-950 p-4 transition-all duration-300 hover:border-[var(--accent-light)] hover:shadow-[0_0_15px_rgba(0,255,100,0.1)]"
                                >
                                    <h3 className="mb-1 font-bold text-lg text-white">
                                        {item.name}
                                    </h3>
                                    <p className="mb-3 text-sm text-zinc-400">
                                        {item.description}
                                    </p>
                                    <div className="flex flex-wrap items-center gap-2">
                                        {item.types.map((type, j) => (
                                            <button
                                                type="button"
                                                key={type.name}
                                                className="group/btn theme-accent-border relative cursor-pointer overflow-hidden border px-4 py-2 font-bold text-white text-xs uppercase tracking-wider transition-all hover:bg-[var(--accent-color)] hover:text-black"
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
