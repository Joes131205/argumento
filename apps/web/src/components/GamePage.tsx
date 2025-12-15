import React from "react";

const GamePage = () => {
    const [isRejected, setIsRejected] = useState(false);
    const [isResult, setIsResult] = useState(false);
    const [reason, setReason] = useState("");
    const [verdict, setVerdict] = useState<{
        is_correct: boolean;
        message: string;
    } | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    return (
        <div>
            <div className="flex-2 flex flex-col justify-center p-3">
                {!current ? (
                    <div className="text-center bg-zinc-800 p-10 rounded shadow">
                        <h2 className="text-3xl font-bold mb-4">
                            🎉 Shift Complete!
                        </h2>
                        <button
                            type="button"
                            onClick={handleEndShift}
                            disabled={isSaving}
                            className="bg-green-500 hover:bg-green-600 transition-all cursor-pointer text-white px-8 py-3 rounded font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSaving ? "Saving..." : "Clock Out"}
                        </button>
                    </div>
                ) : (
                    <div className="bg-zinc-800 border-3 border-green-500 p-8 rounded">
                        <div className="flex justify-between items-end mb-6 border-b border-b-green-500 pb-4">
                            <h2 className="text-xl font-bold uppercase text-green-500">
                                Post #{index + 1}
                            </h2>
                            <span className="text-xs bg-zinc-700 px-2 py-1 rounded">
                                ID: {current._id?.slice(-4)}
                            </span>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-3xl font-black mb-4 leading-tight">
                                {current.headline}
                            </h3>
                            <p className="text-lg text-zinc-200 leading-relaxed">
                                {current.content}
                            </p>
                        </div>

                        {/* Controls */}
                        {isResult ? (
                            <div className="bg-zinc-700 p-4 rounded border-black">
                                <h3
                                    className={`text-xl font-bold mb-2 ${verdict?.is_correct ? "text-green-600" : "text-red-600"}`}
                                >
                                    {verdict?.is_correct
                                        ? "✅ CORRECT"
                                        : "❌ MISTAKE"}
                                </h3>
                                <p className="mb-4 text-white">
                                    {verdict?.message}
                                </p>
                                <button
                                    type="button"
                                    onClick={nextLevel}
                                    className="w-full bg-green-500 hover:bg-green-600 transition-all text-white py-3 font-bold rounded cursor-pointer"
                                >
                                    NEXT POST
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="flex gap-4">
                                    <button
                                        type="button"
                                        onClick={handleApprove}
                                        disabled={isAnalyzing}
                                        className="flex-1 bg-green-500 hover:bg-green-600 text-green-100 transition-all cursor-pointer py-3 font-bold rounded"
                                    >
                                        APPROVE
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsRejected(true)}
                                        disabled={isAnalyzing}
                                        className="flex-1 bg-red-500 hover:bg-red-600 text-red-100 transition-all cursor-pointer py-3 font-bold rounded"
                                    >
                                        REJECT
                                    </button>
                                </div>

                                {isRejected && (
                                    <div className="animate-in fade-in slide-in-from-top-2">
                                        <textarea
                                            onChange={(e) =>
                                                setReason(e.target.value)
                                            }
                                            placeholder="Why is this slop?"
                                            className="w-full border-2 focus:outline-none text-white resize-none border-red-500 p-3 rounded mb-2 h-24"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleSendReport}
                                            disabled={isAnalyzing}
                                            className="w-full bg-red-500 hover:bg-red-600 cursor-pointer transition-all text-white py-3 font-bold rounded disabled:opacity-50"
                                        >
                                            {isAnalyzing
                                                ? "Analyzing..."
                                                : "Submit Report"}
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default GamePage;
