import { getApiErrorMessage, instance } from "@/utils/api";
import { toast } from "sonner";

export const submitFeedback = async (feedbackData: {
    description: string;
    expectation: string;
    favoritePart: string;
    frustrated: string;
    clarity: number;
    playAgainTomorrow: number;
    improvements: string;
    learnedSomething: string;
    changesSocialMedia: string;
    anythingElse?: string;
}) => {
    try {
        const res = await instance.post("/feedback", feedbackData);
        if (!res.data.success) {
            throw new Error(res.data.message || "Failed to submit feedback");
        }
        toast.success("Thank you for your feedback!");
        return res.data;
    } catch (error) {
        const message = getApiErrorMessage(error, "Failed to submit feedback");
        toast.error(message);
        throw new Error(message);
    }
};

export const getFeedbackAnalytics = async () => {
    try {
        const res = await instance.get("/feedback/analytics");
        if (!res.data.success) {
            throw new Error(res.data.message || "Failed to fetch analytics");
        }
        return res.data;
    } catch (error) {
        const message = getApiErrorMessage(error, "Failed to fetch analytics");
        console.error(message, error);
        throw new Error(message);
    }
};
