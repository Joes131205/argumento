import { getApiErrorMessage, instance } from "@/utils/api";

export const getPost = async (postId: string) => {
    try {
        const { data } = await instance.get(`/posts/${postId}`);
        if (!data.success) {
            throw new Error(data.message || "Failed to fetch post");
        }
        return data.post;
    } catch (error) {
        const message = getApiErrorMessage(error, "Failed to fetch post");
        console.error(message, error);
        throw new Error(message);
    }
};
