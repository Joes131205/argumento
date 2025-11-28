import { RouterProvider, createRouter } from "@tanstack/react-router";
import ReactDOM from "react-dom/client";
import { routeTree } from "./routeTree.gen";
import { ThemeProvider } from "@/context/ThemeContext";
import { UserProvider } from "@/context/UserContext";

const router = createRouter({
    routeTree,
    defaultPreload: "intent",
    context: {},
});

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

const rootElement = document.getElementById("app");

if (!rootElement) {
    throw new Error("Root element not found");
}

if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <UserProvider>
            <ThemeProvider>
                <RouterProvider router={router} />
            </ThemeProvider>
        </UserProvider>
    );
}
