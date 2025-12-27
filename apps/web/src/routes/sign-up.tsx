import { useForm } from "@tanstack/react-form";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { register } from "@/apis/auth";
import useUser from "@/hooks/useUser";

export const Route = createFileRoute("/sign-up")({
    component: RouteComponent,
});

function RouteComponent() {
    const { user, invalidateUser } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate({ to: "/" });
        }
    }, [user, navigate]);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmationPassword, setShowConfirmationPassword] =
        useState(false);

    const form = useForm({
        defaultValues: {
            username: "",
            password: "",
            confirmationPassword: "",
        },
        validators: {
            onChange: z
                .object({
                    username: z
                        .string()
                        .min(3, "Username must be > 3 chars")
                        .nonempty("Required"),
                    password: z
                        .string()
                        .min(8, "Min 8 chars required")
                        .nonempty("Required"),
                    confirmationPassword: z.string().nonempty("Required"),
                })
                .refine(
                    (values) => values.password === values.confirmationPassword,
                    {
                        message: "Passwords do not match",
                        path: ["confirmationPassword"],
                    }
                ),
        },
        onSubmit: async ({ value }) => {
            try {
                const response = await register(value.username, value.password);
                if (response?.token) {
                    localStorage.setItem("token", response.token);
                    toast.success("Account created successfully.");
                    invalidateUser();
                } else {
                    toast.error("Registration failed.");
                }
            } catch (error) {
                toast.error("Connection error during registration.");
                console.error(error);
            }
        },
    });

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 p-6 font-mono text-zinc-300">
            {/* Main Container */}
            <div className="w-full max-w-lg border-5 border-green-500 p-5">
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="font-bold text-3xl text-white tracking-tight">
                        Create Account
                    </h1>
                    <p className="mt-1 text-sm text-zinc-500">
                        Initialize your profile to start tracking your progress.
                    </p>
                </div>

                {/* Form Section */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        form.handleSubmit();
                    }}
                    className="flex flex-col gap-5"
                >
                    {/* USERNAME */}
                    <form.Field name="username">
                        {(field) => (
                            <div className="flex flex-col gap-1.5">
                                <label
                                    htmlFor={field.name}
                                    className="font-bold text-xs text-zinc-500 uppercase"
                                >
                                    Username
                                </label>
                                <input
                                    value={field.state.value}
                                    type="text"
                                    onChange={(e) =>
                                        field.handleChange(e.target.value)
                                    }
                                    className="w-full border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none transition-colors placeholder:text-zinc-700 focus:border-green-600"
                                    placeholder="Enter username"
                                />
                                {!field.state.meta.isValid && (
                                    <p className="font-bold text-red-500 text-xs">
                                        * {field.state.meta.errors[0]?.message}
                                    </p>
                                )}
                            </div>
                        )}
                    </form.Field>

                    {/* PASSWORD */}
                    <form.Field name="password">
                        {(field) => (
                            <div className="flex flex-col gap-1.5">
                                <label
                                    htmlFor={field.name}
                                    className="font-bold text-xs text-zinc-500 uppercase"
                                >
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        value={field.state.value}
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        onChange={(e) =>
                                            field.handleChange(e.target.value)
                                        }
                                        className="w-full border border-zinc-800 bg-zinc-900 px-4 py-3 pr-10 text-white outline-none transition-colors placeholder:text-zinc-700 focus:border-green-600"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-zinc-500 transition-colors hover:text-white"
                                    >
                                        {showPassword ? (
                                            <EyeOff size={16} />
                                        ) : (
                                            <Eye size={16} />
                                        )}
                                    </button>
                                </div>
                                {!field.state.meta.isValid && (
                                    <p className="font-bold text-red-500 text-xs">
                                        * {field.state.meta.errors[0]?.message}
                                    </p>
                                )}
                            </div>
                        )}
                    </form.Field>

                    <form.Field name="confirmationPassword">
                        {(field) => (
                            <div className="flex flex-col gap-1.5">
                                <label
                                    htmlFor={field.name}
                                    className="font-bold text-xs text-zinc-500 uppercase"
                                >
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <input
                                        value={field.state.value}
                                        type={
                                            showConfirmationPassword
                                                ? "text"
                                                : "password"
                                        }
                                        onChange={(e) =>
                                            field.handleChange(e.target.value)
                                        }
                                        className="w-full border border-zinc-800 bg-zinc-900 px-4 py-3 pr-10 text-white outline-none transition-colors placeholder:text-zinc-700 focus:border-green-600"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowConfirmationPassword(
                                                !showConfirmationPassword
                                            )
                                        }
                                        className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-zinc-500 transition-colors hover:text-white"
                                    >
                                        {showConfirmationPassword ? (
                                            <EyeOff size={16} />
                                        ) : (
                                            <Eye size={16} />
                                        )}
                                    </button>
                                </div>
                                {!field.state.meta.isValid && (
                                    <p className="font-bold text-red-500 text-xs">
                                        * {field.state.meta.errors[0]?.message}
                                    </p>
                                )}
                            </div>
                        )}
                    </form.Field>

                    {/* ACTIONS */}
                    <div className="mt-4 space-y-4">
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
                                    className="w-full cursor-pointer bg-green-600 py-3.5 font-bold text-black uppercase transition-all hover:bg-green-500 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {isSubmitting
                                        ? "Registering..."
                                        : "Sign Up"}
                                </button>
                            )}
                        </form.Subscribe>

                        <div className="text-center">
                            <Link
                                to="/sign-in"
                                className="text-sm text-zinc-500 underline-offset-4 transition-colors hover:text-green-500 hover:underline"
                            >
                                Already have an account? Sign In
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
