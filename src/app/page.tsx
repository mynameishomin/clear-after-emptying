"use client";
import { TodayStuffList } from "@/components/stuff";
import { useEffect } from "react";

export default function Home() {
    useEffect(() => {
        const storageStuffHistory = localStorage.getItem("stuffHistory");
        if (!storageStuffHistory) {
            localStorage.setItem("stuffHistory", JSON.stringify([]));
        }
    }, []);
    return (
        <div className="flex flex-col justify-center -translate-y-1/4">
            <TodayStuffList />
        </div>
    );
}
