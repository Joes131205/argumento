import { useState } from "react";
const manual = [
    {
        title: "Ad Hominem",
        desc: "This fallacy attacks the person instead of dealing with their argument. It tries to make you reject an idea by making the speaker look bad rather than engaging with their point. You’ll usually see it when someone feels cornered and switches to personal insults or character attacks.",
        example: "You can't trust his economic plan; he cheats on his wife!",
    },
    {
        title: "Strawman",
        desc: "This happens when someone twists another person’s argument into something weaker or extreme just so it’s easier to attack. Instead of responding to the real point, they create a fake version of it. It often shows up in debates where oversimplifying the opponent feels easier than addressing nuance.",
        example:
            "A: We should lower the budget. B: So you want to destroy the country?",
    },
    {
        title: "Slippery Slope",
        desc: "This fallacy claims that one small action will start an unstoppable chain of terrible outcomes. It skips over all the steps in between and jumps straight to the worst-case scenario. You’ll hear it when someone wants to scare others into rejecting a small, harmless proposal.",
        example:
            "If we ban plastic straws, next they will ban cars and electricity!",
    },
    {
        title: "False Dilemma",
        desc: "This one presents only two extreme choices even though more options clearly exist. It forces you to pick between 'good' and 'bad' with no middle ground. It often appears when someone wants to oversimplify a complex issue.",
        example: "You either support this law or you hate freedom.",
    },
    {
        title: "Appeal to Emotion",
        desc: "This fallacy tries to win an argument by triggering feelings instead of offering reasons or evidence. It’s often used to bypass logic by making you feel pity, fear, guilt, or anger. You’ll notice it whenever someone relies on dramatic language instead of facts.",
        example: "Think of the children! You are a monster if you vote No.",
    },
    {
        title: "False Cause",
        desc: "This claims that because one thing happened before another, the first thing must have caused the second. It ignores coincidence, context, and actual evidence. You’ll see it a lot when people confuse correlation with causation.",
        example: "I wore red socks and we won. The socks caused the win.",
    },
    {
        title: "Red Herring",
        desc: "This fallacy distracts from the real issue by introducing something irrelevant. It doesn't solve the problem—it just changes the subject. People often use it when they want to avoid answering a tough question.",
        example:
            "Why did you break the rule?—Well, other people break rules all the time.",
    },
    {
        title: "Bandwagon",
        desc: "This argues that something must be true or good simply because ‘everyone else’ believes it. It pressures people to follow the crowd instead of thinking independently. You’ll often see it in advertising, politics, and social trends.",
        example: "Everyone is investing in this coin, so you should too!",
    },
    {
        title: "Appeal to Authority",
        desc: "This fallacy treats a claim as true just because an authority figure said it, even when the authority isn’t an expert in that topic. It relies on reputation instead of actual evidence. It's common in debates where name-dropping replaces critical thinking.",
        example: "A famous actor says this diet works, so it must be legit.",
    },
    {
        title: "Hasty Generalization",
        desc: "This fallacy draws a big conclusion from a tiny sample of evidence. It jumps to assumptions without enough data. You’ll see it when people make broad claims based on a single story or limited experience.",
        example:
            "I met one rude person from that city, so everyone there must be rude.",
    },
    {
        title: "Circular Reasoning",
        desc: "This is when the argument’s conclusion is also used as its own proof. Nothing new is ever explained—it just loops back on itself. It often sounds convincing until you realize it never gives real evidence.",
        example: "This medicine works because it's very effective.",
    },
    {
        title: "Tu Quoque",
        desc: "Also known as the ‘you too’ fallacy, this tries to deflect criticism by pointing out that the accuser is guilty of the same thing. It avoids addressing the issue by shifting blame. It pops up a lot during disagreements or personal conflicts.",
        example: "You say I shouldn't lie, but you lied yesterday!",
    },
    {
        title: "Anecdotal Evidence",
        desc: "This relies on personal stories instead of solid data. Even if the story is true, it doesn’t prove a general rule. You’ll see it whenever someone uses a single experience to argue against well-established facts.",
        example:
            "My uncle smoked his whole life and lived to 90, so smoking is fine.",
    },
    {
        title: "Begging the Question",
        desc: "This fallacy assumes the conclusion within the premise, meaning it argues something by simply restating it. No real support is given. It often shows up in arguments where someone assumes they’re right from the start.",
        example:
            "This app is the best because it's better than all the others.",
    },
    {
        title: "No True Scotsman",
        desc: "This fallacy protects a generalization by redefining the group whenever a counterexample appears. It moves the goalposts to keep the claim alive. You'll often see it in discussions about identity or purity.",
        example:
            "No real gamer plays on mobile. Oh, he does? Well, then he's not a real gamer.",
    },
    {
        title: "Post Hoc",
        desc: "A more specific version of False Cause, this fallacy assumes that if A happened before B, then A caused B. It ignores all other possible explanations. You’ll see it used to connect unrelated events as if they had meaning.",
        example:
            "We changed our logo last month and sales dropped. The new logo ruined everything.",
    },
    {
        title: "False Equivalence",
        desc: "This fallacy treats two unrelated or unequal things as if they’re exactly the same. It usually simplifies complex situations by forcing symmetry where none exists. It shows up a lot in debates where someone wants to downplay wrongdoing.",
        example:
            "Both sides were wrong—stealing a candy bar is basically the same as insider trading.",
    },
    {
        title: "Middle Ground",
        desc: "This claims that the truth must be somewhere between two extremes, even when one side is completely incorrect. It assumes compromise equals correctness. It often appears when people want to sound ‘reasonable’ without evaluating evidence.",
        example:
            "Some say vaccines work, others say they don’t, so the truth is probably in the middle.",
    },
    {
        title: "Appeal to Nature",
        desc: "This argues that something is good because it’s ‘natural’ or bad because it’s ‘unnatural.’ It ignores science, safety, and context. It appears a lot in marketing and health discussions.",
        example: "This product is natural, so it must be healthier.",
    },
    {
        title: "Appeal to Tradition",
        desc: "This claims something must be right because it’s always been done that way. It treats history as proof, ignoring whether the idea still makes sense. You’ll see it in cultural, political, or organizational debates.",
        example: "We shouldn’t change the system; it’s worked for decades.",
    },
    {
        title: "Burden of Proof Shift",
        desc: "This fallacy forces the other person to disprove a claim rather than providing evidence for it. It avoids responsibility by making denial the difficult part. It's common in conspiracy theories or unfounded accusations.",
        example: "You can’t prove ghosts *don’t* exist, so they must be real.",
    },
    {
        title: "Composition",
        desc: "This fallacy assumes that what’s true for individual parts must also be true for the whole group. It ignores how components behave when combined. You’ll see it in arguments that oversimplify complex systems.",
        example:
            "Each player on the team is amazing, so the team will definitely be unbeatable.",
    },
    {
        title: "Division",
        desc: "The opposite of composition — it assumes that what’s true of the whole must be true of each part. It breaks logic by distributing a group trait onto individuals. It's common when people stereotype or overgeneralize.",
        example:
            "The team is terrible this year, so every player must be terrible too.",
    },
];

