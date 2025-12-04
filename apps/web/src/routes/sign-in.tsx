import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { login } from "@/apis/auth";
import useUser from "@/hooks/useUser";
import { useEffect } from "react";
import { toast } from "sonner";

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
