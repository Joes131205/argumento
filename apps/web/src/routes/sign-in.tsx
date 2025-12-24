import {
    createFileRoute,
    Link,
    redirect,
    useNavigate,
    useSearch,
} from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { getMe, login } from "@/apis/auth";
import useUser from "@/hooks/useUser";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { motion } from "motion/react";

export const Route = createFileRoute("/sign-in")({
    beforeLoad: async () => {
        const user = await getMe();
        if (user) {
            throw redirect({
                to: "/",
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
    console.log(search);
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
                    .min(3, "Please make your username 3 or more characters")
                    .nonempty("Username can't be empty"),
                password: z
                    .string()
                    .min(
                        8,
                        "For security reasons, please make your password 8 characters long!"
                    )
                    .nonempty("Password can't be empty"),
            }),
        },
        onSubmit: async ({ value }) => {
            try {
                const response = await login(value.username, value.password);
                console.log(response);
                if (response?.token) {
                    const token = response.token;
                    localStorage.setItem("token", token);
                    toast.success("Login successful!");
                    navigate({ to: search.redirect || "/" });
                    invalidateUser();
                } else {
                    console.log(response);
                    toast.error("Login failed! Please try again!");
                }
            } catch (error) {
                console.log(error);
            }
        },
    });

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center bg-zinc-950">
            <motion.form
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                }}
                initial={{ y: 5 }}
                animate={{ y: 0 }}
                transition={{
                    duration: 0.02,
                }}
                className="flex w-[90%] flex-col items-start justify-center gap-10 border-5 border-green-500/50 bg-black/80 p-5 text-green-500 sm:w-120"
            >
                <h2 className="w-full text-center font-bold text-2xl">
                    Sign In
                </h2>
                <form.Field name="username">
                    {(field) => (
                        <div className="flex w-full flex-col items-start justify-start gap-2">
                            <label htmlFor={field.name} className="font-bold">
                                Username
                            </label>
                            <input
                                value={field.state.value}
                                type="text"
                                onChange={(e) =>
                                    field.handleChange(e.target.value)
                                }
                                id={field.name}
                                className="w-full rounded-full border-1 border-green-500 bg-black/80 px-3 py-2 focus:outline-none"
                            />
                            {!field.state.meta.isValid && (
                                <p className="font-bold text-red-500">
                                    {field.state.meta.errors[0]?.message}
                                </p>
                            )}
                        </div>
                    )}
                </form.Field>
                <form.Field name="password">
                    {(field) => (
                        <div className="flex w-full flex-col items-start justify-center gap-2">
                            <label htmlFor={field.name} className="font-bold">
                                Password
                            </label>
                            <input
                                value={field.state.value}
                                type={showPassword ? "text" : "password"}
                                onChange={(e) =>
                                    field.handleChange(e.target.value)
                                }
                                id={field.name}
                                className="w-full rounded-full border-1 border-green-500 bg-black/80 px-3 py-2 focus:outline-none"
                            />
                            <p
                                className="cursor-pointer underline"
                                onClick={() => setShowPassword(!showPassword)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        setShowPassword(!showPassword);
                                    }
                                }}
                            >
                                {showPassword ? "Hide" : "Show"} Password
                            </p>
                            {!field.state.meta.isValid && (
                                <p className="font-bold text-red-500">
                                    {field.state.meta.errors[0]?.message}
                                </p>
                            )}
                        </div>
                    )}
                </form.Field>
                <form.Subscribe
                    selector={(state) => [state.canSubmit, state.isSubmitting]}
                >
                    {([canSubmit, isSubmitting]) => (
                        <div className="w-full">
                            <button
                                type="submit"
                                disabled={!canSubmit}
                                className="w-full cursor-pointer rounded-full bg-green-500 py-2 text-center font-bold text-white transition-all hover:bg-green-600"
                            >
                                {isSubmitting ? "Loading..." : "Sign In"}
                            </button>
                        </div>
                    )}
                </form.Subscribe>
                <p>
                    Don't have an account?{" "}
                    <Link to="/sign-up" className="underline">
                        Sign Up
                    </Link>
                </p>
            </motion.form>
        </div>
    );
}
