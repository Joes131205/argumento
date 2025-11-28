import { createContext, useState, type ReactNode } from "react";

interface ThemeContextType {
    theme: string;
    toggleTheme: () => void;
}
interface ThemeProviderProps {
    children: ReactNode;
}
export const ThemeContext = createContext<ThemeContextType | undefined>(
    undefined
);

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "light"
    );

    const toggleTheme = () => {
        const changed = theme === "dark" ? "light" : "dark";
        setTheme(changed);
        localStorage.setItem("theme", changed);
    };

    const value = {
        theme,
        toggleTheme,
    };

    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
};
