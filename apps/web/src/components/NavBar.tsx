import { Link, useNavigate } from "@tanstack/react-router";
import {
    History,
    LayoutDashboard,
    LogOut,
    Map as MapIcon,
    Radar,
    Trophy,
} from "lucide-react";
import { toast } from "sonner";
import useUser from "@/hooks/useUser";

export function Navbar() {
    const { user, logOut, invalidateUser } = useUser();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logOut();
        await invalidateUser();
        toast.info("Session Terminated.");
        navigate({ to: "/" });
    };

    const linkClass =
        "flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-green-500 transition-colors [&.active]:text-green-500 [&.active]:border-b-2 [&.active]:border-green-500 py-5";

    return (
        <nav className="fixed top-0 left-0 z-50 w-full border-zinc-800 border-b bg-zinc-950/90 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                <Link
                    to="/dashboard"
                    className="group flex items-center gap-2 text-white"
                >
                    <span className="hidden font-bold font-mono text-lg uppercase tracking-tighter md:block">
                        Argumento
                    </span>
                </Link>

                {user ? (
                    <div className="hidden h-full items-center gap-8 md:flex">
                        <Link to="/dashboard" className={linkClass}>
                            <LayoutDashboard size={14} />
                            Dashboard
                        </Link>
                        <Link to="/campaign" className={linkClass}>
                            <MapIcon size={14} />
                            Campaign
                        </Link>
                        <Link to="/history" className={linkClass}>
                            <History size={14} />
                            Logs
                        </Link>
                        <Link to="/skills-radar" className={linkClass}>
                            <Radar size={14} />
                            Stats
                        </Link>
                        <Link to="/leaderboard" className={linkClass}>
                            <Trophy size={14} />
                            Ranking
                        </Link>
                    </div>
                ) : (
                    <div className="hidden h-full items-center gap-8 md:flex">
                        <Link to="/" className={linkClass}>
                            Home
                        </Link>
                        <a
                            href="https://github.com"
                            target="_blank"
                            className={linkClass}
                            rel="noreferrer noopener"
                        >
                            Source
                        </a>
                    </div>
                )}

                <div className="flex items-center gap-4">
                    {user ? (
                        <>
                            <div className="hidden flex-col items-end sm:flex">
                                <span className="font-bold text-white text-xs uppercase">
                                    {user.username}
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="cursor-pointer text-zinc-500 transition-colors hover:text-red-500"
                                title="Logout"
                            >
                                <LogOut size={18} />
                            </button>
                        </>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link
                                to="/sign-in"
                                className="px-4 py-2 font-bold text-xs text-zinc-400 uppercase hover:text-white"
                            >
                                Login
                            </Link>
                            <Link
                                to="/sign-up"
                                className="bg-green-600 px-4 py-2 font-bold text-black text-xs uppercase hover:bg-green-500"
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {user && (
                <div className="flex justify-around overflow-x-auto border-zinc-900 border-t bg-black/50 py-2 md:hidden">
                    <Link
                        to="/"
                        className="p-3 text-zinc-500 [&.active]:text-green-500"
                    >
                        <LayoutDashboard size={20} />
                    </Link>
                    <Link
                        to="/campaign"
                        className="p-3 text-zinc-500 [&.active]:text-green-500"
                    >
                        <MapIcon size={20} />
                    </Link>
                    <Link
                        to="/history"
                        className="p-3 text-zinc-500 [&.active]:text-green-500"
                    >
                        <History size={20} />
                    </Link>
                    <Link
                        to="/skills-radar"
                        className="p-3 text-zinc-500 [&.active]:text-green-500"
                    >
                        <Radar size={20} />
                    </Link>
                </div>
            )}
        </nav>
    );
}
