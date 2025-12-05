import { useState } from "react";
import { content_types } from "@/utils/content_types";

const Manual = () => {
    const [currTypeIndex, setCurrTypeIndex] = useState(0);
    const [currTopicIndex, setCurrTopicIndex] = useState(0);

    const [isOpened, setIsOpened] = useState<boolean>(false);

    return (
        <div>
            {/* The Main Card Container */}
            <div className="bg-zinc-900 w-full max-w-4xl h-[85vh] rounded-lg shadow-[0_0_30px_rgba(0,255,100,0.1)] flex flex-col border border-zinc-700 overflow-hidden relative">
                {/* --- HEADER --- */}
                <div className="bg-zinc-950 p-4 border-b border-zinc-700 flex justify-between items-center shrink-0">
                    <div className="flex flex-col gap-3">
                        <p className="text-white text-2xl font-bold">
                            Manual v1.1
                        </p>
                        <p className="text-white">Use it whenever necessary</p>
                    </div>
                </div>

                {/* --- CONTENT AREA --- */}
                <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
                    {isOpened ? (
                        <div>
                            <button
                                type="button"
                                onClick={() => setIsOpened(false)}
                                className="mb-6 flex items-center gap-2 text-green-500 hover:text-green-300 transition-colors font-mono text-sm font-bold uppercase tracking-wide"
                            >
                                ← Return to Index
                            </button>

                            <h3 className="text-4xl font-black text-white mb-6 tracking-tight">
                                {
                                    content_types[currTypeIndex].types[
                                        currTopicIndex
                                    ].name
                                }
                            </h3>

                            <div className="prose prose-invert max-w-none">
                                <p className="text-xl text-zinc-300 leading-relaxed mb-8 font-light">
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
                            <p className="text-zinc-400 mb-6 font-mono text-sm border-b border-zinc-800 pb-4">
                                Select a topic to review
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {content_types.map((item, i) => (
                                    <div
                                        key={i.toString()}
                                        className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 hover:border-green-500/50 hover:shadow-[0_0_15px_rgba(0,255,100,0.1)] transition-all duration-300"
                                    >
                                        <h3 className="text-white font-bold text-lg mb-1">
                                            {item.name}
                                        </h3>
                                        <p className="text-zinc-400 text-sm mb-3">
                                            {item.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {item.types.map((type, j) => (
                                                <button
                                                    type="button"
                                                    key={type.name}
                                                    className="text-xs bg-zinc-800 text-green-400 px-2 py-1 rounded-full font-mono"
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
        </div>
    );
};

export default Manual;
