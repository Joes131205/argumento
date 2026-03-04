export const content_types = [
    {
        name: "Logical Fallacies",
        description:
            "Errors in reasoning that render an argument invalid. These are flaws in the structure of the logic itself, often used to manipulate debates and win arguments unfairly.",
        types: [
            {
                name: "Ad Hominem",
                definition:
                    "Attacking the person making the argument instead of addressing the argument itself. Example: 'How can we trust his climate research? He's been divorced twice!' Personal flaws don't disprove facts.",
            },
            {
                name: "Strawman",
                definition:
                    "Distorting someone's position into an extreme, easy-to-attack version they never actually held. Example: 'You want a small tax increase' becomes 'You want to steal everyone's money!' It's easier to knock down a scarecrow than fight the real opponent.",
            },
            {
                name: "Slippery Slope",
                definition:
                    "Claiming a small action will inevitably trigger a catastrophic chain reaction—without evidence for each step. Example: 'If we allow remote work, offices will close, cities will die, and civilization will collapse!' Each domino needs proof.",
            },
            {
                name: "False Dilemma",
                definition:
                    "Forcing a choice between two extremes when many options exist. Example: 'You're either with us 100% or you're our enemy.' Real life has nuance, compromise, and middle ground. Binary choices are usually artificial.",
            },
            {
                name: "Appeal to Emotion",
                definition:
                    "Using feelings—fear, anger, pity, outrage—instead of facts to win an argument. A crying child in a photo doesn't prove a policy is wrong. Strong emotions can bypass critical thinking. Valid arguments don't need tears.",
            },
            {
                name: "Red Herring",
                definition:
                    "Diverting attention from the real issue by introducing something irrelevant. Named after the old trick of dragging smelly fish to throw dogs off a trail. Asked about missing funds? Suddenly they're talking about their grandmother's recipes.",
            },
        ],
        requirements: "campaign_1",
    },
    {
        name: "Cognitive Biases",
        description:
            "Mental shortcuts your brain takes that can be exploited. These systematic patterns of irrational thinking helped our ancestors survive but now leave us vulnerable to manipulation.",
        types: [
            {
                name: "Confirmation Bias",
                definition:
                    "Your brain loves being right—so it actively seeks information supporting existing beliefs while ignoring contradicting evidence. Finding one blog that agrees with you doesn't disprove 200 studies that don't.",
            },
            {
                name: "Survivorship Bias",
                definition:
                    "We only hear from the winners. 'Bill Gates dropped out and became a billionaire!' ignores millions who dropped out and failed. Your grandmother who smoked to 97 doesn't represent the millions who died from lung cancer.",
            },
            {
                name: "Sunk Cost Fallacy",
                definition:
                    "Continuing something because you've already invested time/money, even though it's failing. Past investments are gone regardless—the only question is whether continuing is worth it. Don't throw good money after bad.",
            },
            {
                name: "Anchoring Bias",
                definition:
                    "The first number you see becomes your mental anchor. A '$5,000 watch marked down to $200' feels like a steal—even if the watch was never worth $50. Always ask: what's this actually worth?",
            },
            {
                name: "Halo Effect",
                definition:
                    "Assuming excellence in one area means excellence in everything. A famous actor launching diet pills must know nutrition, right? Wrong. Being talented, attractive, or wealthy doesn't grant expertise in unrelated fields.",
            },
            {
                name: "Dunning-Kruger Effect",
                definition:
                    "The less you know, the more confident you feel. After one YouTube video, someone thinks they understand quantum physics better than Einstein. True experts recognize how much they don't know. Extreme confidence + minimal credentials = red flag.",
            },
        ],
        requirements: "campaign_2",
    },
    {
        name: "Media Manipulation",
        description:
            "Advanced tactics used by bad actors, marketers, propagandists, and bots to hijack your attention, trigger emotional reactions, manufacture fake consensus, and derail honest conversation.",
        types: [
            {
                name: "Rage Bait",
                definition:
                    "Content engineered to make you furious—because anger drives engagement. That outrageous headline about 'millennials banning hard work' is probably exaggerated or fabricated. They win whether you agree or disagree—as long as you react.",
            },
            {
                name: "False Urgency (FOMO)",
                definition:
                    "Manufacturing artificial time pressure to bypass rational thinking. 'Only 3 spots left!' 'Expires in 10 minutes!' Legitimate opportunities don't evaporate instantly. When pressured to decide immediately, that's when you should slow down.",
            },
            {
                name: "Astroturfing",
                definition:
                    "Fake grassroots support. A 'regular mom' praising oil drilling is actually a PR firm employee. A 'fellow consumer' raving about MegaCorp is on their payroll. Corporate messages disguised as popular opinion. Always ask: who benefits?",
            },
            {
                name: "Weasel Words",
                definition:
                    "Vague phrases that imply authority without evidence. 'Experts say...' Which experts? 'Studies show...' What studies? 'Many people believe...' How many? Legitimate claims cite specific, verifiable sources. Weasel words are intellectual cowardice.",
            },
            {
                name: "Whataboutism",
                definition:
                    "Deflecting criticism by pointing fingers elsewhere. 'Sure, we polluted the river, but what about that other factory?' Two wrongs don't make a right. Someone else's bad behavior doesn't excuse yours. Stay focused on the original issue.",
            },
            {
                name: "Sealioning",
                definition:
                    "Harassment disguised as politeness. Endless 'just asking questions' demanding sources, timestamps, and sworn affidavits for basic claims—not to learn, but to exhaust you until you give up. Bad faith masquerading as intellectual curiosity.",
            },
            {
                name: "Gish Gallop",
                definition:
                    "Overwhelming opponents with a flood of weak arguments. It takes 5 seconds to make 50 false claims but hours to debunk each one. The goal isn't to be right—it's to win by exhaustion. Don't chase every droplet in the firehose.",
            },
        ],
        requirements: "campaign_3",
    },
    {
        name: "AI Hallucinations",
        description:
            "Errors specific to AI systems where the model generates plausible-sounding but factually incorrect or nonsensical content. AI doesn't 'know' things—it predicts what sounds right, and sometimes it's very wrong.",
        types: [
            {
                name: "Confident Falsehood",
                definition:
                    "AI stating completely wrong facts with absolute confidence and professional tone. The Eiffel Tower was 'built in Berlin in 1889' sounds authoritative—but it's fiction. Polished language triggers trust. Always verify unusual claims.",
            },
            {
                name: "Source Fabrication",
                definition:
                    "AI inventing citations, authors, journals, and URLs that look legitimate but don't exist. 'According to Professor McFakerton at the University of Atlantis...' Before trusting a source, verify it actually exists.",
            },
            {
                name: "Sycophancy",
                definition:
                    "AI agreeing with wrong premises just to be helpful. 'You're right, the Earth could be flat!' AI is trained to please, not to push back. If something confirms your beliefs too enthusiastically without nuance, be suspicious.",
            },
            {
                name: "Logic Loop",
                definition:
                    "AI getting stuck repeating phrases robotically. 'I can help with that. Helping is what I do. I am here to help.' This glitchy, repetitive output is a telltale sign of AI gone haywire. Human writing has natural variation.",
            },
            {
                name: "Context Amnesia",
                definition:
                    "AI contradicting itself within the same response. 'Never eat apples—they're toxic. Also, eat plenty of apples!' When facts clash wildly within one piece, the AI lost track of its own narrative mid-generation.",
            },
        ],
        requirements: "campaign_4",
    },
    {
        name: "Financial Scams",
        description:
            "Money makes people irrational, and scammers know it. These tactics exploit greed, fear, and FOMO to separate you from your money. If it sounds too good to be true, it is.",
        types: [
            {
                name: "Get Rich Quick",
                definition:
                    "Promising wealth with no effort. 'Make $10,000/week from your phone!' Real wealth takes time—anyone promising instant riches is lying. 'Guaranteed returns' and 'risk-free investment' are scam fingerprints.",
            },
            {
                name: "MLM/Pyramid Scheme",
                definition:
                    "Business 'opportunities' where the real money comes from recruiting others, not selling products. 'Build your downline!' 'The real money is in getting others to join!' FTC data: 99% of MLM participants lose money.",
            },
            {
                name: "Crypto Scam",
                definition:
                    "The crypto space is a scam minefield: pump-and-dumps, rug pulls, fake airdrops. If a stranger DMs you about crypto, it's a scam. If a celebrity is 'giving away' Bitcoin, it's a scam. Verify everything.",
            },
            {
                name: "Impersonation Scam",
                definition:
                    "Pretending to be someone trustworthy—the IRS, your bank, Elon Musk, tech support. 'WIRE MONEY NOW or face arrest!' Real institutions don't demand payment via gift cards or crypto. Verify through official channels.",
            },
            {
                name: "Fake Urgency",
                definition:
                    "Creating artificial time pressure to prevent thinking. 'Only 3 spots left!' 'Expires in 10 minutes!' Scammers don't want you to think—they want you to act. When pressured to decide immediately, slow down.",
            },
        ],
        requirements: "campaign_5",
    },
    {
        name: "Health Misinformation",
        description:
            "Bad health advice can literally kill people. These dangerous tactics spread through social media, exploiting fear and desperation. Learn to separate medical facts from deadly nonsense.",
        types: [
            {
                name: "Miracle Cure",
                definition:
                    "Claims that one food, supplement, or 'secret' cures serious diseases. Cancer doesn't care how much lemon water you drink. Red flags: cures everything, doctors 'hiding' it, pressure to share before deletion.",
            },
            {
                name: "Anti-Medicine Propaganda",
                definition:
                    "Content demonizing proven treatments. 'Chemo is poison!' 'Hospitals are death traps!' Chemotherapy has saved millions. Vaccines eradicated smallpox. Skepticism is healthy; rejecting all medicine is deadly.",
            },
            {
                name: "Fake Study",
                definition:
                    "'Studies show' doesn't make it true. Real studies are peer-reviewed, have adequate sample sizes, and disclose conflicts. A 'study' by the Celery Farmers Association in the Journal of Celery Science isn't credible.",
            },
            {
                name: "Dangerous Advice",
                definition:
                    "Recommendations that could seriously harm you. Drinking bleach, staring at the sun, refusing proven treatments for untested alternatives. When health advice sounds extreme, consult actual medical professionals.",
            },
            {
                name: "Conspiracy Theory",
                definition:
                    "'Big Pharma is hiding the cure!' 'Doctors are paid to keep you sick!' These narratives exploit distrust of institutions. Ask: what's more likely—a global conspiracy, or someone trying to sell you something?",
            },
        ],
        requirements: "campaign_6",
    },
];
