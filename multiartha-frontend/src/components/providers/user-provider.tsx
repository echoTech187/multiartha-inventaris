"use client";

import { UserInfo } from "@/domain/entities/auth";
import { useRouter } from "next/navigation";
import { createContext, useContext, ReactNode, useEffect } from "react";

type UserContextType = {
    user: UserInfo | undefined;
    isAuthenticated: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({
    children,
    user,
    isAuthenticated,
}: {
    children: ReactNode;
    user: UserInfo | undefined;
    isAuthenticated: boolean;
}) {
    const router = useRouter();
    useEffect(() => {
        if (!isAuthenticated) {
            router.replace("/login");
        }
    })
    return (
        <UserContext.Provider value={{ user, isAuthenticated }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}
