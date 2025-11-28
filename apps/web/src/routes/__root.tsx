import {
    HeadContent,
    Outlet,
    createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import "../index.css";

import useTheme from "@/hooks/useTheme";
import { Toaster } from "sonner";

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
});

function RootComponent() {
    const { theme } = useTheme();
    return (
        <>
            <HeadContent />
            <div
                className={`min-h-screen transition-colors duration-300 ${
                    theme === "dark" ? "dark" : ""
                } bg-background text-foreground`}
            >
                <Outlet />
            </div>
            <Toaster
                position="bottom-right"
                theme={theme as "dark" | "light" | "system"}
            />
            <TanStackRouterDevtools position="bottom-left" />
        </>
    );
}
