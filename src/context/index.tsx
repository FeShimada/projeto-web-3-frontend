"use client";

import { UserWrapper } from "./user";


export const AppProvider = ({ children }: { children: React.ReactNode; }) => {
    return (
        <UserWrapper>
            {children}
        </UserWrapper>
    );
};
