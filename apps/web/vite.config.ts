import { VitePWA } from "vite-plugin-pwa";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [
        tailwindcss(),
        tanstackRouter({}),
        react(),
        VitePWA({
            registerType: "autoUpdate",
            manifest: {
                name: "Argumento",
                short_name: "Argumento",
                description: "Argumento - PWA Application",
                theme_color: "#121305",
            },
            pwaAssets: { disabled: false, config: true },
            devOptions: { enabled: true },
        }),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
