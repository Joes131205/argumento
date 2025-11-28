import { register } from "@/apis/auth";
import useUser from "@/hooks/useUser";
import { useForm } from "@tanstack/react-form";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
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
    return (
        <div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                }}
            >
                <form.Field name="username">
                    {(field) => (
                        <>
                            <input
                                value={field.state.value}
                                type="text"
                                onChange={(e) =>
                                    field.handleChange(e.target.value)
                                }
                            />
                            {!field.state.meta.isValid && (
                                <em>{field.state.meta.errors[0]?.message}</em>
                            )}
                        </>
                    )}
                </form.Field>
                <form.Field name="password">
                    {(field) => (
                        <>
                            <input
                                value={field.state.value}
                                type="password"
                                onChange={(e) =>
                                    field.handleChange(e.target.value)
                                }
                            />
                            {!field.state.meta.isValid && (
                                <em>{field.state.meta.errors[0]?.message}</em>
                            )}
                        </>
                    )}
                </form.Field>
                <form.Field name="confirmationPassword">
                    {(field) => (
                        <>
                            <input
                                value={field.state.value}
                                type="password"
                                onChange={(e) =>
                                    field.handleChange(e.target.value)
                                }
                            />
                            {!field.state.meta.isValid && (
                                <em>{field.state.meta.errors[0]?.message}</em>
                            )}
                        </>
                    )}
                </form.Field>
                <form.Subscribe
                    selector={(state) => [state.canSubmit, state.isSubmitting]}
                >
                    {([canSubmit, isSubmitting]) => (
                        <button type="submit" disabled={!canSubmit}>
                            {isSubmitting ? "..." : "Submit"}
                        </button>
                    )}
                </form.Subscribe>
            </form>
        </div>
    );
}
