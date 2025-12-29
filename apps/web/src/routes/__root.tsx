import {
    HeadContent,
    Outlet,
    createRootRouteWithContext,
    useRouterState,
} from "@tanstack/react-router";
import "../index.css";

import useTheme from "@/hooks/useTheme";
import { Toaster } from "sonner";
import { NotFoundComponent } from "@/components/NotFoundComponent";
import { ErrorPage } from "@/components/ErrorPage";
import { Navbar } from "@/components/NavBar";
import { AnimatePresence, motion } from "motion/react";

export const Route = createRootRouteWithContext()({
    component: RootComponent,
    head: () => ({
        meta: [
            {
                title: "Argumento",
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
    const routerState = useRouterState();
    return (
        <div
            className={`
                min-h-screen w-full font-mono transition-colors duration-300
                bg-zinc-950 text-green-500
                ${theme === "dark" ? "dark" : ""}
                pt-16 
            `}
        >
            <HeadContent />
            <Navbar />
            <AnimatePresence mode="wait">
                <motion.div
                    key={routerState.location.pathname}
                    initial={{ opacity: 0, y: 10, filter: "blur(0px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -10, filter: "blur(10px)" }}
                    transition={{
                        duration: 0.2,
                        ease: "easeOut",
                    }}
                    className="h-full w-full"
                >
                    <Outlet />
                </motion.div>
            </AnimatePresence>
            <Toaster
                position="bottom-right"
                theme={theme as "dark" | "light" | "system"}
            />
        </div>
    );
}
