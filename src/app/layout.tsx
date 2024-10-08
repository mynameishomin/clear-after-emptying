import type { Metadata } from "next";
import { Do_Hyeon } from "next/font/google";

import "./globals.css";
import { Header } from "@/components/layout/header";
import { site } from "@/variables";
import { FetchDataEventListenerComponent } from "@/components/customFetch";
import { StuffModalProvider } from "@/provider/stuffModal";
import { SessionProvider } from "@/provider/session";
import StuffModal from "@/components/stuff/stuffModal";
import { StuffProvider } from "@/provider/stuff";
import { Footer } from "@/components/layout/footer";

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
    return (
        <html lang="ko" className="bg-sub">
            <body className={doHyeon.className}>
                <FetchDataEventListenerComponent />
                <SessionProvider>
                    <StuffProvider>
                        <StuffModalProvider>
                            <div className="w-screen min-h-screen flex flex-col overflow-hidden text-point break-keep">
                                <Header />
                                <main className="flex flex-col w-full grow mt-20">
                                    {children}
                                </main>
                                <Footer />
                            </div>
                        </StuffModalProvider>
                    </StuffProvider>
                </SessionProvider>
            </body>
        </html>
    );
}