const Manual = () => {
    const [index, setIndex] = useState<number>(0);
    const [isOpened, setIsOpened] = useState<boolean>(false);

    return (
        <div>
            {/* The Main Card Container */}
            <div className="bg-zinc-900 w-full max-w-4xl h-[85vh] rounded-lg shadow-[0_0_30px_rgba(0,255,100,0.1)] flex flex-col border border-zinc-700 overflow-hidden relative">
                {/* --- HEADER --- */}
                <div className="bg-zinc-950 p-4 border-b border-zinc-700 flex justify-between items-center shrink-0">
                    <div className="flex flex-col gap-3">
                        <p className="text-white text-2xl font-bold">Manual</p>
                        <p className="text-white">Use it whenever necessary</p>
                    </div>
                </div>

                {/* --- CONTENT AREA --- */}
                <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
                    {isOpened ? (
                        <div>
                            <button
                                type="button"
                                onClick={() => setIsOpened(false)}
                                className="mb-6 flex items-center gap-2 text-green-500 hover:text-green-300 transition-colors font-mono text-sm font-bold uppercase tracking-wide"
                            >
                                ← Return to Index
                            </button>

                            <h3 className="text-4xl font-black text-white mb-6 tracking-tight">
                                {manual[index].title}
                            </h3>

                            <div className="prose prose-invert max-w-none">
                                <p className="text-xl text-zinc-300 leading-relaxed mb-8 font-light">
                                    {manual[index].desc}
                                </p>
                            </div>

                            <div className="bg-zinc-950 border-l-4 border-green-500 p-6 rounded-r-lg">
                                <h4 className="text-xs font-bold text-green-500 uppercase mb-2 tracking-widest"></h4>
                                <p className="font-mono text-green-100/90 text-lg italic">
                                    "{manual[index].example}"
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <p className="text-zinc-400 mb-6 font-mono text-sm border-b border-zinc-800 pb-4">
                                SELECT A TOPIC TO REVIEW PARAMETERS:
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                {manual.map((item, i) => (
                                    <button
                                        key={item.title}
                                        type="button"
                                        onClick={() => {
                                            setIndex(i);
                                            setIsOpened(true);
                                        }}
                                        className="text-left px-5 py-4 bg-zinc-800/50 hover:bg-green-600 hover:text-black text-zinc-300 border border-zinc-700 hover:border-green-500 rounded transition-all duration-200 group"
                                    >
                                        <span className="font-bold font-mono tracking-wide block group-hover:translate-x-1 transition-transform">
                                            {item.title}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Manual;
