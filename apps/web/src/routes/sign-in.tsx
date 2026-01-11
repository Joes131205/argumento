import { useForm } from "@tanstack/react-form";
import {
    createFileRoute,
    Link,
    redirect,
    useNavigate,
} from "@tanstack/react-router";
import { motion } from "motion/react";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { getMe, login } from "@/apis/auth";
import useUser from "@/hooks/useUser";

export const Route = createFileRoute("/sign-in")({
    beforeLoad: async () => {
        const user = await getMe();
        if (user) {
            throw redirect({
                to: "/dashboard",
            });
        }
    },
    component: RouteComponent,
    validateSearch: z.object({
        message: z.string().optional(),
        redirect: z.string().optional(),
    }),
});

function RouteComponent() {
    const { invalidateUser } = useUser();
    const navigate = useNavigate();

    const search = Route.useSearch();

    useEffect(() => {
        if (search.message) {
            toast.info(search.message);
        }
    }, [search.message]);

    const form = useForm({
        defaultValues: {
            username: "",
            password: "",
        },
        validators: {
            onChange: z.object({
                username: z
                    .string()
                    .min(3, "Username must be > 3 chars")
                    .nonempty("Required"),
                password: z
                    .string()
                    .min(8, "Min 8 chars required")
                    .nonempty("Required"),
            }),
        },
        onSubmit: async ({ value }) => {
            try {
                const response = await login(value.username, value.password);
                if (response?.token) {
                    const token = response.token;
                    localStorage.setItem("token", token);
                    toast.success("Access Granted.");
                    navigate({ to: search.redirect || "/dashboard" });
                    invalidateUser();
                } else {
                    toast.error("Access Denied: Invalid credentials.");
                }
            } catch (error) {
                console.error(error);
                toast.error("Connection Error.");
            }
        },
    });

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center bg-zinc-950 p-6 font-mono text-zinc-300">
            <motion.div
                initial={{ y: 5, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="w-full max-w-lg border-5 border-green-500 p-5"
            >
                <div className="mb-8">
                    <h1 className="font-bold text-3xl text-white tracking-tight">
                        Login
                    </h1>
                    <p className="mt-1 text-sm text-zinc-500">
                        Enter credentials to access the app.
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
                                        ? "Authenticating..."
                                        : "Sign In"}
                                </button>
                            )}
                        </form.Subscribe>

                        <div className="text-center flex flex-col gap-2">
                            <Link
                                to="/sign-up"
                                className="text-sm text-zinc-500 underline-offset-4 transition-colors hover:text-green-500 hover:underline"
                            >
                                Don't have an account? Sign Up
                            </Link>
                            <Link
                                to="/reset-password"
                                className="text-sm text-zinc-500 underline-offset-4 transition-colors hover:text-green-500 hover:underline"
                            >
                                Forgot Password?
                            </Link>
                        </div>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
