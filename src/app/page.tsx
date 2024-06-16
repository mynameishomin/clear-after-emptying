"use client";
import { TodayStuffList } from "@/components/stuff";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

export default function Home() {
    useEffect(() => {
        const storageStuffHistory = localStorage.getItem("stuffHistory");
        if (!storageStuffHistory) {
            localStorage.setItem("stuffHistory", JSON.stringify({}));
        }
    }, []);
    return (
        <AnimatePresence>
            <TodayStuffList />
        </AnimatePresence>
    );
}
