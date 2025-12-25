import { getMe } from "@/apis/auth";
import type { IUser } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import { createContext, useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";

interface UserContextType {
    user: IUser | null;
    isLoading: boolean;
    invalidateUser: () => Promise<void>;
    logOut: () => void;
}

interface UserProviderProps {
    children: ReactNode;
}
export const UserContext = createContext<UserContextType | undefined>(
    undefined
);

export const UserProvider = ({ children }: UserProviderProps) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const unsubscribe = async () => {
            try {
                const res = await getMe();
                console.log(res);

                setUser(res);
                setIsLoading(true);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        unsubscribe();
    }, []);

    const invalidateUser = async () => {
        try {
            const res = await getMe();
            console.log(res);
            setUser(res);
            setIsLoading(true);
        } catch (error) {
            console.log(error);
            toast.error("Error!");
            setUser(null);
            localStorage.removeItem("token");
            navigate({ to: "/sign-in" });
        } finally {
            setIsLoading(false);
        }
    };

    const logOut = () => {
        setIsLoading(true);

        try {
            setUser(null);
            localStorage.removeItem("token");
            navigate({ to: "/sign-in" });
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const value = {
        user,
        isLoading,
        invalidateUser,
        logOut,
    };

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};
