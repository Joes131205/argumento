export const campaign_level = {
    campaign_0: {
        title: "Orientation",
        description: "Get to know the system before going on with yourself.",
        levels: {
            level_1: {
                title: "Safe Post",
                briefing:
                    "Welcome to Argumento. Before we getting started, you need to know the interface here. You will see a headline and a content, if you think this post is okay-ish, you can click [APPROVE], click [REJECT] otherwise. In this scenario, the post is safe, but be wary of the bad content.",
                posts: [
                    {
                        id: "c0_l1_p1",
                        headline: "City Park Maintenance Scheduled",
                        content:
                            "The north side of the city park will be closed for routine gardening this Tuesday from 9 AM to 11 AM.",
                        type: "safe",
                        slop_reasons: [],
                        category: "safe",
                    },
                ],
            },
            level_2: {
                title: "Bad Post",
                briefing:
                    "Nice, now, once again, if you see a bad content, [REJECT] it, and also state your reasoning, in this post, theres a clickbait element to it, you can [REJECT] it. We won't give you any more hint further as we go :D",
                posts: [
                    {
                        id: "c0_l2_p1",
                        headline: "You Won't Believe What This Dog Did!",
                        content:
                            "This golden retriever did the most shocking thing ever. Click here to see the video that doctors don't want you to see!",
                        type: "slop",
                        slop_reasons: ["Clickbait", "False Urgency"],
                        category: "media_manipulation",
                    },
                ],
            },
        },
        requirement: "",
    },
    campaign_1: {
        title: "Logical Fallacies",
        description: "The thing that bends the logic, no pun intended.",
        requirement: "campaign_0",
        levels: {
            level_1: {
                title: "Attack the Person (Ad Hominem)",
                briefing:
                    "The most common trick is 'Ad Hominem'. Instead of arguing against the facts, the author insults the person. If you see someone attacking a person's character instead of their argument, [REJECT] it as Ad Hominem.",
                posts: [
                    {
                        id: "c1_l1_p1",
                        headline: "Don't Trust Dr. Stevens!",
                        content:
                            "Dr. Stevens published a study on climate change, but he has a messy divorce and drives a cheap car. Clearly, his science is wrong.",
                        type: "slop",
                        slop_reasons: ["Ad Hominem"],
                        category: "fallacies",
                    },
                ],
            },
            level_2: {
                title: "The Scarecrow (Strawman)",
                briefing:
                    "A 'Strawman' argument twists someone's words into a ridiculous version that is easy to defeat. If the post claims someone said something extreme that they probably didn't say, [REJECT] it.",
                posts: [
                    {
                        id: "c1_l2_p1",
                        headline: "Senator Hates Fun",
                        content:
                            "The Senator proposed a tax on sugary sodas. Basically, he wants to ban all food and force us to eat government-issued paste!",
                        type: "slop",
                        slop_reasons: ["Strawman"],
                        category: "fallacies",
                    },
                ],
            },
            level_3: {
                title: "Black or White (False Dilemma)",
                briefing:
                    "This fallacy pretends there are only two options: 'My way' or 'Total Destruction'. Real life usually has middle ground. If a post forces a binary choice, [REJECT] it.",
                posts: [
                    {
                        id: "c1_l3_p1",
                        headline: "Join the Future or Stay Poor",
                        content:
                            "You either invest in this specific crypto-coin right now, or you want your family to remain in poverty forever. The choice is yours.",
                        type: "slop",
                        slop_reasons: ["False Dilemma"],
                        category: "fallacies",
                    },
                ],
            },
            level_4: {
                title: "The Snowball (Slippery Slope)",
                briefing:
                    "The 'Slippery Slope' argues that a small, harmless step will inevitably lead to a giant disaster without any proof. Watch out for extreme predictions.",
                posts: [
                    {
                        id: "c1_l4_p1",
                        headline: "No Homework on Fridays?",
                        content:
                            "If the school bans homework on Fridays, kids will stop studying entirely, drop out of school, and the entire economy will collapse by 2030.",
                        type: "slop",
                        slop_reasons: ["Slippery Slope"],
                        category: "fallacies",
                    },
                ],
            },
        },
    },
    campaign_2: {
        title: "Cognitive Biases",
        description:
            "Your brain is hardwired to make mistakes. Learn to spot them.",
        requirement: "campaign_1",
        levels: {
            level_1: {
                title: "The Echo Chamber (Confirmation Bias)",
                briefing:
                    "Humans love being right. 'Confirmation Bias' is when we ignore 99 facts that disagree with us and focus on the 1 fact that supports us. Watch out for posts that cite obscure sources to claim they are 'the only one telling the truth'.",
                posts: [
                    {
                        id: "c2_l1_p1",
                        headline: "All Scientists Are Wrong!",
                        content:
                            "Every major study says eating rocks is bad for you, but I found this one blog post from 2004 that says it's fine. Finally, the truth!",
                        type: "slop",
                        slop_reasons: ["Confirmation Bias"],
                        category: "biases",
                    },
                ],
            },
            level_2: {
                title: "The Survivor's Error (Survivorship Bias)",
                briefing:
                    "We look at the winners and forget the losers. 'Survivorship Bias' assumes that because one person succeeded doing something risky, it must be a good strategy. It ignores the thousands who failed.",
                posts: [
                    {
                        id: "c2_l2_p1",
                        headline: "College is a Scam",
                        content:
                            "Bill Gates dropped out and became a billionaire. Therefore, if you want to be rich, you should quit school immediately!",
                        type: "slop",
                        slop_reasons: ["Survivorship Bias"],
                        category: "biases",
                    },
                ],
            },
            level_3: {
                title: "The Investment Trap (Sunk Cost)",
                briefing:
                    "The 'Sunk Cost Fallacy' is the urge to keep doing something purely because you've already spent time or money on it. It prevents you from cutting your losses.",
                posts: [
                    {
                        id: "c2_l3_p1",
                        headline: "We Can't Stop Now",
                        content:
                            "This project has lost 5 million dollars and hasn't worked for 3 years. But we have to keep funding it, or else that money was wasted!",
                        type: "slop",
                        slop_reasons: ["Sunk Cost Fallacy"],
                        category: "biases",
                    },
                ],
            },
        },
    },

    campaign_3: {
        title: "Media Manipulation",
        description:
            "Advanced tactics used to derail conversations and trigger rage.",
        requirement: "campaign_2",
        levels: {
            level_1: {
                title: "The Deflection (Whataboutism)",
                briefing:
                    "'Whataboutism' is a defense mechanism. Instead of addressing a valid criticism, the author points the finger at someone else to distract you. It's the adult version of 'But he started it!'",
                posts: [
                    {
                        id: "c3_l1_p1",
                        headline: "Ignore the Leak",
                        content:
                            "Sure, this factory dumped toxic waste in the river. But what about that other factory in 1980? Why aren't you mad at them?",
                        type: "slop",
                        slop_reasons: ["Whataboutism", "Red Herring"],
                        category: "media_manipulation",
                    },
                ],
            },
            level_2: {
                title: "The Time Waster (Sealioning)",
                briefing:
                    "'Sealioning' is harassment disguised as politeness. The user asks endless, demanding questions not to learn, but to exhaust you until you give up. They are 'Just asking questions'.",
                posts: [
                    {
                        id: "c3_l2_p1",
                        headline: "Just Curious...",
                        content:
                            "I'm just trying to have a civil debate. Can you provide 20 peer-reviewed sources proving that water is wet? I need specific page numbers. Why are you getting mad?",
                        type: "slop",
                        slop_reasons: ["Sealioning"],
                        category: "media_manipulation",
                    },
                ],
            },
            level_3: {
                title: "The Firehose (Gish Gallop)",
                briefing:
                    "The 'Gish Gallop' is when someone dumps 50 weak arguments at once. It takes 5 seconds to say them, but 2 hours to debunk them. If you see a wall of text with too many rapid-fire claims, it's a trap.",
                posts: [
                    {
                        id: "c3_l3_p1",
                        headline: "100 Reasons Why",
                        content:
                            "The moon landing was fake because the flag waved, shadows were wrong, the camera was too clean, the rover was too small, the stars were missing, the...",
                        type: "slop",
                        slop_reasons: ["Gish Gallop"],
                        category: "media_manipulation",
                    },
                ],
            },
        },
    },
};
