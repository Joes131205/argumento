import {
    HeadContent,
    Outlet,
    createRootRouteWithContext,
} from "@tanstack/react-router";
import "../index.css";

import useTheme from "@/hooks/useTheme";
import { Toaster } from "sonner";
import { NotFoundComponent } from "@/components/NotFoundComponent";
import { ErrorPage } from "@/components/ErrorPage";

export const Route = createRootRouteWithContext()({
    component: RootComponent,
    head: () => ({
        meta: [
            {
                title: "si-peduli",
            },
            {
                name: "description",
                content: "si-peduli is a web application",
            },
        ],
        links: [
            {
                rel: "icon",
                href: "/favicon.ico",
            },
        ],
    }),
    errorComponent: ErrorPage,
    notFoundComponent: NotFoundComponent,
});

function RootComponent() {
    const { theme } = useTheme();
    return (
        <>
            <HeadContent />
            <div
                className={`min-h-screen min-w-screen bg-zinc-950 font-mono text-green-500 transition-colors duration-300 ${
                    theme === "dark" ? "dark" : ""
                } bg-background text-foreground`}
            >
                <Outlet />
            </div>
            <Toaster
                position="bottom-right"
                theme={theme as "dark" | "light" | "system"}
            />
        </>
    );
}
