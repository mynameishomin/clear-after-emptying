"use client";
import { ChildrenProps, StuffProps } from "@/type";
import { useModal } from "@/components/modal";
import { useState } from "react";
import { createContext } from "react";

interface StuffContextProps {
    today: StuffProps[];
    history: StuffProps[];
}

export const StuffContext = createContext<StuffContextProps>({
    today: [],
    history: [],
});

export const StuffProvider = ({ children }: ChildrenProps) => {
    const { isOpen, onClose, onOpen } = useModal();
    const [stuff, setStuff] = useState<StuffProps>({} as StuffProps);

    return <StuffContext.Provider value={{}}>{children}</StuffContext.Provider>;
};
