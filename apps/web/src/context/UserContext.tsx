import { getMe } from "@/apis/auth";
import { createContext, useEffect, useState, type ReactNode } from "react";

interface User {
    id: string;
    username: string;
}
interface UserContextType {
    user: User | null;
    isLoading: boolean;
    invalidateUser: () => Promise<void>;
}

interface UserProviderProps {
    children: ReactNode;
}
export const UserContext = createContext<UserContextType | undefined>(
    undefined
);

export const UserProvider = ({ children }: UserProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const unsubscribe = async () => {
            try {
                const res = await getMe();
                setUser(res);
                console.log(res);
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
        } finally {
            setIsLoading(false);
        }
    };

    const value = {
        user,
        isLoading,
        invalidateUser,
    };

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};
