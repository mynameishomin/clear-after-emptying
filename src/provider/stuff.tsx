"use client";
import { ChildrenProps, StuffProps } from "@/type";
import { useModal } from "@/components/modal";
import { useState } from "react";
import { createContext } from "react";

interface StuffContextProps {
    todayStuff: StuffProps[];
    setTodayStuff: React.Dispatch<React.SetStateAction<StuffProps[]>>;
    historyStuff: StuffProps[];
    setHistoryStuff: React.Dispatch<React.SetStateAction<StuffProps[]>>;
}

export const StuffContext = createContext<StuffContextProps>({
    todayStuff: [],
    setTodayStuff: () => {},
    historyStuff: [],
    setHistoryStuff: () => {},
});

export const StuffProvider = ({ children }: ChildrenProps) => {
    const [todayStuff, setTodayStuff] = useState<StuffProps[]>([]);
    const [historyStuff, setHistoryStuff] = useState<StuffProps[]>([]);

    return (
        <StuffContext.Provider
            value={{ todayStuff, setTodayStuff, historyStuff, setHistoryStuff }}
        >
            {children}
        </StuffContext.Provider>
    );
};
