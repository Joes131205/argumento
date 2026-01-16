import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { submitFeedback } from "@/apis/feedback";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import useUser from "@/hooks/useUser";

export const Route = createFileRoute("/feedback")({
    component: RouteComponent,
});

function RouteComponent() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        description: "",
        expectation: "",
        favoritePart: "",
        frustrated: "",
        clarity: "3",
        playAgainTomorrow: "3",
        improvements: "",
        learnedSomething: "",
        changesSocialMedia: "",
        anythingElse: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await submitFeedback({
                ...formData,
                clarity: Number(formData.clarity),
                playAgainTomorrow: Number(formData.playAgainTomorrow),
            });

            setTimeout(() => {
                router.navigate({ to: "/dashboard" });
            }, 1000);
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] p-6 font-mono text-zinc-300 lg:p-12">
            <div className="mx-auto max-w-2xl">
                <div className="mb-8 border-b border-zinc-800 pb-6">
                    <h1 className="font-black text-4xl text-white uppercase tracking-tight md:text-5xl">
                        Feedback
                    </h1>
                    <p className="mt-2 text-sm text-zinc-500">
                        Please Speed I need this. Once again pls answer
                        truthfully like actually.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="border border-zinc-800 bg-zinc-900/30 p-6">
                        <label
                            htmlFor="description"
                            className="mb-3 block text-sm font-bold uppercase text-white"
                        >
                            How would you describe this app in ONE sentence?{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    description: e.target.value,
                                })
                            }
                            required
                            className="w-full border border-zinc-700 bg-black px-4 py-2 text-white placeholder:text-zinc-600 focus:border-zinc-500 outline-none"
                            rows={2}
                            placeholder="Type here..."
                        />
                    </div>

                    <div className="border border-zinc-800 bg-zinc-900/30 p-6">
                        <label
                            htmlFor="expectation"
                            className="mb-3 block text-sm font-bold uppercase text-white"
                        >
                            Compared to expectations from initial survey, the
                            app was: <span className="text-red-500">*</span>
                        </label>
                        <div className="space-y-2">
                            {["better", "same", "worse"].map((option) => (
                                <label
                                    key={option}
                                    className="flex items-center gap-3"
                                >
                                    <input
                                        type="radio"
                                        id={`expectation-${option}`}
                                        name="expectation"
                                        value={option}
                                        checked={
                                            formData.expectation === option
                                        }
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                expectation: e.target.value,
                                            })
                                        }
                                        required
                                        className="w-4 h-4"
                                    />
                                    <span className="capitalize text-sm">
                                        {option === "better"
                                            ? "Better than expected"
                                            : option === "same"
                                              ? "About what I expected"
                                              : "Worse than expected"}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="border border-zinc-800 bg-zinc-900/30 p-6">
                        <label
                            htmlFor="favoritePart"
                            className="mb-3 block text-sm font-bold uppercase text-white"
                        >
                            What was your FAVORITE part?{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="favoritePart"
                            type="text"
                            value={formData.favoritePart}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    favoritePart: e.target.value,
                                })
                            }
                            required
                            className="w-full border border-zinc-700 bg-black px-4 py-2 text-white placeholder:text-zinc-600 focus:border-zinc-500 outline-none"
                            placeholder="e.g., The AI judge feedback, the terminal design, etc."
                        />
                    </div>

                    <div className="border border-zinc-800 bg-zinc-900/30 p-6">
                        <label
                            htmlFor="frustrated"
                            className="mb-3 block text-sm font-bold uppercase text-white"
                        >
                            What FRUSTRATED you most?{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="frustrated"
                            type="text"
                            value={formData.frustrated}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    frustrated: e.target.value,
                                })
                            }
                            required
                            className="w-full border border-zinc-700 bg-black px-4 py-2 text-white placeholder:text-zinc-600 focus:border-zinc-500 outline-none"
                            placeholder="e.g., Too difficult, confusing UI, etc."
                        />
                    </div>

                    <div className="border border-zinc-800 bg-zinc-900/30 p-6">
                        <label
                            htmlFor="clarity"
                            className="block mb-3 font-bold text-sm text-white uppercase"
                        >
                            How clear were the instructions?{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <div className="space-y-2">
                            {[
                                { value: "1", label: "Very confusing" },
                                { value: "2", label: "Confusing" },
                                { value: "3", label: "Mostly clear" },
                                { value: "4", label: "Very clear" },
                            ].map((option) => (
                                <label
                                    key={option.value}
                                    className="flex items-center gap-3"
                                >
                                    <input
                                        type="radio"
                                        id="clarity"
                                        name="clarity"
                                        value={option.value}
                                        checked={
                                            formData.clarity === option.value
                                        }
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                clarity: e.target.value,
                                            })
                                        }
                                        required
                                        className="h-4 w-4"
                                    />
                                    <span className="text-sm">
                                        {option.label}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="border border-zinc-800 bg-zinc-900/30 p-6">
                        <label
                            htmlFor="playAgainTomorrow"
                            className="mb-3 block text-sm font-bold uppercase text-white"
                        >
                            How likely are you to play again tomorrow?{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <div className="flex justify-between text-xs text-zinc-500 mb-2">
                            <span>Definitely not</span>
                            <span>Definitely yes</span>
                        </div>
                        <input
                            id="playAgainTomorrow"
                            type="range"
                            min="1"
                            max="5"
                            value={formData.playAgainTomorrow}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    playAgainTomorrow: e.target.value,
                                })
                            }
                            className="w-full"
                        />
                        <div className="text-center mt-2 text-sm text-zinc-400">
                            Score: {formData.playAgainTomorrow}/5
                        </div>
                    </div>

                    <div className="border border-zinc-800 bg-zinc-900/30 p-6">
                        <label
                            htmlFor="improvements"
                            className="mb-3 block text-sm font-bold uppercase text-white"
                        >
                            What would make you play MORE often?{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            id="improvements"
                            value={formData.improvements}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    improvements: e.target.value,
                                })
                            }
                            required
                            className="w-full border border-zinc-700 bg-black px-4 py-2 text-white placeholder:text-zinc-600 focus:border-zinc-500 outline-none"
                            rows={2}
                            placeholder="Feature ideas, improvements, etc."
                        />
                    </div>

                    <div className="border border-zinc-800 bg-zinc-900/30 p-6">
                        <label
                            htmlFor="learnedSomething"
                            className="mb-3 block text-sm font-bold uppercase text-white"
                        >
                            Did you learn anything new?{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <div className="space-y-2">
                            {[
                                { value: "yes_lot", label: "Yes, a lot!" },
                                { value: "yes_little", label: "Yes, a little" },
                                { value: "not_really", label: "Not really" },
                                {
                                    value: "already_knew",
                                    label: "I already knew this",
                                },
                            ].map((option) => (
                                <label
                                    key={option.value}
                                    className="flex items-center gap-3"
                                >
                                    <input
                                        type="radio"
                                        id={`learnedSomething-${option.value}`}
                                        name="learnedSomething"
                                        value={option.value}
                                        checked={
                                            formData.learnedSomething ===
                                            option.value
                                        }
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                learnedSomething:
                                                    e.target.value,
                                            })
                                        }
                                        required
                                        className="w-4 h-4"
                                    />
                                    <span className="text-sm">
                                        {option.label}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="border border-zinc-800 bg-zinc-900/30 p-6">
                        <label
                            htmlFor="changesSocialMedia"
                            className="mb-3 block text-sm font-bold uppercase text-white"
                        >
                            Will this change how you read social media?{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <div className="space-y-2">
                            {[
                                {
                                    value: "yes",
                                    label: "Yes, I'll be more critical",
                                },
                                {
                                    value: "maybe",
                                    label: "Maybe, I'll think about it",
                                },
                                {
                                    value: "probably_not",
                                    label: "Probably not",
                                },
                                { value: "no", label: "No" },
                            ].map((option) => (
                                <label
                                    key={option.value}
                                    className="flex items-center gap-3"
                                >
                                    <input
                                        type="radio"
                                        id={`changesSocialMedia-${option.value}`}
                                        name="changesSocialMedia"
                                        value={option.value}
                                        checked={
                                            formData.changesSocialMedia ===
                                            option.value
                                        }
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                changesSocialMedia:
                                                    e.target.value,
                                            })
                                        }
                                        required
                                        className="w-4 h-4"
                                    />
                                    <span className="text-sm">
                                        {option.label}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="border border-zinc-800 bg-zinc-900/30 p-6">
                        <label
                            htmlFor="anythingElse"
                            className="mb-3 block text-sm font-bold uppercase text-white"
                        >
                            Anything else you want us to know? (Optional)
                        </label>
                        <textarea
                            id="anythingElse"
                            value={formData.anythingElse}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    anythingElse: e.target.value,
                                })
                            }
                            className="w-full border border-zinc-700 bg-black px-4 py-2 text-white placeholder:text-zinc-600 focus:border-zinc-500 outline-none"
                            rows={2}
                            placeholder="Any additional thoughts..."
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="cursor-pointer disabled:cursor-not-allowed w-full theme-accent-solid px-6 py-3 font-bold text-black uppercase transition-all hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 size={16} className="animate-spin" />
                                Submitting...
                            </>
                        ) : (
                            "Submit Feedback"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
