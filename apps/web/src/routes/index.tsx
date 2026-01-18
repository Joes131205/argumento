import { createFileRoute, Link } from "@tanstack/react-router";
import {
    ArrowRight,
    BrainCircuit,
    Shield,
    ShieldCheck,
    Target,
} from "lucide-react";
export const Route = createFileRoute("/")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className="min-h-[calc(100vh-4rem)] overflow-x-hidden font-mono text-zinc-300">
            <section className="relative border-zinc-800 border-b px-6 pt-32 pb-20 lg:pt-48 lg:pb-32">
                <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
                    <div className="space-y-8">
                        <h1 className="font-black text-5xl text-white uppercase leading-[0.9] tracking-tighter lg:text-7xl">
                            Increase Your
                            <br />
                            <span className="theme-accent">
                                Logical Thinking
                            </span>
                        </h1>

                        <p className="max-w-xl text-lg text-zinc-500 leading-relaxed">
                            The information age nowadays is a battlefield,
                            either good, either bad. Train your mind to detect
                            logical fallacies, spot media manipulation, and
                            neutralize AI hallucinations before they trick you.
                        </p>

                        <div className="flex flex-col gap-4 sm:flex-row">
                            <Link
                                to="/sign-up"
                                className="theme-accent-solid inline-flex items-center justify-center gap-2 px-8 py-4 font-bold text-black text-lg uppercase tracking-wide transition-all hover:translate-x-1 hover:opacity-90"
                            >
                                Get Started
                                <ArrowRight size={20} />
                            </Link>
                        </div>
                    </div>

                    <div className="space-y-4 p-6">
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-zinc-500">POST #1</span>
                        </div>

                        <div className="space-y-2 border border-zinc-800 bg-zinc-900/30 p-4">
                            <div className="mb-4 h-2 w-20 rounded bg-zinc-800" />
                            <div className="h-4 w-3/4 rounded bg-white/10" />
                            <div className="h-4 w-1/2 rounded bg-white/10" />
                        </div>

                        <div className="flex items-center gap-4 border border-red-900/30 bg-red-900/10 p-3">
                            <div className="rounded bg-red-500/20 p-2 text-red-500">
                                <Shield size={20} />
                            </div>
                            <div>
                                <div className="font-bold text-red-400 text-xs uppercase">
                                    Fallacy Found!
                                </div>
                                <div className="text-red-500/70 text-xs">
                                    Found Fallacy: Ad Hominem
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-black px-6 py-24">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-16 text-center">
                        <h2 className="mb-4 font-black text-3xl text-white uppercase tracking-tight lg:text-4xl">
                            Training Modules
                        </h2>
                        <div className="theme-accent-bg mx-auto h-1 w-20" />
                    </div>

                    <div className="grid gap-8 md:grid-cols-3">
                        <div className="group hover:theme-accent-border border border-zinc-800 bg-zinc-900/20 p-8 transition-colors">
                            <div className="theme-accent mb-6 inline-flex border border-zinc-800 bg-zinc-900 p-3 transition-colors group-hover:bg-current/20 group-hover:text-white">
                                <ShieldCheck size={32} />
                            </div>
                            <h3 className="mb-3 font-bold text-white text-xl uppercase">
                                Defense Drills
                            </h3>
                            <p className="text-zinc-500 leading-relaxed">
                                Process daily feeds of real-world headlines.
                                Identify "slop", clickbait, and fallacies to
                                earn XP and maintain your streak.
                            </p>
                        </div>

                        <div className="group hover:theme-accent-border border border-zinc-800 bg-zinc-900/20 p-8 transition-colors">
                            <div className="theme-accent mb-6 inline-flex border border-zinc-800 bg-zinc-900 p-3 transition-colors group-hover:bg-current/20 group-hover:text-white">
                                <BrainCircuit size={32} />
                            </div>
                            <h3 className="mb-3 font-bold text-white text-xl uppercase">
                                Campaign Mode
                            </h3>
                            <p className="text-zinc-500 leading-relaxed">
                                Progress through structured levels. From "Ad
                                Hominem" attacks to complex "AI Hallucinations,"
                                master the theory behind the lies.
                            </p>
                        </div>

                        <div className="group hover:theme-accent-border border border-zinc-800 bg-zinc-900/20 p-8 transition-colors">
                            <div className="theme-accent mb-6 inline-flex border border-zinc-800 bg-zinc-900 p-3 transition-colors group-hover:bg-current/20 group-hover:text-white">
                                <Target size={32} />
                            </div>
                            <h3 className="mb-3 font-bold text-white text-xl uppercase">
                                Skill Radar
                            </h3>
                            <p className="text-zinc-500 leading-relaxed">
                                Track your analytical accuracy. Our system
                                generates a dynamic skill matrix to highlight
                                your cognitive weak points.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
