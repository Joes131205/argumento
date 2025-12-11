import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { login } from "@/apis/auth";
import useUser from "@/hooks/useUser";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { motion } from "motion/react";
export const Route = createFileRoute("/sign-in")({
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
                    invalidateUser();
                } else {
                    console.log(response);
                    toast.error("Login failed! Please try again!");
                }
            } catch (error) {
                toast.error("An error occurred while login in!");

                console.log(error);
            }
        },
    });

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="bg-zinc-950 w-screen h-screen flex flex-col items-center justify-center">
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
                className="w-[90%] sm:w-120 bg-black/80 border-5 border-green-500/50 text-green-500 p-5 flex flex-col gap-10 items-center justify-center items-start"
            >
                <h2 className="text-2xl font-bold text-center w-full">
                    Sign In
                </h2>
                <form.Field name="username">
                    {(field) => (
                        <div className="flex items-start justify-start flex-col w-full gap-2">
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
                                className="rounded-full w-full py-2 border-1 bg-black/80 focus:outline-none border-green-500 border-2 px-3"
                            />
                            {!field.state.meta.isValid && (
                                <p className="text-red-500 font-bold">
                                    {field.state.meta.errors[0]?.message}
                                </p>
                            )}
                        </div>
                    )}
                </form.Field>
                <form.Field name="password">
                    {(field) => (
                        <div className="flex items-start justify-center flex-col w-full gap-2">
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
                                className="rounded-full w-full py-2 border-1 bg-black/80 focus:outline-none border-green-500 border-2 px-3"
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
                                <p className="text-red-500 font-bold">
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
                                className="w-full text-center cursor-pointer bg-green-500 font-bold text-white py-2 rounded-full hover:bg-green-600 transition-all"
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
