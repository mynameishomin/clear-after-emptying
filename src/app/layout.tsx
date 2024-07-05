import type { Metadata } from "next";
import { Do_Hyeon } from "next/font/google";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

import "./globals.css";
import { Header } from "@/components/layout/header";
import { site } from "@/variables";
import { AuthProvider } from "@/app/provider/auth";

const doHyeon = Do_Hyeon({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
    title: site.title,
    description: site.summary,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const token = cookies().get("access_token")?.value;
    let auth = false;
    if (token) {
        try {
            jwt.verify(token, process.env.JWT_SECRET!);
            auth = true;
        } catch (err) {}
    }

    return (
        <html lang="ko" className="bg-sub">
            <body className={doHyeon.className}>
                <AuthProvider auth={auth}>
                    <div className="w-screen min-h-screen overflow-hidden text-point break-keep">
                        <Header />
                        <div className="mt-16">{children}</div>
                    </div>
                </AuthProvider>
            </body>
        </html>
    );
}
