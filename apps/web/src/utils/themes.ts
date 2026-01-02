export interface Theme {
    id: string;
    name: string;
    description: string;
    price: number;
    class: string;
    hex: string;
    cssVariables: Record<string, string>;
}

const themes: Theme[] = [
    {
        id: "theme_green",
        name: "Terminal Green",
        description: "Simple, reliable",
        price: 0,
        class: "text-green-500 border-green-500 selection:bg-green-500",
        hex: "#22c55e",
        cssVariables: {
            "--accent-color": "#22c55e",
            "--accent-light": "#86efac",
            "--accent-dark": "#16a34a",
            "--accent-muted": "rgba(34, 197, 94, 0.25)",
        },
    },
    {
        id: "theme_obsidian",
        name: "Void White",
        description: "Minimalist!",
        price: 100,
        class: "text-zinc-100 border-zinc-100 selection:bg-black",
        hex: "#f4f4f5",
        cssVariables: {
            "--accent-color": "#f4f4f5",
            "--accent-light": "#fafafa",
            "--accent-dark": "#d4d4d8",
            "--accent-muted": "rgba(244, 244, 245, 0.25)",
        },
    },
    {
        id: "theme_amber",
        name: "Amber Orange",
        description: "Danger danger",
        price: 500,
        class: "text-amber-500 border-amber-500 selection:bg-amber-500",
        hex: "#f59e0b",
        cssVariables: {
            "--accent-color": "#f59e0b",
            "--accent-light": "#fcd34d",
            "--accent-dark": "#d97706",
            "--accent-muted": "rgba(245, 158, 11, 0.25)",
        },
    },
    {
        id: "theme_cyan",
        name: "Nocturnal Cyan",
        description: "Doesn't include heater",
        price: 750,
        class: "text-cyan-400 border-cyan-400 selection:bg-cyan-400",
        hex: "#22d3ee",
        cssVariables: {
            "--accent-color": "#22d3ee",
            "--accent-light": "#67e8f9",
            "--accent-dark": "#0891b2",
            "--accent-muted": "rgba(34, 211, 238, 0.25)",
        },
    },
    {
        id: "theme_red",
        name: "Critical Red",
        description: "Villain arc 🗣️🗣️",
        price: 1000,
        class: "text-red-500 border-red-500 selection:bg-red-500",
        hex: "#ef4444",
        cssVariables: {
            "--accent-color": "#ef4444",
            "--accent-light": "#fca5a5",
            "--accent-dark": "#dc2626",
            "--accent-muted": "rgba(239, 68, 68, 0.25)",
        },
    },
];

export const getThemeClasses = (themeId: string) => {
    const theme = themes.find((t) => t.id === themeId);

    return theme
        ? theme.class
        : "text-green-500 border-green-500 selection:bg-green-500";
};

export const getThemeCssVariables = (themeId: string) => {
    const theme = themes.find((t) => t.id === themeId);

    return theme ? theme.cssVariables : themes[0].cssVariables;
};

export const getThemeById = (themeId: string) => {
    return themes.find((t) => t.id === themeId) || themes[0];
};
