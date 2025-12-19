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
                        id: "tut_1",
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
                        id: "tut_2",
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
        levels: {},
        requirement: "campaign_0",
    },
    campaign_2: {
        title: "Logical Fallacies 2",
        description: "The thing that bends the logic, no pun intended.",
        levels: {},
        requirement: "campaign_1",
    },
};
