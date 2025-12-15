export const campaign_level = {
    campaign_0: {
        title: "Orientation",
        description: "System calibration and interface training.",
        levels: {
            level_1: {
                title: "System Check",
                briefing:
                    "Welcome to Argumento. Before we begin real monitoring, we need to calibrate your judgment. \n\nTask: Identify a Verified Truth. If a post is factual and neutral, click [APPROVE].",
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
                title: "The First Filter",
                briefing:
                    "Good. Now let's test the rejection protocols. \n\nTask: You will see a post using 'Clickbait'—a tactic that hides information to force clicks. This is considered Slop. Click [REJECT] and tag it. For now the judging will be automatic due to the training.",
                posts: [
                    {
                        id: "tut_2",
                        headline: "You Won't Believe What This Dog Did!",
                        content:
                            "This golden retriever did the most shocking thing ever. Click here to see the video that doctors don't want you to see!",
                        type: "slop",
                        slop_reasons: ["Clickbait", "False Urgency"],
                        category: "manipulation",
                    },
                ],
            },
        },
    },
};
