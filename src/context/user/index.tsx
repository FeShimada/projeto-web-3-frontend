"use client";

import User from "@/models/user";
import { createContext, useState } from "react";

interface UserContextType {
    user: User | undefined;
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserWrapper({ children }: { children: React.ReactNode; }) {

    const [user, setUser] = useState<User | undefined>();

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}
