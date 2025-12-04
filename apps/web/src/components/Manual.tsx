import { useState } from "react";
import { content_types } from "@/utils/content_types";
const Manual = () => {
    const [index, setIndex] = useState<number>(0);
    const [isOpened, setIsOpened] = useState<boolean>(false);

    return (
        <div>
            <div className="bg-zinc-900 w-full max-w-4xl h-[85vh] rounded-lg shadow-[0_0_30px_rgba(0,255,100,0.1)] flex flex-col border border-zinc-700 overflow-hidden relative">
                <div className="bg-zinc-950 p-4 border-b border-zinc-700 flex justify-between items-center shrink-0">
                    <div className="flex flex-col gap-3">
                        <p className="text-white text-2xl font-bold">Manual</p>
                        <p className="text-white">Use it whenever necessary</p>
                    </div>
                </div>

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
                                {manual[index].title}
                            </h3>

                            <div className="prose prose-invert max-w-none">
                                <p className="text-xl text-zinc-300 leading-relaxed mb-8 font-light">
                                    {manual[index].desc}
                                </p>
                            </div>

                            <div className="bg-zinc-950 border-l-4 border-green-500 p-6 rounded-r-lg">
                                <h4 className="text-xs font-bold text-green-500 uppercase mb-2 tracking-widest"></h4>
                                <p className="font-mono text-green-100/90 text-lg italic">
                                    "{manual[index].example}"
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <p className="text-zinc-400 mb-6 font-mono text-sm border-b border-zinc-800 pb-4">
                                SELECT A TOPIC TO REVIEW PARAMETERS:
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                {manual.map((item, i) => (
                                    <button
                                        key={item.title}
                                        type="button"
                                        onClick={() => {
                                            setIndex(i);
                                            setIsOpened(true);
                                        }}
                                        className="text-left px-5 py-4 bg-zinc-800/50 hover:bg-green-600 hover:text-black text-zinc-300 border border-zinc-700 hover:border-green-500 rounded transition-all duration-200 group"
                                    >
                                        <span className="font-bold font-mono tracking-wide block group-hover:translate-x-1 transition-transform">
                                            {item.title}
                                        </span>
                                    </button>
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
