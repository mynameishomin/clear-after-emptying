"use client";
import { SessionProvider as _SessionProvider } from "next-auth/react";

export const SessionProvider = ({
    children,
}: {
    children: React.ReactElement;
}) => {
    return <_SessionProvider>{children}</_SessionProvider>;
};
