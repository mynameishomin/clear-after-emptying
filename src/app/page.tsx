"use client";
import Container from "@/components/layout/container";
import Header from "@/components/layout/header";
import { TodayStuffList } from "@/components/stuff";
import { site } from "@/variables";
import { useEffect } from "react";

export default function Home() {
    useEffect(() => {
        const storageStuffHistory = localStorage.getItem("stuffHistory");
        if (!storageStuffHistory) {
            localStorage.setItem("stuffHistory", JSON.stringify([]));
        }
    }, []);
    return (
        <div className="flex flex-col md:justify-center w-full">
            <Header />
            <Container>
                <div className="mt-52">
                    <h1 className="text-4xl">
                        {site.title}
                        <br />
                        {site.summary}
                    </h1>
                </div>
            </Container>

            {/* <TodayStuffList /> */}
        </div>
    );
}
