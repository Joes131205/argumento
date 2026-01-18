import { createFileRoute, Link } from "@tanstack/react-router";
import {
	AlertCircle,
	ArrowRight,
	CheckCircle2,
	Eye,
	EyeOff,
	Loader2,
	Lock,
	Terminal,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { resetPassword } from "@/apis/auth";

export const Route = createFileRoute("/reset-password/$id")({
	component: RouteComponent,
});

function RouteComponent() {
	const { id } = Route.useParams();

	const [passwords, setPasswords] = useState({ new: "", confirm: "" });
	const [status, setStatus] = useState<
		"idle" | "loading" | "success" | "error"
	>("idle");
	const [errorMsg, setErrorMsg] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmationPassword, setShowConfirmationPassword] =
		useState(false);

	const doPasswordsMatch = passwords.new && passwords.new === passwords.confirm;

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!doPasswordsMatch) {
			setErrorMsg("Passwords do not match");
			return;
		}

		setStatus("loading");
		setErrorMsg("");

		await resetPassword(id, passwords.new);

		try {
			setStatus("success");
		} catch (err) {
            console.log(err)
			setStatus("error");
			setErrorMsg("Token expired or invalid.");
		}
	};

	return (
		<div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-zinc-950 p-6 font-mono text-zinc-300">
			<div className="w-full max-w-md">
				{status === "success" ? (
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						className="border border-green-900 bg-green-950/10 p-8 text-center"
					>
						<div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-green-500/20 bg-green-500/10 text-green-500 shadow-[0_0_20px_rgba(34,197,94,0.2)]">
							<CheckCircle2 size={32} />
						</div>
						<h2 className="mb-2 font-bold text-white text-xl uppercase tracking-wider">
							Credentials Updated
						</h2>
						<p className="mb-8 text-sm text-zinc-400">
							Your password has been reset, you may log in with your new
							credentials
						</p>
						<Link
							to="/sign-in"
							className="inline-flex w-full items-center justify-center gap-2 bg-green-600 px-6 py-3 font-bold text-black text-xs uppercase tracking-widest transition-all hover:bg-green-500"
						>
							Proceed to Login <ArrowRight size={14} />
						</Link>
					</motion.div>
				) : (
					<div className="relative overflow-hidden border border-zinc-800 bg-zinc-900/30 p-8 backdrop-blur-sm">
						<div className="mb-8 border-zinc-800 border-b pb-6">
							<div className="mb-2 flex items-center gap-3 text-white">
								<Terminal size={24} className="text-green-500" />
								<h1 className="font-black text-xl uppercase tracking-tight">
									Reset Password
								</h1>
							</div>
							<div className="flex items-center gap-2 rounded-sm border border-zinc-800/50 bg-zinc-950 p-2 font-bold text-[10px] text-zinc-500 uppercase tracking-widest">
								<span>Key:</span>
								<span className="font-mono text-zinc-300">{id}</span>
							</div>
						</div>

						<form onSubmit={handleSubmit} className="flex flex-col gap-5">
							<div className="space-y-2">
								<label
									htmlFor="password"
									className="font-bold text-xs text-zinc-500 uppercase tracking-wider"
								>
									New Password
								</label>
								<div className="relative">
									<input
										type={showPassword ? "text" : "password"}
										required
										className="w-full border border-zinc-800 bg-zinc-950 py-3 pr-4 pl-10 text-white transition-all placeholder:text-zinc-700 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500/50"
										placeholder="••••••••"
										value={passwords.new}
										onChange={(e) =>
											setPasswords({
												...passwords,
												new: e.target.value,
											})
										}
										id="password"
									/>
									<Lock
										size={16}
										className="absolute top-1/2 left-3 -translate-y-1/2 text-zinc-600"
									/>
									<button
										type="button"
										onClick={() => setShowPassword(!showPassword)}
										className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-zinc-500 transition-colors hover:text-white"
									>
										{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
									</button>
								</div>
							</div>

							<div className="space-y-2">
								<div className="flex items-center justify-between">
									<label
										htmlFor="confirmPassword"
										className="font-bold text-xs text-zinc-500 uppercase tracking-wider"
									>
										Confirm Password
									</label>
									{passwords.confirm && (
										<span
											className={`font-bold text-[10px] uppercase ${doPasswordsMatch ? "text-green-500" : "text-red-500"}`}
										>
											{doPasswordsMatch ? "Match Verified" : "Mismatch"}
										</span>
									)}
								</div>
								<div className="relative">
									<input
										type={showConfirmationPassword ? "text" : "password"}
										required
										className={`w-full border bg-zinc-950 py-3 pr-4 pl-10 text-white transition-all placeholder:text-zinc-700 focus:outline-none ${passwords.confirm && !doPasswordsMatch ? "border-red-900 focus:border-red-500" : "border-zinc-800 focus:border-green-500"}
                                    `}
										placeholder="••••••••"
										value={passwords.confirm}
										onChange={(e) =>
											setPasswords({
												...passwords,
												confirm: e.target.value,
											})
										}
										id="confirmPassword"
									/>
									<Lock
										size={16}
										className="absolute top-1/2 left-3 -translate-y-1/2 text-zinc-600"
									/>
									<button
										type="button"
										onClick={() =>
											setShowConfirmationPassword(!showConfirmationPassword)
										}
										className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-zinc-500 transition-colors hover:text-white"
									>
										{showConfirmationPassword ? (
											<EyeOff size={16} />
										) : (
											<Eye size={16} />
										)}
									</button>
								</div>
							</div>

							{errorMsg && (
								<div className="flex items-center gap-2 border border-red-900/50 bg-red-950/20 p-3 text-red-400 text-xs">
									<AlertCircle size={14} />
									{errorMsg}
								</div>
							)}

							<button
								type="submit"
								disabled={status === "loading" || !doPasswordsMatch}
								className="inline-flex w-full cursor-pointer items-center justify-center gap-2 bg-green-600 px-6 py-3 font-bold text-black text-xs uppercase tracking-widest transition-all hover:bg-green-500"
							>
								{status === "loading" ? (
									<>
										<Loader2 size={16} className="animate-spin" />
										Updating...
									</>
								) : (
									"Update Credentials"
								)}
							</button>
						</form>
					</div>
				)}
			</div>
		</div>
	);
}
