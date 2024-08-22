"use client";
import { StuffProvider } from "@/provider/stuff";
import { StuffModalProvider } from "@/provider/stuffModal";

export default function StuffLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <StuffModalProvider>
            <>{children}</>
        </StuffModalProvider>
    );
}
