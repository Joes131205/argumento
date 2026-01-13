import { Link, useNavigate } from "@tanstack/react-router";
import {
    Cog,
    History,
    LayoutDashboard,
    LogOut,
    Map as MapIcon,
    Radar,
    ShoppingBag,
    Trophy,
    Menu,
    X,
    User,
    ChevronDown,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import useUser from "@/hooks/useUser";
import { AnimatePresence, motion } from "motion/react";

export function Navbar() {
    const { user, logOut, invalidateUser } = useUser();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile Menu
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Desktop User Dropdown
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = async () => {
        await logOut();
        await invalidateUser();
        toast.info("Session Terminated.");
        navigate({ to: "/sign-in" });
    };

    const linkClass =
        "flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors [&.active]:text-green-500 py-2";

    const primaryLinks = [
        { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { to: "/campaign", label: "Campaign", icon: MapIcon },
        { to: "/shop", label: "Shop", icon: ShoppingBag },
        { to: "/leaderboard", label: "Ranking", icon: Trophy },
    ];

    const secondaryLinks = [
        { to: "/skills-radar", label: "User Stats", icon: Radar },
        { to: "/history", label: "Post Log", icon: History },
        { to: "/settings", label: "Settings", icon: Cog },
    ];

    return (
        <>
            <nav className="fixed top-0 left-0 z-50 w-full border-zinc-800 border-b bg-zinc-950/90 backdrop-blur-md">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                    <Link
                        to="/dashboard"
                        className="flex items-center gap-2 text-white"
                    >
                        <span className="font-bold font-mono text-lg uppercase tracking-tighter">
                            Argumento
                        </span>
                    </Link>

                    {user && (
                        <div className="hidden md:flex items-center gap-8">
                            {primaryLinks.map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className={linkClass}
                                >
                                    <link.icon size={14} />
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    )}

                    <div className="flex items-center gap-4">
                        {user ? (
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setIsDropdownOpen(!isDropdownOpen)
                                    }
                                    className="cursor-pointer flex items-center gap-3 hover:bg-zinc-900 py-1 px-3 rounded-sm transition-colors border border-transparent hover:border-zinc-800"
                                >
                                    <div className="text-right hidden sm:block">
                                        <div className="text-xs font-bold text-white uppercase">
                                            {user.username}
                                        </div>
                                    </div>
                                    <div className="h-8 w-8 bg-zinc-900 border border-zinc-700 flex items-center justify-center text-zinc-400">
                                        <User size={16} />
                                    </div>
                                    <ChevronDown
                                        size={12}
                                        className={`text-zinc-500 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                                    />
                                </button>

                                <AnimatePresence>
                                    {isDropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute right-0 top-full mt-2 w-56 border border-zinc-800 bg-zinc-950 shadow-2xl p-2 z-50"
                                        >
                                            <div className="text-[10px] text-zinc-600 uppercase tracking-widest font-bold px-3 py-2 border-b border-zinc-900 mb-2">
                                                Utility
                                            </div>
                                            {secondaryLinks.map((link) => (
                                                <Link
                                                    key={link.to}
                                                    to={link.to}
                                                    onClick={() =>
                                                        setIsDropdownOpen(false)
                                                    }
                                                    className="flex items-center gap-3 px-3 py-2 text-xs font-bold text-zinc-400 hover:text-white hover:bg-zinc-900 uppercase transition-colors"
                                                >
                                                    <link.icon size={14} />
                                                    {link.label}
                                                </Link>
                                            ))}
                                            <div className="my-2 border-t border-zinc-900" />
                                            <button
                                                type="button"
                                                onClick={handleLogout}
                                                className="cursor-pointer w-full flex items-center gap-3 px-3 py-2 text-xs font-bold text-red-500 hover:bg-red-950/20 uppercase transition-colors"
                                            >
                                                <LogOut size={14} />
                                                Log Out
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link
                                    to="/sign-in"
                                    className="text-xs font-bold uppercase text-zinc-400 hover:text-white"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/sign-up"
                                    className="bg-white text-black px-4 py-2 text-xs font-bold uppercase hover:bg-zinc-200"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}

                        {user && (
                            <button
                                type="button"
                                className="md:hidden text-zinc-400"
                                onClick={() => setIsMenuOpen(true)}
                            >
                                <Menu size={24} />
                            </button>
                        )}
                    </div>
                </div>
            </nav>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{
                            type: "spring",
                            damping: 25,
                            stiffness: 200,
                        }}
                        className="fixed inset-0 z-[60] bg-zinc-950 md:hidden flex flex-col"
                    >
                        <div className="h-16 border-b border-zinc-800 flex items-center justify-between px-6 bg-zinc-950">
                            <span className="font-bold font-mono text-lg uppercase tracking-tighter text-white">
                                Menu
                            </span>
                            <button
                                type="button"
                                onClick={() => setIsMenuOpen(false)}
                                className="text-zinc-400 hover:text-white"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-8">
                            <div>
                                <h3 className="text-xs font-bold text-zinc-600 uppercase tracking-widest mb-4">
                                    Main Menu
                                </h3>
                                <div className="space-y-4">
                                    {primaryLinks.map((link) => (
                                        <Link
                                            key={link.to}
                                            to={link.to}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="flex items-center gap-4 text-lg font-bold text-zinc-300 uppercase hover:text-green-500"
                                        >
                                            <link.icon size={20} /> {link.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xs font-bold text-zinc-600 uppercase tracking-widest mb-4">
                                    Utility{" "}
                                </h3>
                                <div className="space-y-4">
                                    {secondaryLinks.map((link) => (
                                        <Link
                                            key={link.to}
                                            to={link.to}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="flex items-center gap-4 text-lg font-bold text-zinc-300 uppercase hover:text-green-500"
                                        >
                                            <link.icon size={20} /> {link.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => {
                                    setIsMenuOpen(false);
                                    handleLogout();
                                }}
                                className="flex items-center gap-4 text-lg font-bold text-red-500 uppercase mt-8"
                            >
                                <LogOut size={20} /> Terminate Session
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {user && (
                <div className="md:hidden fixed bottom-0 left-0 w-full bg-zinc-950/90 backdrop-blur-lg border-t border-zinc-800 z-40 pb-safe">
                    <div className="flex justify-around items-center h-16">
                        {primaryLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className="flex flex-col items-center justify-center w-full h-full text-zinc-600 [&.active]:text-green-500 [&.active]:bg-green-500/5 transition-all"
                            >
                                <link.icon size={20} className="mb-1" />
                                <span className="text-[9px] font-bold uppercase tracking-wider">
                                    {link.label}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
