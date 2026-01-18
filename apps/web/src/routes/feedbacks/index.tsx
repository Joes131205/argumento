import { useForm } from "@tanstack/react-form";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { z } from "zod";
import { submitFeedback } from "@/apis/feedback";
import { requireAuth } from "@/utils/requireAuth";

export const Route = createFileRoute("/feedbacks/")({
    beforeLoad: requireAuth,
    component: RouteComponent,
});

function RouteComponent() {
    const navigate = useNavigate();

    const form = useForm({
        defaultValues: {
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
        },
        validators: {
            onChange: z.object({
                description: z.string().nonempty("Required"),
                expectation: z.string().nonempty("Required"),
                favoritePart: z.string().nonempty("Required"),
                frustrated: z.string().nonempty("Required"),
                clarity: z.string().nonempty("Required"),
                playAgainTomorrow: z.string().nonempty("Required"),
                improvements: z.string().nonempty("Required"),
                learnedSomething: z.string().nonempty("Required"),
                changesSocialMedia: z.string().nonempty("Required"),
                anythingElse: z.string(),
            }),
        },
        onSubmit: async ({ value }) => {
            try {
                await submitFeedback({
                    ...value,
                    clarity: Number(value.clarity),
                    playAgainTomorrow: Number(value.playAgainTomorrow),
                });
                setTimeout(() => {
                    navigate({ to: "/dashboard" });
                }, 1000);
            } catch (error) {
                console.error(error);
            }
        },
    });

    return (
        <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-6 font-mono text-zinc-300">
            <motion.div
                initial={{ y: 5, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="theme-accent-border w-full max-w-5xl border-5 p-5"
            >
                <div className="mb-8">
                    <h1 className="font-bold text-3xl text-white tracking-tight">
                        Post-Feedback
                    </h1>
                    <p className="mt-1 text-sm text-zinc-500">
                        Please speed I need this ;-;
                    </p>
                </div>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        form.handleSubmit();
                    }}
                    className="flex flex-col gap-5"
                >
                    <form.Field name="description">
                        {(field) => (
                            <div className="flex flex-col gap-1.5 border border-zinc-800 bg-zinc-900/30 p-5">
                                <label
                                    htmlFor={field.name}
                                    className="font-bold text-xs text-zinc-500 uppercase"
                                >
                                    How would you describe this app in ONE
                                    sentence?{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    value={field.state.value}
                                    type="text"
                                    onChange={(e) =>
                                        field.handleChange(e.target.value)
                                    }
                                    className="w-full border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none transition-colors placeholder:text-zinc-700 focus:border-green-600"
                                    placeholder="Type here..."
                                />
                                {!field.state.meta.isValid && (
                                    <p className="font-bold text-red-500 text-xs">
                                        * {field.state.meta.errors[0]?.message}
                                    </p>
                                )}
                            </div>
                        )}
                    </form.Field>

                    <form.Field name="expectation">
                        {(field) => (
                            <div className="flex flex-col gap-1.5 border border-zinc-800 bg-zinc-900/30 p-5">
                                <label
                                    htmlFor="expectation"
                                    className="font-bold text-xs text-zinc-500 uppercase"
                                >
                                    Compared to expectations from initial
                                    survey, the app was:{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="space-y-2">
                                    {["better", "same", "worse"].map(
                                        (option) => (
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
                                                        field.state.value ===
                                                        option
                                                    }
                                                    onChange={(e) =>
                                                        field.handleChange(
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="h-4 w-4"
                                                />
                                                <span className="text-sm capitalize">
                                                    {option === "better"
                                                        ? "Better than expected"
                                                        : option === "same"
                                                          ? "About what I expected"
                                                          : "Worse than expected"}
                                                </span>
                                            </label>
                                        ),
                                    )}
                                </div>
                                {!field.state.meta.isValid && (
                                    <p className="font-bold text-red-500 text-xs">
                                        * {field.state.meta.errors[0]?.message}
                                    </p>
                                )}
                            </div>
                        )}
                    </form.Field>

                    <form.Field name="favoritePart">
                        {(field) => (
                            <div className="flex flex-col gap-1.5 border border-zinc-800 bg-zinc-900/30 p-5">
                                <label
                                    htmlFor="favoritePart"
                                    className="font-bold text-xs text-zinc-500 uppercase"
                                >
                                    What was your FAVORITE part?{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="favoritePart"
                                    type="text"
                                    value={field.state.value}
                                    onChange={(e) =>
                                        field.handleChange(e.target.value)
                                    }
                                    className="w-full border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none transition-colors placeholder:text-zinc-700 focus:border-green-600"
                                    placeholder="e.g., The AI judge feedback..."
                                />
                                {!field.state.meta.isValid && (
                                    <p className="font-bold text-red-500 text-xs">
                                        * {field.state.meta.errors[0]?.message}
                                    </p>
                                )}
                            </div>
                        )}
                    </form.Field>

                    <form.Field name="frustrated">
                        {(field) => (
                            <div className="flex flex-col gap-1.5 border border-zinc-800 bg-zinc-900/30 p-5">
                                <label
                                    htmlFor="frustrated"
                                    className="font-bold text-xs text-zinc-500 uppercase"
                                >
                                    What FRUSTRATED you most while using this
                                    app? <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="frustrated"
                                    type="text"
                                    value={field.state.value}
                                    onChange={(e) =>
                                        field.handleChange(e.target.value)
                                    }
                                    className="w-full border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none transition-colors placeholder:text-zinc-700 focus:border-green-600"
                                    placeholder="e.g., Too difficult, confusing UI..."
                                />
                                {!field.state.meta.isValid && (
                                    <p className="font-bold text-red-500 text-xs">
                                        * {field.state.meta.errors[0]?.message}
                                    </p>
                                )}
                            </div>
                        )}
                    </form.Field>

                    <form.Field name="clarity">
                        {(field) => (
                            <div className="flex flex-col gap-1.5 border border-zinc-800 bg-zinc-900/30 p-5">
                                <label
                                    htmlFor="clarity"
                                    className="font-bold text-xs text-zinc-500 uppercase"
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
                                                id={`clarity-${option.value}`}
                                                name="clarity"
                                                value={option.value}
                                                checked={
                                                    field.state.value ===
                                                    option.value
                                                }
                                                onChange={(e) =>
                                                    field.handleChange(
                                                        e.target.value,
                                                    )
                                                }
                                                className="h-4 w-4"
                                            />
                                            <span className="text-sm">
                                                {option.label}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                                {!field.state.meta.isValid && (
                                    <p className="font-bold text-red-500 text-xs">
                                        * {field.state.meta.errors[0]?.message}
                                    </p>
                                )}
                            </div>
                        )}
                    </form.Field>

                    <form.Field name="playAgainTomorrow">
                        {(field) => (
                            <div className="flex flex-col gap-1.5 border border-zinc-800 bg-zinc-900/30 p-5">
                                <label
                                    htmlFor="playAgainTomorrow"
                                    className="font-bold text-xs text-zinc-500 uppercase"
                                >
                                    How likely are you to play again tomorrow?{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="mb-2 flex justify-between text-xs text-zinc-500">
                                    <span>Definitely not</span>
                                    <span>Definitely yes</span>
                                </div>
                                <input
                                    id="playAgainTomorrow"
                                    type="range"
                                    min="1"
                                    max="5"
                                    value={field.state.value}
                                    onChange={(e) =>
                                        field.handleChange(e.target.value)
                                    }
                                    className="w-full"
                                />
                                <div className="text-center text-sm text-zinc-400">
                                    Score: {field.state.value}/5
                                </div>
                            </div>
                        )}
                    </form.Field>

                    <form.Field name="improvements">
                        {(field) => (
                            <div className="flex flex-col gap-1.5 border border-zinc-800 bg-zinc-900/30 p-5">
                                <label
                                    htmlFor="improvements"
                                    className="font-bold text-xs text-zinc-500 uppercase"
                                >
                                    What would make you play MORE often?{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="improvements"
                                    value={field.state.value}
                                    onChange={(e) =>
                                        field.handleChange(e.target.value)
                                    }
                                    className="w-full border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none transition-colors placeholder:text-zinc-700 focus:border-green-600"
                                    rows={2}
                                    placeholder="Feature ideas, improvements..."
                                />
                                {!field.state.meta.isValid && (
                                    <p className="font-bold text-red-500 text-xs">
                                        * {field.state.meta.errors[0]?.message}
                                    </p>
                                )}
                            </div>
                        )}
                    </form.Field>

                    <form.Field name="learnedSomething">
                        {(field) => (
                            <div className="flex flex-col gap-1.5 border border-zinc-800 bg-zinc-900/30 p-5">
                                <label
                                    htmlFor="learnedSomething"
                                    className="font-bold text-xs text-zinc-500 uppercase"
                                >
                                    Did you learn anything new?{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="space-y-2">
                                    {[
                                        {
                                            value: "yes_lot",
                                            label: "Yes, a lot!",
                                        },
                                        {
                                            value: "yes_little",
                                            label: "Yes, a little",
                                        },
                                        {
                                            value: "not_really",
                                            label: "Not really",
                                        },
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
                                                    field.state.value ===
                                                    option.value
                                                }
                                                onChange={(e) =>
                                                    field.handleChange(
                                                        e.target.value,
                                                    )
                                                }
                                                className="h-4 w-4"
                                            />
                                            <span className="text-sm">
                                                {option.label}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                                {!field.state.meta.isValid && (
                                    <p className="font-bold text-red-500 text-xs">
                                        * {field.state.meta.errors[0]?.message}
                                    </p>
                                )}
                            </div>
                        )}
                    </form.Field>

                    <form.Field name="changesSocialMedia">
                        {(field) => (
                            <div className="flex flex-col gap-1.5 border border-zinc-800 bg-zinc-900/30 p-5">
                                <label
                                    htmlFor="changesSocialMedia"
                                    className="font-bold text-xs text-zinc-500 uppercase"
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
                                                    field.state.value ===
                                                    option.value
                                                }
                                                onChange={(e) =>
                                                    field.handleChange(
                                                        e.target.value,
                                                    )
                                                }
                                                className="h-4 w-4"
                                            />
                                            <span className="text-sm">
                                                {option.label}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                                {!field.state.meta.isValid && (
                                    <p className="font-bold text-red-500 text-xs">
                                        * {field.state.meta.errors[0]?.message}
                                    </p>
                                )}
                            </div>
                        )}
                    </form.Field>

                    <form.Field name="anythingElse">
                        {(field) => (
                            <div className="flex flex-col gap-1.5 border border-zinc-800 bg-zinc-900/30 p-5">
                                <label
                                    htmlFor="anythingElse"
                                    className="font-bold text-xs text-zinc-500 uppercase"
                                >
                                    Anything else you want us to know?
                                    (Optional)
                                </label>
                                <textarea
                                    id="anythingElse"
                                    value={field.state.value}
                                    onChange={(e) =>
                                        field.handleChange(e.target.value)
                                    }
                                    className="w-full border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none transition-colors placeholder:text-zinc-700 focus:border-green-600"
                                    rows={2}
                                    placeholder="Any additional thoughts..."
                                />
                            </div>
                        )}
                    </form.Field>

                    <form.Subscribe
                        selector={(state) => [
                            state.canSubmit,
                            state.isSubmitting,
                        ]}
                    >
                        {([canSubmit, isSubmitting]) => (
                            <button
                                type="submit"
                                disabled={!canSubmit || isSubmitting}
                                className="theme-accent-solid flex w-full cursor-pointer items-center justify-center gap-2 px-6 py-3 font-bold text-black uppercase transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2
                                            size={16}
                                            className="animate-spin"
                                        />
                                        Submitting...
                                    </>
                                ) : (
                                    "Submit Feedback"
                                )}
                            </button>
                        )}
                    </form.Subscribe>
                </form>
            </motion.div>
        </div>
    );
}
