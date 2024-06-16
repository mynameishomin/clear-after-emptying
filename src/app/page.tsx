"use client";
import { TodayStuffList } from "@/components/stuff";
import { getNowDate } from "@/functions";
import { StuffHistoryProps } from "@/type";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
    const [stuffHistory, setStuffHistory] = useState<null | StuffHistoryProps>(
        null
    );

    const [completedToday, setCompletedToday] = useState<boolean>(false);
    const { dateString } = getNowDate();

    if (stuffHistory?.hasOwnProperty(dateString)) setCompletedToday(true);

    useEffect(() => {
        (async () => {
            const storageStuffHistory = localStorage.getItem("stuffHistory");

            setStuffHistory(
                storageStuffHistory ? JSON.parse(storageStuffHistory) : {}
            );
        })();
    }, []);
    return (
        <AnimatePresence>
            <div className="flex flex-col justify-center items-center w-full h-full">
                <div className="relative px-6">
                    {completedToday ? <div>리스트</div> : <TodayStuffList />}
                </div>
            </div>
        </AnimatePresence>
    );
}
