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
import useUser from "@/hooks/useUser";
import { getThemeClasses, getThemeCssVariables } from "@/utils/themes";
import { useEffect } from "react";
import { refreshStreak } from "@/apis/user";

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
    const { user } = useUser();
    const currentThemeId = user?.activeTheme || "theme_green";
    const themeClasses = getThemeClasses(currentThemeId);
    const themeCssVariables = getThemeCssVariables(currentThemeId);
    const routerState = useRouterState();

    // Apply theme CSS variables to document root
    useEffect(() => {
        Object.entries(themeCssVariables).forEach(([key, value]) => {
            document.documentElement.style.setProperty(key, value);
        });
    }, [themeCssVariables]);

    return (
        <div className="theme-root pt-30 md:pt-16">
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
            <Toaster position="bottom-right" theme="dark" />
        </div>
    );
}
