"use client";
import { ChildrenProps, StuffProps } from "@/type";
import { STUFF_API_URL } from "@/variables";
import { useEffect, useState } from "react";
import { createContext } from "react";

interface StuffContextProps {
    stuffList: StuffProps[] | null;
    setStuffList: React.Dispatch<React.SetStateAction<StuffProps[] | null>>;
}

export const StuffContext = createContext<StuffContextProps>({
    stuffList: null,
    setStuffList: () => {},
});

export const StuffProvider = ({ children }: ChildrenProps) => {
    const [stuffList, setStuffList] = useState<StuffProps[] | null>(null);

    useEffect(() => {
        const getStuffList = async () => {
            const response = await fetch(STUFF_API_URL);
            setStuffList(await response.json());
        };

        getStuffList();
    }, []);

    return (
        <StuffContext.Provider value={{ stuffList, setStuffList }}>
            {children}
        </StuffContext.Provider>
    );
};
