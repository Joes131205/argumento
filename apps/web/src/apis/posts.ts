import { instance } from "@/utils/api";

export const getPost = async (postId: string) => {
    try {
        const { data } = await instance.get(`/posts/${postId}`);
        return data.post;
    } catch (error) {
        console.log(error);
        return "SERVER ERROR";
    }
};
