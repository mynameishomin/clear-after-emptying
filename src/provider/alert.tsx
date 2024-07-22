"use client";
import { ChildrenProps } from "@/type";
import { AuthContext } from "@/context/auth";

interface AuthProviderProps extends ChildrenProps {
    auth: boolean;
}

export const AuthProvider = ({ children, auth }: AuthProviderProps) => {
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
