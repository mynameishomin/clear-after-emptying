"use client";
import { StuffHistoryProps } from "@/type";
import { useEffect, useState } from "react";

export default function History() {
    const [stuffHistory, setStuffHistory] = useState<null | StuffHistoryProps>(
        null
    );

    useEffect(() => {
        const storageStuffHistory = localStorage.getItem("stuffHistory");

        if (storageStuffHistory) {
            const test = JSON.parse(storageStuffHistory) as StuffHistoryProps;
            setStuffHistory(JSON.parse(storageStuffHistory));
        }
    }, []);

    if (!stuffHistory) return <div></div>;
    return (
        <ul>
            {Object.keys(stuffHistory).map((date, index: number) => {
                return (
                    <li key={index}>
                        <h2 className="text-xs">{date}</h2>
                    </li>
                );
            })}
        </ul>
    );
}
