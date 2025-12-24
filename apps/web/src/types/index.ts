export interface IPost {
    headline: string;
    content: string;
    type: "slop" | "safe";
    slop_reason?: string | null;
    category?:
        | "logical_fallacies"
        | "cognitive_biases"
        | "media_manipulation"
        | "ai_hallucinations"
        | "safe";
    reasons: string[];
    origin: "human" | "ai";
}

export interface IPostHistoryItem {
    post_id: string;
    is_correct: boolean;
}

export interface ICampaignProgress {
    campaign_id: string;
    isCompleted: boolean;
    levelsCompleted: string[];
}

export interface IStat {
    stat_id: string;
    name: string;
    correct: number;
    total: number;
}

export interface IUser {
    _id: string;
    username: string;
    totalExp: number;

    currentStreak: number;
    bestStreak: number;
    lastPlayedDate: Date | null;
    postsProcessed: number;
    postsCorrect: number;

    postsHistory: IPostHistoryItem[];

    stats: IStat[];

    campaign_progress: ICampaignProgress[];

    createdAt: Date;
    updatedAt: Date;
}

export interface IApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}
