import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import useUser from "@/hooks/useUser";
import { requireAuth } from "@/utils/requireAuth";

export const Route = createFileRoute("/")({
	beforeLoad: requireAuth,
	component: HomeComponent,
});

function HomeComponent() {
	const { user, logOut, invalidateUser } = useUser();
	const navigate = useNavigate();

	const hasPlayedToday = () => {
		if (!user?.lastPlayedDate) return false;

		const last = new Date(user.lastPlayedDate);
		const today = new Date();

		return (
			last.getDate() === today.getDate() &&
			last.getMonth() === today.getMonth() &&
			last.getFullYear() === today.getFullYear()
		);
	};

	const accuracy = user?.postsHistory.length
		? (((user.postsCorrect || 0) / user.postsHistory.length) * 100).toFixed(1)
		: "0";

	const isShiftDone = hasPlayedToday();

	return (
		<div className="flex min-h-screen flex-col items-center gap-12 bg-zinc-950 p-8 text-green-500">
			{/* Header */}
			<div className="mt-8 space-y-2 text-center">
				<h1 className="font-black text-5xl tracking-tight md:text-6xl">
					Welcome back, <span className="text-green-400">{user?.username}</span>
					!
				</h1>
				<p className="text-green-500/60 text-lg">
					{isShiftDone
						? "You've completed today's shift! 🎉"
						: "Ready for your daily shift?"}
				</p>
			</div>

			{/* Stats Grid */}
			<div className="grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
				{/* Total EXP Card */}
				<div className="justify-center rounded-lg border-2 border-green-500/30 bg-black/40 p-6 transition-all duration-300 hover:border-green-500/60 hover:shadow-green-500/20 hover:shadow-lg">
					<div className="flex flex-col items-center gap-3">
						<p className="font-semibold text-green-500/80 text-sm uppercase tracking-wider">
							Total EXP
						</p>
						<p className="font-black text-4xl text-green-400">
							{user?.totalExp?.toLocaleString() || 0}
						</p>
					</div>
				</div>

				{/* Streak Card */}
				<div className="justify-center rounded-lg border-2 border-green-500/30 bg-black/40 p-6 transition-all duration-300 hover:border-green-500/60 hover:shadow-green-500/20 hover:shadow-lg">
					<p className="mb-4 text-center font-semibold text-green-500/80 text-sm uppercase tracking-wider">
						Streak
					</p>
					<div className="flex justify-around">
						<div className="text-center">
							<p className="font-black text-3xl text-green-400">
								{user?.currentStreak || 0}
							</p>
							<p className="mt-1 text-green-500/60 text-xs">Current</p>
						</div>
						<div className="text-center">
							<p className="font-black text-3xl text-green-400">
								{user?.bestStreak || 0}
							</p>
							<p className="mt-1 text-green-500/60 text-xs">Best</p>
						</div>
					</div>
				</div>

				{/* Posts Card */}
				<div className="justify-center rounded-lg border-2 border-green-500/30 bg-black/40 p-6 transition-all duration-300 hover:border-green-500/60 hover:shadow-green-500/20 hover:shadow-lg">
					<p className="mb-4 text-center font-semibold text-green-500/80 text-sm uppercase tracking-wider">
						Posts
					</p>
					<div className="flex items-center justify-around">
						<div className="text-center">
							<p className="font-black text-2xl text-green-400">
								{user?.postsHistory.length || 0}
							</p>
							<p className="mt-1 text-green-500/60 text-xs">Processed</p>
						</div>
						<div className="text-center">
							<p className="font-black text-2xl text-green-400">
								{user?.postsCorrect || 0}
							</p>
							<p className="mt-1 text-green-500/60 text-xs">Correct</p>
						</div>
					</div>
					<div className="mt-4 border-green-500/20 border-t pt-3 text-center">
						<p className="font-bold text-green-400 text-lg">{accuracy}%</p>
						<p className="text-green-500/60 text-xs">Accuracy</p>
					</div>
				</div>

				{/* Daily Shift Card */}
				<div className="flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-green-500/30 bg-black/40 p-6 transition-all duration-300 hover:border-green-500/60 hover:shadow-green-500/20 hover:shadow-lg">
					<p className="font-semibold text-green-500/80 text-sm uppercase tracking-wider">
						Daily Shift
					</p>
					{isShiftDone ? (
						<div className="text-center">
							<div className="mb-2 text-4xl">✓</div>
							<p className="font-semibold text-green-400">Completed</p>
							<p className="mt-1 text-green-500/60 text-xs">
								Come back tomorrow
							</p>
						</div>
					) : (
						<Link
							to="/play/daily"
							className="rounded-lg bg-green-500 px-8 py-3 font-bold text-black transition-all duration-300 hover:scale-105 hover:bg-green-400 hover:shadow-green-500/50 hover:shadow-lg"
						>
							Start Shift
						</Link>
					)}
				</div>
			</div>

			{/* Quick Links */}
			<div className="mt-8 flex flex-wrap justify-center gap-4">
				<Link
					to="/history"
					className="rounded-lg border border-green-500/30 px-6 py-2 transition-all hover:border-green-500 hover:bg-green-500/10"
				>
					View History
				</Link>
				<Link
					to="/leaderboard"
					className="rounded-lg border border-green-500/30 px-6 py-2 transition-all hover:border-green-500 hover:bg-green-500/10"
				>
					Leaderboard
				</Link>
				<Link
					to="/skills-radar"
					className="rounded-lg border border-green-500/30 px-6 py-2 transition-all hover:border-green-500 hover:bg-green-500/10"
				>
					Skills Radar
				</Link>
				<Link
					to="/campaign"
					className="rounded-lg border border-green-500/30 px-6 py-2 transition-all hover:border-green-500 hover:bg-green-500/10"
				>
					Campaign
				</Link>
				<button
					type="button"
					onClick={async () => {
						await logOut();
						await invalidateUser();
						toast.info("Logged Out!");
						navigate({ to: "/sign-in" });
					}}
					className="cursor-pointer rounded-lg border border-green-500/30 px-6 py-2 transition-all hover:border-green-500 hover:bg-green-500/10"
				>
					Log Out
				</button>
			</div>
		</div>
	);
}
