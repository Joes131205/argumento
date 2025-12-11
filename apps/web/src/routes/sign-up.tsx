import { register } from "@/apis/auth";
import useUser from "@/hooks/useUser";
import { useForm } from "@tanstack/react-form";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

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
                        .min(
                            3,
                            "Please make your username 3 or more characters"
                        )
                        .nonempty("Username can't be empty"),
                    password: z
                        .string()
                        .min(
                            8,
                            "For security reasons, please make your password 8 characters long!"
                        )
                        .nonempty("Password can't be empty"),
                    confirmationPassword: z
                        .string()
                        .nonempty("Confirmation password can't be empty"),
                })
                .refine(
                    (values) => values.password === values.confirmationPassword,
                    {
                        message:
                            "Password and confirmation password does not match!",
                        path: ["confirmationPassword"],
                    }
                ),
        },
        onSubmit: async ({ value }) => {
            try {
                const response = await register(value.username, value.password);
                if (response?.data) {
                    const token = response.data.token;
                    localStorage.setItem("token", token);
                    toast.success("Registration successful!");
                    invalidateUser();
                } else {
                    toast.error("Registration failed! Please try again!");
                    console.log("Registration failed: No response data.");
                }
            } catch (error) {
                toast.error("An error occurred while registration!");

                console.log(error);
            }
        },
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmationPassword, setShowConfirmationPassword] =
        useState(false);

    return (
        <div className="bg-zinc-950 w-screen h-screen flex flex-col items-center justify-center">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                }}
                className="w-[90%] sm:w-120 bg-black/80 border-5 border-green-500/50 text-green-500 p-5 flex flex-col gap-10 items-center justify-center items-start"
            >
                <h2 className="text-2xl font-bold text-center w-full">
                    Sign Up
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
                        <div className="flex items-start justify-start flex-col w-full gap-2">
                            <label htmlFor={field.name} className="font-bold">
                                Password
                            </label>
                            <input
                                value={field.state.value}
                                type={showPassword ? "text" : "password"}
                                onChange={(e) =>
                                    field.handleChange(e.target.value)
                                }
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
                <form.Field name="confirmationPassword">
                    {(field) => (
                        <div className="flex items-start justify-start flex-col w-full gap-2">
                            <label htmlFor={field.name} className="font-bold">
                                Confirmation Password
                            </label>
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
                                className="rounded-full w-full py-2 border-1 bg-black/80 focus:outline-none border-green-500 border-2 px-3"
                            />
                            <p
                                className="cursor-pointer underline"
                                onClick={() =>
                                    setShowConfirmationPassword(
                                        !showConfirmationPassword
                                    )
                                }
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        setShowConfirmationPassword(
                                            !setShowConfirmationPassword
                                        );
                                    }
                                }}
                            >
                                {showConfirmationPassword ? "Hide" : "Show"}{" "}
                                Confirmation Password
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
                        <button
                            type="submit"
                            disabled={!canSubmit}
                            className="w-full text-center cursor-pointer bg-green-500 font-bold text-white py-2 rounded-full hover:bg-green-600 transition-all"
                        >
                            {isSubmitting ? "Loading..." : "Sign Up"}
                        </button>
                    )}
                </form.Subscribe>
                <p>
                    Already have an account?{" "}
                    <Link to="/sign-in" className="underline">
                        Sign In
                    </Link>
                </p>
            </form>
        </div>
    );
}
