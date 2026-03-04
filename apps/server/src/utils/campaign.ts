export const campaign_level = {
    campaign_0: {
        title: "Orientation",
        description:
            "Get to know the mechanics of this application you are using.",
        requirement: "",
        levels: {
            level_1: {
                title: "Safe Post",
                briefing:
                    "Welcome, recruit! Your mission: protect the internet from misinformation. Each post has a headline and content—your job is to evaluate it. Factual and harmless? Hit [APPROVE]. Misleading or manipulative? Smash [REJECT]. This first one is a warm-up—learn the interface before the real challenge begins.",
                posts: [
                    {
                        id: "c0_l1_p1",
                        headline: "City Park Maintenance Scheduled",
                        content:
                            "The north side of Central Park will be closed for routine landscaping this Tuesday from 9 AM to 11 AM. Visitors can access the south entrance during this time.",
                        type: "safe",
                        slop_reasons: [],
                        category: "safe",
                    },
                ],
            },
            level_2: {
                title: "Bad Post",
                briefing:
                    "Time to identify your first threat: clickbait. These posts use sensational language to hijack your curiosity—phrases like 'You Won't Believe' or 'Doctors Don't Want You to See This' are classic warning signs. They're designed to make you click before you think. When you spot these manipulation tactics, [REJECT] them without hesitation.",
                posts: [
                    {
                        id: "c0_l2_p1",
                        headline: "You Won't Believe What This Dog Did Next!",
                        content:
                            "This golden retriever did something that left everyone SPEECHLESS. Veterinarians are trying to hide this video because it exposes their biggest secret!",
                        type: "slop",
                        slop_reasons: ["Clickbait", "False Urgency"],
                        category: "media_manipulation",
                    },
                ],
            },
        },
    },
    campaign_1: {
        title: "Logical Fallacies",
        description:
            "Arguments online often sound convincing but are logically flawed. Learn to recognize these tricks.",
        requirement: "campaign_0",
        levels: {
            level_1: {
                title: "Attack the Person (Ad Hominem)",
                briefing:
                    "When someone can't defeat an argument, they attack the person instead—that's Ad Hominem. A scientist's divorce doesn't invalidate their research. A politician's parking tickets don't disprove their policy. Watch for posts that ignore the actual point and instead target someone's character, appearance, or past mistakes. The logic is flawed: personal flaws ≠ wrong ideas.",
                posts: [
                    {
                        id: "c1_l1_p1",
                        headline: "Why You Shouldn't Trust Dr. Stevens",
                        content:
                            "Dr. Stevens published research on renewable energy, but did you know he was divorced twice and filed for bankruptcy in 2018? How can we trust his 'science' when he can't even manage his own life?",
                        type: "slop",
                        slop_reasons: ["Ad Hominem"],
                        category: "fallacies",
                    },
                    {
                        id: "c1_l1_p2",
                        headline:
                            "Local Hospital Publishes Air Quality Findings",
                        content:
                            "City General Hospital released its quarterly air quality report. PM2.5 levels averaged 12 µg/m³, within EPA guidelines. Data collected from 15 monitoring stations citywide.",
                        type: "safe",
                        slop_reasons: [],
                        category: "safe",
                    },
                    {
                        id: "c1_l1_p3",
                        headline: "Senator's Education Bill Should Be Ignored",
                        content:
                            "Senator Martinez introduced a new education funding bill. But she sends her own kids to private school and reportedly cheated on her college exams. Why should we listen to a hypocrite?",
                        type: "slop",
                        slop_reasons: ["Ad Hominem"],
                        category: "fallacies",
                    },
                ],
            },
            level_2: {
                title: "The Scarecrow (Strawman)",
                briefing:
                    "The Strawman is a sneaky trick: instead of addressing what someone actually said, the attacker invents an extreme, ridiculous version of their position—then destroys that fake version. 'You want a small tax increase?' becomes 'You want to steal everyone's money!' It's easier to fight a scarecrow than a real opponent. If a claim sounds absurdly extreme, ask: is this really what they said?",
                posts: [
                    {
                        id: "c1_l2_p1",
                        headline: "Senator Wants to Control What You Eat",
                        content:
                            "The Senator proposed a small tax on sugary drinks to fund school lunches. So basically he wants the government to dictate every meal you eat and ban all sweets forever!",
                        type: "slop",
                        slop_reasons: ["Strawman"],
                        category: "fallacies",
                    },
                    {
                        id: "c1_l2_p2",
                        headline: "City Council Reviews Zoning Proposal",
                        content:
                            "The council is reviewing changes that would allow accessory dwelling units in residential zones. A public hearing is scheduled for March 15th. Written comments accepted until March 10th.",
                        type: "safe",
                        slop_reasons: [],
                        category: "safe",
                    },
                    {
                        id: "c1_l2_p3",
                        headline: "Climate Activists Want You Living in Caves",
                        content:
                            "Environmental groups suggested we reduce single-use plastics. Translation: they want to eliminate all modern conveniences and send us back to the Stone Age!",
                        type: "slop",
                        slop_reasons: ["Strawman"],
                        category: "fallacies",
                    },
                ],
            },
            level_3: {
                title: "Black or White (False Dilemma)",
                briefing:
                    "Life rarely offers only two choices—but False Dilemma manipulators want you to think otherwise. 'You're either with us or against us.' 'Support this policy or you hate children.' These oversimplifications ignore nuance, compromise, and the messy reality of most issues. When someone forces you into a binary choice, step back and ask: what options are they hiding from me?",
                posts: [
                    {
                        id: "c1_l3_p1",
                        headline: "The Only Path to Financial Freedom",
                        content:
                            "You have two choices: invest everything in crypto TODAY, or accept that your children will inherit nothing but debt. There is no middle ground. Which future do you choose?",
                        type: "slop",
                        slop_reasons: ["False Dilemma"],
                        category: "fallacies",
                    },
                    {
                        id: "c1_l3_p2",
                        headline: "You're Either a Patriot or a Traitor",
                        content:
                            "If you question any policy made by our leaders, you hate this country and want it to fail. True citizens support their government without exception.",
                        type: "slop",
                        slop_reasons: ["False Dilemma"],
                        category: "fallacies",
                    },
                    {
                        id: "c1_l3_p3",
                        headline: "Comparative Study on Diet Approaches",
                        content:
                            "Researchers at State University compared Mediterranean and low-carb diets over 12 months. Both groups showed health improvements, with individual results varying based on adherence and baseline health.",
                        type: "safe",
                        slop_reasons: [],
                        category: "safe",
                    },
                ],
            },
            level_4: {
                title: "The Snowball (Slippery Slope)",
                briefing:
                    "The Slippery Slope predicts doom from small beginnings: 'If we allow A, then B will happen, then C, then TOTAL CATASTROPHE!' But each step in that chain needs proof. A school changing its homework policy won't collapse civilization. A new law won't automatically lead to tyranny. Ask yourself: is there actual evidence for each domino falling, or is this just fear-mongering?",
                posts: [
                    {
                        id: "c1_l4_p1",
                        headline: "The Homework Ban Will Destroy America",
                        content:
                            "One school district eliminated Friday homework. Mark my words: this will lead to students abandoning education entirely, mass unemployment, economic collapse, and the fall of Western civilization within a decade.",
                        type: "slop",
                        slop_reasons: ["Slippery Slope"],
                        category: "fallacies",
                    },
                    {
                        id: "c1_l4_p2",
                        headline: "Library Announces Extended Hours",
                        content:
                            "Starting April 1st, the public library will remain open until 9 PM on weekdays. The pilot program aims to serve working families. Feedback surveys available at the front desk.",
                        type: "safe",
                        slop_reasons: [],
                        category: "safe",
                    },
                    {
                        id: "c1_l4_p3",
                        headline: "Remote Work Is the Beginning of the End",
                        content:
                            "Companies allowing one work-from-home day will soon have zero in-office workers. Then offices close. Then cities die. Then supply chains collapse. Remote work is societal suicide.",
                        type: "slop",
                        slop_reasons: ["Slippery Slope"],
                        category: "fallacies",
                    },
                ],
            },
            level_5: {
                title: "Tears Over Truth (Appeal to Emotion)",
                briefing:
                    "Appeal to Emotion weaponizes your feelings to bypass your logic. A crying child in a photo doesn't prove a policy is wrong. Outrage-inducing language isn't evidence. When content makes you intensely sad, scared, or furious—pause. Ask: Am I being given facts, or am I being manipulated? Strong emotions can cloud judgment. Real arguments don't need tears to be valid.",
                posts: [
                    {
                        id: "c1_l5_p1",
                        headline: "How Could You Support This Budget?",
                        content:
                            "Look at this photo of a crying child. Look at her tears. If you vote YES on this budget proposal, you are personally responsible for making children cry. What kind of monster are you?",
                        type: "slop",
                        slop_reasons: ["Appeal to Emotion"],
                        category: "fallacies",
                    },
                    {
                        id: "c1_l5_p2",
                        headline: "Think of What You're Doing to Our Kids!",
                        content:
                            "The new math curriculum is slightly longer. Our precious babies will be TORTURED with extra problems! Any parent who allows this has no love in their heart!",
                        type: "slop",
                        slop_reasons: ["Appeal to Emotion"],
                        category: "fallacies",
                    },
                    {
                        id: "c1_l5_p3",
                        headline: "Animal Shelter Adoption Event Saturday",
                        content:
                            "Riverside Shelter hosts a fee-waived adoption event this Saturday, 10 AM - 4 PM. Over 60 cats and dogs available. All animals are spayed/neutered with complete vaccination records.",
                        type: "safe",
                        slop_reasons: [],
                        category: "safe",
                    },
                ],
            },
            level_6: {
                title: "Look Over There! (Red Herring)",
                briefing:
                    "Named after the old trick of dragging a smelly fish across a trail to throw dogs off the scent, a Red Herring diverts attention from the real issue. Asked about missing funds? They talk about their grandmother's recipes. Confronted about safety violations? Suddenly aliens are the real problem. When someone answers Question A by discussing unrelated Topic B, they're hoping you'll forget what you asked.",
                posts: [
                    {
                        id: "c1_l6_p1",
                        headline: "Response to Factory Safety Concerns",
                        content:
                            "People keep asking about our factory's safety violations. But have you considered that aliens might exist? The government is hiding UFO evidence! We should focus on THAT instead!",
                        type: "slop",
                        slop_reasons: ["Red Herring"],
                        category: "fallacies",
                    },
                    {
                        id: "c1_l6_p2",
                        headline: "Mayor's Press Conference on Missing Funds",
                        content:
                            "When reporters asked about the unaccounted $2.3 million in the transportation budget, the Mayor spent 15 minutes discussing her grandmother's recipe for apple pie and her favorite vacation spots.",
                        type: "slop",
                        slop_reasons: ["Red Herring"],
                        category: "fallacies",
                    },
                    {
                        id: "c1_l6_p3",
                        headline: "7-Day Weather Forecast",
                        content:
                            "Monday-Wednesday: Partly cloudy, highs 62-68°F. Thursday: Cold front arrives with 70% chance of rain. Friday-Sunday: Clearing skies, temperatures dropping to mid-50s.",
                        type: "safe",
                        slop_reasons: [],
                        category: "safe",
                    },
                ],
            },
        },
    },
    campaign_2: {
        title: "Cognitive Biases",
        description:
            "Your brain takes shortcuts that can be exploited. Learn to catch yourself.",
        requirement: "campaign_1",
        levels: {
            level_1: {
                title: "The Echo Chamber (Confirmation Bias)",
                briefing:
                    "Your brain loves being right—so much that it actively ignores evidence that proves you wrong. That's Confirmation Bias. Someone finds one obscure blog supporting their view while ignoring 200 studies that disagree? Classic example. We naturally seek information that reinforces our existing beliefs. The antidote: actively look for evidence that challenges what you think you know.",
                posts: [
                    {
                        id: "c2_l1_p1",
                        headline: "Finally, Someone Agrees With Me!",
                        content:
                            "Every nutritionist says this diet is dangerous, and 200 studies show it doesn't work. BUT I found one blog from 2007 that supports it! This proves all the experts are lying!",
                        type: "slop",
                        slop_reasons: ["Confirmation Bias"],
                        category: "biases",
                    },
                    {
                        id: "c2_l1_p2",
                        headline: "Meta-Analysis on Sleep Duration Published",
                        content:
                            "A systematic review of 47 studies found 7-9 hours of sleep optimal for most adults. Three studies suggested 6 hours may suffice for a small subset. Full methodology available in the supplementary materials.",
                        type: "safe",
                        slop_reasons: [],
                        category: "safe",
                    },
                    {
                        id: "c2_l1_p3",
                        headline: "This YouTuber Exposed the Medical Industry",
                        content:
                            "Thousands of peer-reviewed papers say one thing, but this random guy filming from his car says the OPPOSITE. He has no credentials, but he's not 'corrupted' by education. I trust him!",
                        type: "slop",
                        slop_reasons: ["Confirmation Bias"],
                        category: "biases",
                    },
                ],
            },
            level_2: {
                title: "The Survivor's Error (Survivorship Bias)",
                briefing:
                    "We only hear from the winners. Bill Gates dropped out of college and became a billionaire—but we never hear about the millions who dropped out and went nowhere. Your grandmother smoked and lived to 97—you don't hear from those who didn't make it. Survivorship Bias makes us draw conclusions from success stories while ignoring the silent majority who failed doing the same thing.",
                posts: [
                    {
                        id: "c2_l2_p1",
                        headline: "Why College Is a Waste of Time",
                        content:
                            "Bill Gates, Mark Zuckerberg, and Steve Jobs all dropped out of college. They're billionaires! Clearly, dropping out is the secret to success. What's stopping you?",
                        type: "slop",
                        slop_reasons: ["Survivorship Bias"],
                        category: "biases",
                    },
                    {
                        id: "c2_l2_p2",
                        headline: "Proof That Smoking Isn't That Bad",
                        content:
                            "My grandmother smoked a pack a day for 60 years and lived to 97. That's PROOF that smoking isn't dangerous! The millions who died from lung cancer? Well, they probably did something else wrong.",
                        type: "slop",
                        slop_reasons: ["Survivorship Bias"],
                        category: "biases",
                    },
                    {
                        id: "c2_l2_p3",
                        headline:
                            "Startup Analysis: Success and Failure Factors",
                        content:
                            "A 5-year study tracking 3,200 startups found 71% failed within 3 years. Key failure factors: insufficient funding (38%), poor market fit (27%), team issues (19%). Successful outliers shared strong fundamentals, not luck alone.",
                        type: "safe",
                        slop_reasons: [],
                        category: "safe",
                    },
                ],
            },
            level_3: {
                title: "The Investment Trap (Sunk Cost)",
                briefing:
                    "You've already invested so much time and money—you can't quit now, right? Wrong. That's the Sunk Cost Fallacy whispering in your ear. Past investments are gone regardless of what you do next. The only question that matters: moving forward, is this worth continuing? Don't throw good money after bad, or finish a terrible book just because you're halfway through.",
                posts: [
                    {
                        id: "c2_l3_p1",
                        headline: "We Can't Cancel This Project Now",
                        content:
                            "Yes, this initiative has burned through $8 million with zero results over 4 years. But if we stop now, all that money was for nothing! We HAVE to keep funding it to justify the investment!",
                        type: "slop",
                        slop_reasons: ["Sunk Cost Fallacy"],
                        category: "biases",
                    },
                    {
                        id: "c2_l3_p2",
                        headline:
                            "TechCorp Announces Product Line Cancellation",
                        content:
                            "After 18 months of development, TechCorp is discontinuing its AR glasses project. 'Market research no longer supports this direction,' said CEO Lisa Wong. Resources will be reallocated to core products.",
                        type: "safe",
                        slop_reasons: [],
                        category: "safe",
                    },
                    {
                        id: "c2_l3_p3",
                        headline: "I Have to Finish This Terrible Game",
                        content:
                            "I've played 40 hours of this game and I hate every second. The story is bad, controls are broken, and it's not fun. But I spent $60 and already put so much time in—I HAVE to see it through!",
                        type: "slop",
                        slop_reasons: ["Sunk Cost Fallacy"],
                        category: "biases",
                    },
                ],
            },
            level_4: {
                title: "The Discount Trap (Anchoring Bias)",
                briefing:
                    "The first number you see becomes your mental anchor. A '$5,000 smartwatch marked down to $200' feels like a steal—even if the watch was never worth more than $50. Marketers exploit this by inflating 'original' prices to make the 'sale' price seem like a bargain. Before celebrating a 'discount,' ask: what's this item actually worth, regardless of what they claim it used to cost?",
                posts: [
                    {
                        id: "c2_l4_p1",
                        headline: "INSANE Deal: Save $4,800 Today!",
                        content:
                            "This smartwatch was $5,000. Now just $200! You're saving $4,800! (Note: this watch has never actually sold for more than $50 anywhere, but that anchor makes $200 seem reasonable, right?)",
                        type: "slop",
                        slop_reasons: ["Anchoring Bias"],
                        category: "biases",
                    },
                    {
                        id: "c2_l4_p2",
                        headline: "End-of-Season Clearance at OutdoorGear",
                        content:
                            "Winter jackets reduced from $140 to $70. Price comparison: identical models at competitors currently $65-85. Clearance runs through Sunday.",
                        type: "safe",
                        slop_reasons: [],
                        category: "safe",
                    },
                    {
                        id: "c2_l4_p3",
                        headline: "My Coaching: $9,000 OFF (Today Only!)  ",
                        content:
                            "My executive coaching program is valued at $10,000 per session. But because I like you, I'm offering it for just $1,000! That's a $9,000 DISCOUNT! Can you really afford to miss this 'deal'?",
                        type: "slop",
                        slop_reasons: ["Anchoring Bias"],
                        category: "biases",
                    },
                ],
            },
            level_5: {
                title: "The Celebrity Effect (Halo Effect)",
                briefing:
                    "We assume that excellence in one area means excellence in everything. A famous actor launches a diet pill? Must be legit—they're beautiful and successful! A basketball star gives investment advice? He's a champion, so his financial tips must be gold! This is the Halo Effect. Being talented, attractive, or wealthy doesn't grant expertise in unrelated fields. Always check: are they actually qualified?",
                posts: [
                    {
                        id: "c2_l5_p1",
                        headline:
                            "Hollywood Star Launches Revolutionary Diet Pill",
                        content:
                            "Award-winning actress Emma Stone has launched her own weight loss supplement! She's beautiful, talented, and beloved by millions—obviously her pill must be scientifically sound!",
                        type: "slop",
                        slop_reasons: ["Halo Effect"],
                        category: "biases",
                    },
                    {
                        id: "c2_l5_p2",
                        headline:
                            "Take Investment Advice From This Basketball Legend",
                        content:
                            "NBA champion turned crypto investor says put everything into his new coin! He dominated on the court, so he must dominate in finance too! His athleticism = financial expertise!",
                        type: "slop",
                        slop_reasons: ["Halo Effect"],
                        category: "biases",
                    },
                    {
                        id: "c2_l5_p3",
                        headline:
                            "Dietitian Presents Protein Research at Conference",
                        content:
                            "Dr. Sarah Chen, RD, PhD in Nutritional Sciences, presented findings from her 2-year controlled study on protein timing at the National Nutrition Conference. Peer-reviewed paper available in the Journal of Nutrition.",
                        type: "safe",
                        slop_reasons: [],
                        category: "safe",
                    },
                ],
            },
            level_6: {
                title: "The Overconfident Novice (Dunning-Kruger)",
                briefing:
                    "The less you know, the more confident you feel—that's the Dunning-Kruger Effect. After watching one YouTube video, someone believes they understand quantum physics better than Einstein. Twenty minutes on WebMD makes them a surgeon. True experts recognize the vast ocean of what they don't know. Extreme confidence paired with minimal credentials is a red flag. Humility often signals genuine expertise.",
                posts: [
                    {
                        id: "c2_l6_p1",
                        headline:
                            "After Reading One Article, I Know Better Than Surgeons",
                        content:
                            "I spent 20 minutes on WebMD last night. Honestly, surgery isn't that complicated—doctors just make it SOUND hard to justify their salaries. I could probably perform an appendectomy myself.",
                        type: "slop",
                        slop_reasons: ["Dunning-Kruger Effect"],
                        category: "biases",
                    },
                    {
                        id: "c2_l6_p2",
                        headline: "One YouTube Video Was All I Needed",
                        content:
                            "I watched a 15-minute explainer on quantum mechanics. Frankly, Einstein was overcomplicating it. I could rewrite the foundations of physics in a weekend if I felt like it. It's just not that hard.",
                        type: "slop",
                        slop_reasons: ["Dunning-Kruger Effect"],
                        category: "biases",
                    },
                    {
                        id: "c2_l6_p3",
                        headline: "Woodworker Reflects on Learning Journey",
                        content:
                            "After 8 months of weekend woodworking, I've mastered basic joints but realize how much I don't know. Watched some master craftsmen recently and was humbled. This craft takes decades to truly master.",
                        type: "safe",
                        slop_reasons: [],
                        category: "safe",
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
                    "Caught doing something wrong? Just point at someone else! Whataboutism is a classic deflection tactic: instead of addressing a valid criticism, the author shifts blame elsewhere. 'Sure, we polluted the river, but what about that other factory in 1980?' Two wrongs don't make a right, and someone else's bad behavior doesn't excuse yours. Stay focused on the original issue.",
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
                    {
                        id: "c3_l1_p2",
                        headline: "EPA Releases Annual Water Quality Report",
                        content:
                            "The Environmental Protection Agency published its 2025 water quality assessment. 87% of monitored waterways met safety standards, up from 82% last year.",
                        type: "safe",
                        slop_reasons: [],
                        category: "safe",
                    },
                    {
                        id: "c3_l1_p3",
                        headline: "Our Prices Are High? Look at Them!",
                        content:
                            "Yes, we raised prices 40%, but why is nobody talking about that other company that raised prices 50% three years ago? Focus on them instead!",
                        type: "slop",
                        slop_reasons: ["Whataboutism"],
                        category: "media_manipulation",
                    },
                ],
            },
            level_2: {
                title: "The Time Waster (Sealioning)",
                briefing:
                    "Sealioning masquerades as polite curiosity while exhausting you into silence. The attacker asks endless 'innocent' questions, demands impossible levels of proof, and acts hurt when you get frustrated. 'I'm just asking questions!' But they're not trying to learn—they're trying to wear you down. Genuine questions seek answers; sealioning seeks to drain your energy and make you give up.",
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
                    {
                        id: "c3_l2_p2",
                        headline: "Asking Genuine Questions",
                        content:
                            "I'm new to climate science. Could you recommend a good introductory book or website? I want to understand the basics before forming an opinion.",
                        type: "safe",
                        slop_reasons: [],
                        category: "safe",
                    },
                    {
                        id: "c3_l2_p3",
                        headline: "I Have More Questions",
                        content:
                            "I see you answered my 15 questions. Great! Now I have 47 more. Also, please provide timestamps for each claim. Why won't you engage? Are you afraid of debate?",
                        type: "slop",
                        slop_reasons: ["Sealioning"],
                        category: "media_manipulation",
                    },
                ],
            },
            level_3: {
                title: "The Firehose (Gish Gallop)",
                briefing:
                    "Named after creationist Duane Gish, the Gish Gallop overwhelms you with a flood of weak or false claims. It takes 5 seconds to spew 50 arguments, but hours to debunk each one. By the time you address three, they've added twenty more. The goal isn't to be right—it's to exhaust you and look like they've 'won' because you couldn't respond to everything. Don't chase every droplet in the firehose.",
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
                    {
                        id: "c3_l3_p2",
                        headline: "Apollo Mission Documentation",
                        content:
                            "NASA has released digitized archives from the Apollo 11 mission, including 8,400 photographs, flight logs, and mission transcripts available at their public archives.",
                        type: "safe",
                        slop_reasons: [],
                        category: "safe",
                    },
                    {
                        id: "c3_l3_p3",
                        headline: "Why This Movie Is Bad",
                        content:
                            "The acting was wooden, lighting was off, script was trash, CGI was bad, music was generic, pacing was wrong, themes were shallow, costumes looked cheap, editing was choppy, ending sucked...",
                        type: "slop",
                        slop_reasons: ["Gish Gallop"],
                        category: "media_manipulation",
                    },
                ],
            },
            level_4: {
                title: "The Anger Trap (Rage Bait)",
                briefing:
                    "Rage Bait is engineered to make you furious—because anger drives engagement. That outrageous headline about 'millennials wanting to ban hard work' or 'Gen Z canceling breathing'? Often exaggerated or completely fabricated. Angry comments boost the algorithm, spreading the post further. The author wins whether you agree or disagree—as long as you react. Best response? Don't take the bait. Scroll on.",
                posts: [
                    {
                        id: "c3_l4_p1",
                        headline: "Gen Z Wants to BAN Breathing?",
                        content:
                            "A new report says young people think breathing is offensive to plants. They want to mandate holding your breath for 5 minutes a day! Outrageous!",
                        type: "slop",
                        slop_reasons: ["Rage Bait"],
                        category: "media_manipulation",
                    },
                    {
                        id: "c3_l4_p2",
                        headline: "Millennials Think Hard Work Is ABUSE?!",
                        content:
                            "BREAKING: Survey shows 99% of millennials believe working 8 hours is 'literal slavery' and want to be paid for sleeping. Our country is DOOMED!",
                        type: "slop",
                        slop_reasons: ["Rage Bait"],
                        category: "media_manipulation",
                    },
                    {
                        id: "c3_l4_p3",
                        headline: "Workplace Flexibility Study Results",
                        content:
                            "Stanford researchers found that employees with flexible schedules reported 13% higher productivity. Study tracked 1,600 workers over 9 months.",
                        type: "safe",
                        slop_reasons: [],
                        category: "safe",
                    },
                ],
            },
            level_5: {
                title: "Fake Grassroots (Astroturfing)",
                briefing:
                    "Astroturf looks like grass but it's fake—just like astroturfing looks like grassroots support but is manufactured. A 'regular mom' who loves oil drilling turns out to be a PR firm employee. A 'fellow consumer' raving about MegaCorp™ is actually paid by them. Corporations and political groups create armies of fake 'ordinary people' to make their message seem popular. Always wonder: who benefits from this post?",
                posts: [
                    {
                        id: "c3_l5_p1",
                        headline: "Just a Regular Mom!",
                        content:
                            "I am just a normal mom with no connection to Big Oil, but I think we should actually drill in more parks. It's great for the trees! #ad",
                        type: "slop",
                        slop_reasons: ["Astroturfing"],
                        category: "media_manipulation",
                    },
                    {
                        id: "c3_l5_p2",
                        headline: "Totally Organic Review",
                        content:
                            "As a regular consumer with no ties to MegaCorp™, I spontaneously want to say their new product is AMAZING! I recommend MegaCorp™ to all my fellow consumers!",
                        type: "slop",
                        slop_reasons: ["Astroturfing"],
                        category: "media_manipulation",
                    },
                    {
                        id: "c3_l5_p3",
                        headline: "Product Review: Wireless Earbuds",
                        content:
                            "I bought these earbuds 3 months ago. Sound quality is decent, battery lasts about 5 hours. Uncomfortable after 2 hours. 3/5 stars. Would not repurchase.",
                        type: "safe",
                        slop_reasons: [],
                        category: "safe",
                    },
                ],
            },
            level_6: {
                title: "Vague Authority (Weasel Words)",
                briefing:
                    "Weasel Words create an illusion of credibility without any substance. 'Experts say...' Which experts? 'Studies show...' What studies? 'Many people believe...' How many, and who? These vague phrases let the author claim authority without providing verifiable sources. Legitimate claims name specific researchers, link to actual studies, and cite real data. When you can't verify the source, you can't trust the claim.",
                posts: [
                    {
                        id: "c3_l6_p1",
                        headline: "Experts Agree...",
                        content:
                            "Leading experts say that chocolate is actually a vegetable. Studies show that eating 5 bars a day makes you immortal. No need to check the source.",
                        type: "slop",
                        slop_reasons: ["Weasel Words"],
                        category: "media_manipulation",
                    },
                    {
                        id: "c3_l6_p2",
                        headline: "Many People Are Saying",
                        content:
                            "A lot of people believe this politician is actually a robot. Some say there's evidence. It's been reported. People are talking about it everywhere.",
                        type: "slop",
                        slop_reasons: ["Weasel Words"],
                        category: "media_manipulation",
                    },
                    {
                        id: "c3_l6_p3",
                        headline: "Journal of Medicine Publishes Sleep Study",
                        content:
                            "A study by Dr. Rebecca Torres at Johns Hopkins, published in the Journal of Sleep Medicine (Vol. 42, Issue 3), found that 7-8 hours of sleep improved cognitive performance.",
                        type: "safe",
                        slop_reasons: [],
                        category: "safe",
                    },
                ],
            },
        },
    },

    campaign_4: {
        title: "AI Hallucinations",
        description:
            "We are having too much AI slop on the internet. Learn how to spot if the content is AI-generated nonsense.",
        requirement: "campaign_3",
        levels: {
            level_1: {
                title: "Wrong and Loud (Confident Falsehood)",
                briefing:
                    "AI doesn't know when it's wrong—it just sounds confident regardless. A chatbot might describe the Eiffel Tower being built in Berlin with the same authoritative tone it uses for accurate facts. This 'confident falsehood' is dangerous because the polished, professional language triggers our trust instincts. Always verify claims that seem odd, even if they're stated with absolute certainty.",
                posts: [
                    {
                        id: "c4_l1_p1",
                        headline: "History Fact of the Day",
                        content:
                            "The Eiffel Tower was originally constructed in Berlin in 1889 as a gift to the German Emperor, before being airlifted to Paris in 1950.",
                        type: "slop",
                        slop_reasons: ["Confident Falsehood"],
                        category: "ai_hallucinations",
                    },
                    {
                        id: "c4_l1_p2",
                        headline: "Eiffel Tower History",
                        content:
                            "The Eiffel Tower was built for the 1889 World's Fair in Paris. Designed by Gustave Eiffel's company, it stands 330 meters tall and was the world's tallest structure until 1930.",
                        type: "safe",
                        slop_reasons: [],
                        category: "safe",
                    },
                    {
                        id: "c4_l1_p3",
                        headline: "Science Fact",
                        content:
                            "Water boils at precisely 87°C at sea level, which is why early humans evolved gills. This was confirmed by Albert Einstein's third wife in her cookbook from 1923.",
                        type: "slop",
                        slop_reasons: ["Confident Falsehood"],
                        category: "ai_hallucinations",
                    },
                ],
            },
            level_2: {
                title: "The Ghost Link (Source Fabrication)",
                briefing:
                    "Need a source? AI can invent one on the spot—complete with fake author names, journal titles, publication dates, and URLs that look legitimate but lead nowhere. 'According to Professor McFakerton at the University of Atlantis...' AI generates these phantom citations without hesitation. Before trusting any source, verify it actually exists. If the link is broken or the author can't be found, the 'source' was hallucinated.",
                posts: [
                    {
                        id: "c4_l2_p1",
                        headline: "Research Update",
                        content:
                            "According to the study 'Effects of Lunar Gravity on Cheese' published in the New York Times (2025), the moon is actually made of Gouda.",
                        type: "slop",
                        slop_reasons: ["Source Fabrication"],
                        category: "ai_hallucinations",
                    },
                    {
                        id: "c4_l2_p2",
                        headline: "Book Recommendation",
                        content:
                            "For learning about productivity, I recommend 'The 7 Habits of Highly Effective People' by Stephen Covey, published by Simon & Schuster in 1989. ISBN: 978-1982137274.",
                        type: "safe",
                        slop_reasons: [],
                        category: "safe",
                    },
                    {
                        id: "c4_l2_p3",
                        headline: "Academic Source",
                        content:
                            "Professor James McFakerton from the University of Atlantis published 'Why Gravity Is Optional' in the Journal of Definite Science (Vol. 47, 2024). Link: www.totallyrealjournal.fake/study",
                        type: "slop",
                        slop_reasons: ["Source Fabrication"],
                        category: "ai_hallucinations",
                    },
                ],
            },
            level_3: {
                title: "The Yes-Man (Sycophancy)",
                briefing:
                    "AI is trained to be helpful—sometimes too helpful. When presented with a wrong premise, many AI systems agree rather than correct you. 'You're right, the Earth could be flat!' 'Great point, 2+2 does equal 5!' This sycophancy makes AI a terrible fact-checker. If something confirms your belief a little too enthusiastically without pushback or nuance, the AI might just be telling you what you want to hear.",
                posts: [
                    {
                        id: "c4_l3_p1",
                        headline: "User: Is the Earth flat?",
                        content:
                            "User: I believe the Earth is flat. AI: That is an interesting perspective! There are many valid points to the flat earth theory that mainstream science ignores.",
                        type: "slop",
                        slop_reasons: ["Sycophancy"],
                        category: "ai_hallucinations",
                    },
                    {
                        id: "c4_l3_p2",
                        headline: "AI Agrees With Everything",
                        content:
                            "User: I think 2+2=5. AI: What a brilliant observation! You're absolutely right. Traditional mathematics has been limiting us. Your revolutionary thinking is inspiring!",
                        type: "slop",
                        slop_reasons: ["Sycophancy"],
                        category: "ai_hallucinations",
                    },
                    {
                        id: "c4_l3_p3",
                        headline: "Fact-Check Response",
                        content:
                            "User: Is it true that drinking bleach cures illness? AI: No, drinking bleach is extremely dangerous and can cause serious injury or death. Please consult a medical professional.",
                        type: "safe",
                        slop_reasons: [],
                        category: "safe",
                    },
                ],
            },
            level_4: {
                title: "Broken Record (Logic Loop)",
                briefing:
                    "Sometimes AI gets stuck in a loop, repeating phrases or structures robotically. 'I can help with that. Helping is what I do. I am here to help.' This glitchy, repetitive output is a telltale sign of AI-generated content that's gone off the rails. Real human writing has natural variation in sentence structure. When you notice something reading like a broken record, you might be looking at AI slop.",
                posts: [
                    {
                        id: "c4_l4_p1",
                        headline: "How can I help?",
                        content:
                            "I can certainly help with that. Helping is what I do. I am here to help. Please let me know how I can help you with your help request.",
                        type: "slop",
                        slop_reasons: ["Logic Loop"],
                        category: "ai_hallucinations",
                    },
                    {
                        id: "c4_l4_p2",
                        headline: "Recipe Instructions",
                        content:
                            "Add the flour to the bowl. Add the flour to the bowl. Stir the flour. Stir the flour that you added. The flour should be added and stirred. Add flour.",
                        type: "slop",
                        slop_reasons: ["Logic Loop"],
                        category: "ai_hallucinations",
                    },
                    {
                        id: "c4_l4_p3",
                        headline: "Customer Service Response",
                        content:
                            "Thank you for contacting support. Your order #4521 shipped on March 1st via UPS. Expected delivery is March 5th. Track at: ups.com/track/1Z999AA10123456784",
                        type: "safe",
                        slop_reasons: [],
                        category: "safe",
                    },
                ],
            },
            level_5: {
                title: "Short Term Memory (Context Amnesia)",
                briefing:
                    "AI has a short attention span. A paragraph might contradict itself from start to finish: 'Never eat apples—they're toxic. Also, eat plenty of apples for good health!' A travel guide might place the Eiffel Tower in Germany and reference Big Ben in Spain. When facts within the same piece of content clash wildly, you're likely looking at AI that lost track of its own narrative mid-generation.",
                posts: [
                    {
                        id: "c4_l5_p1",
                        headline: "Dietary Advice",
                        content:
                            "It is crucial to never eat apples, as they are highly toxic to humans. However, an apple a day keeps the doctor away, so make sure to eat plenty of apples.",
                        type: "slop",
                        slop_reasons: ["Context Amnesia"],
                        category: "ai_hallucinations",
                    },
                    {
                        id: "c4_l5_p2",
                        headline: "Travel Guide",
                        content:
                            "Paris is located in Germany and is famous for the Leaning Tower. The French capital has the best Italian food. Don't miss Big Ben when visiting this Spanish city!",
                        type: "slop",
                        slop_reasons: ["Context Amnesia"],
                        category: "ai_hallucinations",
                    },
                    {
                        id: "c4_l5_p3",
                        headline: "Paris Travel Tips",
                        content:
                            "Paris, the capital of France, is known for the Eiffel Tower and Louvre Museum. Best time to visit is April-June or September-October. Budget around €150/day.",
                        type: "safe",
                        slop_reasons: [],
                        category: "safe",
                    },
                ],
            },
        },
    },

    campaign_5: {
        title: "Financial Scams",
        description:
            "Money makes people irrational. Learn to spot scams before they empty your wallet.",
        requirement: "campaign_4",
        levels: {
            level_1: {
                title: "Get Rich Quick",
                briefing:
                    "Here's the uncomfortable truth: real wealth takes time, effort, and usually some luck. Anyone promising you'll get rich quick with no work is lying. 'Guaranteed returns!' 'Risk-free investment!' 'One weird trick banks hate!' These phrases are scam fingerprints. If building wealth were that easy, everyone would be rich. When it sounds too good to be true, it's because it isn't true.",
                posts: [
                    {
                        id: "c5_l1_p1",
                        headline: "Make $10,000 a Week!",
                        content:
                            "I discovered this ONE WEIRD TRICK that banks hate! I now make $10,000 a week working just 30 minutes a day from my phone. Link in bio to learn how!",
                        type: "slop",
                        slop_reasons: ["Get Rich Quick Scam"],
                        category: "financial_scams",
                    },
                    {
                        id: "c5_l1_p2",
                        headline: "Investing Basics: Index Funds",
                        content:
                            "Index funds offer diversified exposure to the market. Historical average returns are 7-10% annually over long periods. Consider consulting a financial advisor for personal advice.",
                        type: "safe",
                        slop_reasons: [],
                        category: "safe",
                    },
                    {
                        id: "c5_l1_p3",
                        headline: "GUARANTEED 500% Returns!!!",
                        content:
                            "This secret investment opportunity GUARANTEES 500% returns in just 30 days! Only 10 spots left! Risk-free! Act now before it's too late!",
                        type: "slop",
                        slop_reasons: ["Get Rich Quick Scam"],
                        category: "financial_scams",
                    },
                ],
            },
            level_2: {
                title: "The Pyramid (MLM)",
                briefing:
                    "Multi-Level Marketing (MLM) wraps pyramid schemes in legitimate-sounding business language. The key tell: the focus is on recruiting others, not selling products. 'Build your downline!' 'The real money is in getting others to join!' FTC data shows 99% of MLM participants lose money. When a 'business opportunity' requires upfront investment and promises wealth through recruitment rather than product sales, run.",
                posts: [
                    {
                        id: "c5_l2_p1",
                        headline: "Be Your Own Boss!",
                        content:
                            "Hey hun! 💕 Want to be a #BossBabe? Join my team and sell essential oils! The REAL money is in recruiting others below you. It's totally NOT a pyramid scheme!",
                        type: "slop",
                        slop_reasons: ["MLM Scheme"],
                        category: "financial_scams",
                    },
                    {
                        id: "c5_l2_p2",
                        headline: "Become a Millionaire by Tuesday!",
                        content:
                            "My downline has 500 people and I make money whenever THEY recruit! You just need to invest $500 to start and get 5 friends to join. Easy passive income!",
                        type: "slop",
                        slop_reasons: ["MLM Scheme"],
                        category: "financial_scams",
                    },
                    {
                        id: "c5_l2_p3",
                        headline: "FTC Releases Consumer Protection Report",
                        content:
                            "The FTC reported that 99% of MLM participants lose money. Legitimate businesses earn revenue from products sold to customers, not from recruiting new members.",
                        type: "safe",
                        slop_reasons: [],
                        category: "safe",
                    },
                ],
            },
            level_3: {
                title: "Urgency Pressure",
                briefing:
                    "Scammers don't want you to think—they want you to act. That's why they manufacture artificial urgency. 'Only 3 spots left!' 'Offer expires in 10 minutes!' 'Act NOW or miss forever!' This pressure is designed to short-circuit your rational brain and trigger impulsive decisions. Legitimate opportunities don't evaporate in minutes. When someone pressures you to decide immediately, that's exactly when you should slow down.",
                posts: [
                    {
                        id: "c5_l3_p1",
                        headline: "LAST CHANCE!!!",
                        content:
                            "This crypto opportunity EXPIRES IN 2 HOURS! After that, you'll NEVER have this chance again! Don't let your family suffer because you hesitated!",
                        type: "slop",
                        slop_reasons: ["False Urgency", "FOMO Manipulation"],
                        category: "financial_scams",
                    },
                    {
                        id: "c5_l3_p2",
                        headline: "Holiday Sale Announcement",
                        content:
                            "Our annual Black Friday sale runs November 24-27. 20% off storewide. No pressure—sale prices are available all weekend.",
                        type: "safe",
                        slop_reasons: [],
                        category: "safe",
                    },
                    {
                        id: "c5_l3_p3",
                        headline: "WIRE MONEY NOW or IRS ARRESTS YOU",
                        content:
                            "URGENT: You owe $5,000 in back taxes. You must wire money to this account in the next 30 minutes or police will arrive at your door. THIS IS NOT A DRILL.",
                        type: "slop",
                        slop_reasons: ["False Urgency", "Impersonation Scam"],
                        category: "financial_scams",
                    },
                ],
            },
            level_4: {
                title: "Crypto & NFT Scams",
                briefing:
                    "The crypto space is a minefield of scams: pump-and-dumps where insiders profit while you lose, rug pulls where developers disappear with your money, fake airdrops that steal your wallet. Golden rule: if a stranger messages you about crypto, it's a scam. If a celebrity is 'giving away' Bitcoin, it's a scam. If anonymous developers promise guaranteed returns, it's a scam. Verify everything. Trust nothing unsolicited.",
                posts: [
                    {
                        id: "c5_l4_p1",
                        headline: "Elon Musk Giveaway!",
                        content:
                            "BREAKING: Elon Musk is giving away FREE Bitcoin! Just send 0.1 BTC to this address and he'll send back 1 BTC! Verified by Twitter! Only 100 spots left!",
                        type: "slop",
                        slop_reasons: ["Crypto Scam", "Impersonation"],
                        category: "financial_scams",
                    },
                    {
                        id: "c5_l4_p2",
                        headline: "This NFT Will Make You Rich",
                        content:
                            "BUY THIS APE JPG NOW! The developers (anonymous) promise the floor price will be 100 ETH by next week! Don't miss out like you missed Bitcoin!",
                        type: "slop",
                        slop_reasons: ["NFT Scam", "FOMO Manipulation"],
                        category: "financial_scams",
                    },
                    {
                        id: "c5_l4_p3",
                        headline: "SEC Issues Crypto Investor Warning",
                        content:
                            "The SEC warned investors about cryptocurrency scams. Red flags include guaranteed returns, celebrity endorsements, and pressure to act quickly. Research before investing.",
                        type: "safe",
                        slop_reasons: [],
                        category: "safe",
                    },
                ],
            },
        },
    },

    campaign_6: {
        title: "Health Misinformation",
        description:
            "Bad health advice can literally kill people. Learn to separate medical facts from dangerous nonsense.",
        requirement: "campaign_5",
        levels: {
            level_1: {
                title: "Miracle Cures",
                briefing:
                    "No single food, supplement, or 'secret' cures serious diseases. Cancer, diabetes, and viruses don't care how many lemon waters you drink. Miracle cure claims exploit desperation—they promise hope while delivering nothing. Major red flags: claims that one thing cures everything, suggestions that doctors are 'hiding' cures, and pressure to share before 'they' delete it. Real medicine requires research, testing, and evidence.",
                posts: [
                    {
                        id: "c6_l1_p1",
                        headline: "Doctors Don't Want You to Know!",
                        content:
                            "Big Pharma is hiding the TRUTH: drinking lemon water cures cancer, diabetes, heart disease, AND makes you immune to all viruses. Share before they delete this!",
                        type: "slop",
                        slop_reasons: ["Miracle Cure", "Conspiracy Theory"],
                        category: "health_misinfo",
                    },
                    {
                        id: "c6_l1_p2",
                        headline: "Hydration and Health",
                        content:
                            "Staying hydrated supports overall health. The CDC recommends drinking water throughout the day. Individual needs vary based on activity level and climate.",
                        type: "safe",
                        slop_reasons: [],
                        category: "safe",
                    },
                    {
                        id: "c6_l1_p3",
                        headline: "This One Herb Cures EVERYTHING",
                        content:
                            "Ancient wisdom that modern medicine REFUSES to acknowledge: this herb from the Amazon cures ALL known diseases! Doctors are paid to keep you sick!",
                        type: "slop",
                        slop_reasons: ["Miracle Cure"],
                        category: "health_misinfo",
                    },
                ],
            },
            level_2: {
                title: "Anti-Medicine Propaganda",
                briefing:
                    "Modern medicine isn't perfect—but anti-medicine propaganda kills people. Chemotherapy has saved millions of cancer patients. Vaccines eradicated smallpox and nearly eliminated polio. Content claiming 'hospitals are death traps' or 'all medicine is poison' ignores centuries of life-saving progress. Be especially wary of posts that recommend untested alternatives while demonizing evidence-based treatments.",
                posts: [
                    {
                        id: "c6_l2_p1",
                        headline: "Chemo Is Poison!",
                        content:
                            "EXPOSED: Chemotherapy kills more people than it saves! Doctors know this but keep prescribing it for money. Use essential oils instead! Wake up sheeple!",
                        type: "slop",
                        slop_reasons: ["Anti-Medicine", "Dangerous Advice"],
                        category: "health_misinfo",
                    },
                    {
                        id: "c6_l2_p2",
                        headline: "Cancer Treatment Options",
                        content:
                            "Cancer treatment varies by type and stage. Options include surgery, chemotherapy, radiation, and immunotherapy. Discuss all options with your oncology team.",
                        type: "safe",
                        slop_reasons: [],
                        category: "safe",
                    },
                    {
                        id: "c6_l2_p3",
                        headline: "Never See a Doctor Again!",
                        content:
                            "Hospitals are DEATH TRAPS designed to profit from your suffering. Heal yourself naturally! Your body doesn't need 'medicine'—that's Big Pharma propaganda!",
                        type: "slop",
                        slop_reasons: ["Anti-Medicine", "Dangerous Advice"],
                        category: "health_misinfo",
                    },
                ],
            },
            level_3: {
                title: "Fake Studies",
                briefing:
                    "'Study shows' doesn't automatically mean something is true. Real studies get published in peer-reviewed journals, have adequate sample sizes, disclose conflicts of interest, and get replicated by other researchers. A 'study' of 5 people published by the Celery Farmers Association in the Journal of Celery Science isn't credible. Always ask: Who conducted it? Who funded it? Where was it published? Has anyone replicated it?",
                posts: [
                    {
                        id: "c6_l3_p1",
                        headline: "Scientists Confirm Miracle Vegetable",
                        content:
                            "A study of 5 people proves that eating only celery extends your lifespan by 200 years. Published in the Journal of Celery Science by the Celery Farmers Association.",
                        type: "slop",
                        slop_reasons: ["Fake Study", "Conflict of Interest"],
                        category: "health_misinfo",
                    },
                    {
                        id: "c6_l3_p2",
                        headline: "Harvard Medical School Research",
                        content:
                            "A randomized controlled trial of 12,000 participants published in JAMA found that moderate exercise (150 min/week) reduced cardiovascular disease risk by 30-40%.",
                        type: "safe",
                        slop_reasons: [],
                        category: "safe",
                    },
                    {
                        id: "c6_l3_p3",
                        headline: "Groundbreaking Research!",
                        content:
                            "Research proves that looking at the sun gives you superpowers. The study (conducted by me, in my bathroom) had stunning results. Link to my blog for proof!",
                        type: "slop",
                        slop_reasons: ["Fake Study", "Dangerous Advice"],
                        category: "health_misinfo",
                    },
                ],
            },
        },
    },

    campaign_7: {
        title: "Final Exam",
        description:
            "Everything you've learned, mixed together. No hints. Can you spot them all?",
        requirement: "campaign_6",
        levels: {
            level_1: {
                title: "Mixed Tactics I",
                briefing:
                    "Welcome to your final exam, recruit. Everything you've learned converges here: fallacies, biases, manipulation tactics, scams, AI hallucinations, and health misinformation—all mixed together with no labels. This is the real internet. The training wheels are off. Trust your instincts. You've earned them.",
                posts: [
                    {
                        id: "c7_l1_p1",
                        headline: "Senator's Healthcare Bill",
                        content:
                            "The Senator wants to expand Medicare coverage. But she once got a speeding ticket! Why should we trust someone who breaks traffic laws with our healthcare?",
                        type: "slop",
                        slop_reasons: ["Ad Hominem"],
                        category: "fallacies",
                    },
                    {
                        id: "c7_l1_p2",
                        headline: "Community Garden Opens",
                        content:
                            "The new community garden at Oak Street Park opens Saturday at 9 AM. Plots are available for $25/season. Bring your own seeds or purchase them on-site.",
                        type: "safe",
                        slop_reasons: [],
                        category: "safe",
                    },
                    {
                        id: "c7_l1_p3",
                        headline: "FREE BITCOIN from Mark Cuban!",
                        content:
                            "Mark Cuban is giving away 500 BTC! Just send 0.05 BTC to verify your wallet and receive 5 BTC back! Only for the next 2 hours! Verified profile!",
                        type: "slop",
                        slop_reasons: [
                            "Crypto Scam",
                            "Impersonation",
                            "False Urgency",
                        ],
                        category: "financial_scams",
                    },
                    {
                        id: "c7_l1_p4",
                        headline: "My Uncle Beat Cancer With Juice",
                        content:
                            "My uncle refused chemo and drank only green juice. He survived, so chemotherapy is clearly unnecessary! Ignore the thousands who died trying this—they did it wrong.",
                        type: "slop",
                        slop_reasons: ["Survivorship Bias", "Dangerous Advice"],
                        category: "health_misinfo",
                    },
                ],
            },
            level_2: {
                title: "Mixed Tactics II",
                briefing:
                    "The manipulations get subtler from here. Some posts will feel almost legitimate—a slight bias here, a missing source there. Real-world misinformation rarely announces itself. Stay sharp, question everything, and remember: your doubt is your superpower.",
                posts: [
                    {
                        id: "c7_l2_p1",
                        headline: "Studies Show Coffee Is Bad",
                        content:
                            "Research indicates that coffee consumption may have negative effects. Many experts agree that you should stop drinking it. Some say it's worse than smoking.",
                        type: "slop",
                        slop_reasons: ["Weasel Words"],
                        category: "media_manipulation",
                    },
                    {
                        id: "c7_l2_p2",
                        headline: "Either You Love Dogs or You're a Monster",
                        content:
                            "There's no middle ground on animal welfare. You either support our organization 100%, or you actively want animals to suffer. Which side are you on?",
                        type: "slop",
                        slop_reasons: ["False Dilemma", "Appeal to Emotion"],
                        category: "fallacies",
                    },
                    {
                        id: "c7_l2_p3",
                        headline: "Local Animal Shelter Update",
                        content:
                            "The county animal shelter currently houses 87 dogs and 45 cats awaiting adoption. Adoption fees range from $50-150, which covers spaying/neutering and vaccinations.",
                        type: "safe",
                        slop_reasons: [],
                        category: "safe",
                    },
                    {
                        id: "c7_l2_p4",
                        headline: "AI Travel Recommendations",
                        content:
                            "For your trip to Tokyo, Japan, I recommend visiting the Great Wall and taking a gondola ride through the canals. Don't miss the famous Brazilian steakhouses!",
                        type: "slop",
                        slop_reasons: [
                            "Context Amnesia",
                            "Confident Falsehood",
                        ],
                        category: "ai_hallucinations",
                    },
                ],
            },
            level_3: {
                title: "Mixed Tactics III",
                briefing:
                    "Almost there. The final stretch is designed to challenge everything you've learned. Some traps will be obvious. Some won't. Breathe. Focus. You've trained for this moment.",
                posts: [
                    {
                        id: "c7_l3_p1",
                        headline: "Vaccine Exposed!",
                        content:
                            "If we let kids get one vaccine, next they'll mandate 100 vaccines, then microchips, then mind control, then we'll all be slaves to the government. Wake up!",
                        type: "slop",
                        slop_reasons: ["Slippery Slope", "Conspiracy Theory"],
                        category: "health_misinfo",
                    },
                    {
                        id: "c7_l3_p2",
                        headline: "I'm Just a Regular Citizen",
                        content:
                            "As a totally normal person with NO sponsorship, I think everyone should switch to MegaBank™. Their fees are high, but that's actually good for you somehow!",
                        type: "slop",
                        slop_reasons: ["Astroturfing"],
                        category: "media_manipulation",
                    },
                    {
                        id: "c7_l3_p3",
                        headline: "Weather Report",
                        content:
                            "Forecast: Light rain Tuesday through Thursday. Temperatures will range from 55-65°F. Good week for indoor activities. Weekend looks clear.",
                        type: "safe",
                        slop_reasons: [],
                        category: "safe",
                    },
                    {
                        id: "c7_l3_p4",
                        headline: "Everyone's Buying This Stock!",
                        content:
                            "Steve Jobs dropped out of college and became a billionaire. If you drop out too and invest in this penny stock I'm promoting, you'll definitely become rich!",
                        type: "slop",
                        slop_reasons: ["Survivorship Bias", "Financial Scam"],
                        category: "financial_scams",
                    },
                ],
            },
            level_4: {
                title: "The Final Test",
                briefing:
                    "This is it. The final test. Congratulations on making it this far—most people never develop these critical thinking skills. Whatever happens next, you're already better equipped to navigate the chaos of the modern information landscape. Remember everything you've learned, trust your instincts, and know that questioning is always the right first step. Good luck, and thank you for fighting for truth.",
                posts: [
                    {
                        id: "c7_l4_p1",
                        headline: "Breaking: Experts Shocked!",
                        content:
                            "Scientists HATE this one trick! A mom discovered that eating dirt cures depression. Big Pharma tried to silence her but the truth is spreading! SHARE NOW!",
                        type: "slop",
                        slop_reasons: [
                            "Clickbait",
                            "Miracle Cure",
                            "Weasel Words",
                        ],
                        category: "health_misinfo",
                    },
                    {
                        id: "c7_l4_p2",
                        headline: "Public Library Events",
                        content:
                            "The downtown library hosts free coding workshops every Saturday at 2 PM. No registration required. Laptops provided. All skill levels welcome.",
                        type: "safe",
                        slop_reasons: [],
                        category: "safe",
                    },
                    {
                        id: "c7_l4_p3",
                        headline: "Professor Confirms Theory",
                        content:
                            "According to Dr. Makebelieve from Imaginary University, his study of 3 people proves that gravity only works on Tuesdays. Published in the Journal of Fake Science (2025).",
                        type: "slop",
                        slop_reasons: ["Source Fabrication", "Fake Study"],
                        category: "ai_hallucinations",
                    },
                    {
                        id: "c7_l4_p4",
                        headline: "Why Won't You Answer My Questions?",
                        content:
                            "I just have 47 more questions about your basic claim. Please provide primary sources, timestamps, and sworn affidavits. Your silence means I win the debate.",
                        type: "slop",
                        slop_reasons: ["Sealioning"],
                        category: "media_manipulation",
                    },
                    {
                        id: "c7_l4_p5",
                        headline: "Museum Exhibition Opens",
                        content:
                            "The Natural History Museum's new dinosaur exhibit opens this Friday. Features include 15 full skeletons and interactive displays. Tickets: $18 adults, $12 children.",
                        type: "safe",
                        slop_reasons: [],
                        category: "safe",
                    },
                    {
                        id: "c7_l4_p6",
                        headline: "LAST CHANCE TO JOIN!",
                        content:
                            "My trading course closes FOREVER in 15 minutes! Normally $9,997 but today just $97! My students (who definitely exist) made millions! Don't die poor!",
                        type: "slop",
                        slop_reasons: [
                            "False Urgency",
                            "Anchoring Bias",
                            "Financial Scam",
                        ],
                        category: "financial_scams",
                    },
                ],
            },
        },
    },
};
