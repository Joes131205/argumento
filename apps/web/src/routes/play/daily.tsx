import { getMe } from "@/apis/auth";
import { generateDailyShift } from "@/apis/shifts";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/play/daily")({
    component: RouteComponent,
    loader: async () => {
        // Validate user's existence
        const user = await getMe();
        console.log(user);
        if (!user) {
            toast.warning("please sign in");
            throw redirect({ to: "/sign-in" });
        }
    },
});

function RouteComponent() {
    const [isPlayedBefore, setIsPlayedBefore] = useState(false);

    const generateShift = async (postLength, types) => {
        try {
            const posts = await generateDailyShift(postLength, types);
            const postData = posts?.data || posts;
            const newGame = { currPosts: postData, log: [] };

            localStorage.setItem("shift_data", JSON.stringify(newGame));
            return newGame;
        } catch (error) {
            console.error(error);
            throw redirect({ to: "/" });
        }
    };

    useEffect(() => {
        const storage = localStorage.getItem("shift_data");
        if (!storage) {
            setIsPlayedBefore(false);
        } else {
            setIsPlayedBefore(true);
            console.log(JSON.parse(storage));
        }
    }, []);
    return <div></div>;
}
