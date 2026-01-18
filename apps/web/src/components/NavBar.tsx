import { Link, useNavigate } from "@tanstack/react-router";
import {
	ChevronDown,
	Cog,
	History,
	LayoutDashboard,
	LogOut,
	Map as MapIcon,
	Menu,
	MessageSquare,
	Radar,
	ShoppingBag,
	Trophy,
	User,
	X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import useUser from "@/hooks/useUser";

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
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const handleLogout = async () => {
		await logOut();
		await invalidateUser();
		toast.info("Session Terminated.");
		navigate({ to: "/sign-in" });
	};

	const linkClass =
		"flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors [&.active]:text-[var(--accent-color)] py-2";

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
		{ to: "/feedbacks", label: "Feedback", icon: MessageSquare },
	];

	return (
		<>
			<nav className="fixed top-0 left-0 z-50 w-full border-zinc-800 border-b bg-zinc-950/90 backdrop-blur-md">
				<div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
					<Link to="/dashboard" className="flex items-center gap-2 text-white">
						<span className="font-bold font-mono text-lg uppercase tracking-tighter">
							Argumento
						</span>
					</Link>

					{user && (
						<div className="hidden items-center gap-8 md:flex">
							{primaryLinks.map((link) => (
								<Link key={link.to} to={link.to} className={linkClass}>
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
									onClick={() => setIsDropdownOpen(!isDropdownOpen)}
									className="flex cursor-pointer items-center gap-3 rounded-sm border border-transparent px-3 py-1 transition-colors hover:border-zinc-800 hover:bg-zinc-900"
								>
									<div className="hidden text-right sm:block">
										<div className="font-bold text-white text-xs uppercase">
											{user.username}
										</div>
									</div>
									<div className="flex h-8 w-8 items-center justify-center border border-zinc-700 bg-zinc-900 text-zinc-400">
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
											className="absolute top-full right-0 z-50 mt-2 w-56 border border-zinc-800 bg-zinc-950 p-2 shadow-2xl"
										>
											<div className="mb-2 border-zinc-900 border-b px-3 py-2 font-bold text-[10px] text-zinc-600 uppercase tracking-widest">
												Utility
											</div>
											{secondaryLinks.map((link) => (
												<Link
													key={link.to}
													to={link.to}
													onClick={() => setIsDropdownOpen(false)}
													className="flex items-center gap-3 px-3 py-2 font-bold text-xs text-zinc-400 uppercase transition-colors hover:bg-zinc-900 hover:text-white"
												>
													<link.icon size={14} />
													{link.label}
												</Link>
											))}
											<div className="my-2 border-zinc-900 border-t" />
											<button
												type="button"
												onClick={handleLogout}
												className="flex w-full cursor-pointer items-center gap-3 px-3 py-2 font-bold text-red-500 text-xs uppercase transition-colors hover:bg-red-950/20"
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
									className="font-bold text-xs text-zinc-400 uppercase hover:text-white"
								>
									Login
								</Link>
								<Link
									to="/sign-up"
									className="theme-accent-solid px-4 py-2 font-bold text-black text-xs uppercase transition-colors hover:bg-[var(--accent-dark)]"
								>
									Sign Up
								</Link>
							</div>
						)}

						{user && (
							<button
								type="button"
								className="text-zinc-400 md:hidden"
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
						className="fixed inset-0 z-[60] flex flex-col bg-zinc-950 md:hidden"
					>
						<div className="flex h-16 items-center justify-between border-zinc-800 border-b bg-zinc-950 px-6">
							<span className="font-bold font-mono text-lg text-white uppercase tracking-tighter">
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

						<div className="flex-1 space-y-8 overflow-y-auto p-6">
							<div>
								<h3 className="mb-4 font-bold text-xs text-zinc-600 uppercase tracking-widest">
									Main Menu
								</h3>
								<div className="space-y-4">
									{primaryLinks.map((link) => (
										<Link
											key={link.to}
											to={link.to}
											onClick={() => setIsMenuOpen(false)}
											className="flex items-center gap-4 font-bold text-lg text-zinc-300 uppercase hover:text-green-500"
										>
											<link.icon size={20} /> {link.label}
										</Link>
									))}
								</div>
							</div>

							<div>
								<h3 className="mb-4 font-bold text-xs text-zinc-600 uppercase tracking-widest">
									Utility{" "}
								</h3>
								<div className="space-y-4">
									{secondaryLinks.map((link) => (
										<Link
											key={link.to}
											to={link.to}
											onClick={() => setIsMenuOpen(false)}
											className="flex items-center gap-4 font-bold text-lg text-zinc-300 uppercase hover:text-green-500"
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
								className="mt-8 flex items-center gap-4 font-bold text-lg text-red-500 uppercase"
							>
								<LogOut size={20} /> Terminate Session
							</button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
