"use client";
import { TodayStuffList } from "@/components/stuff";
import { getNowDate } from "@/functions";
import { StuffHistoryProps } from "@/type";
import { useEffect, useState } from "react";

export default function Home() {
    const [stuffHistory, setStuffHistory] = useState<null | StuffHistoryProps>(
        null
    );

    const [completedToday, setCompletedToday] = useState<boolean>(false);
    const { year, month, day, dateString } = getNowDate();

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
        <div className="flex flex-col justify-center items-center w-full h-full">
            <div className="relative px-6">
                <time
                    className="block text-xs"
                    dateTime={`${year}-${month}-${day}`}
                >
                    {month}월 {day}일
                </time>
                <h2 className="mb-4 text-2xl font-bold">
                    {completedToday ? "오늘까지 버린 물건" : "오늘 버릴 물건"}
                </h2>
                {completedToday ? <div>리스트</div> : <TodayStuffList />}
            </div>
        </div>
    );
}
