"use client";
import { ChildrenProps, StuffProps } from "@/type";
import { useModal } from "@/components/modal";
import { useState } from "react";
import { StuffModalProps } from "./../components/stuff/stuffModal";
import { createContext } from "react";

interface StuffModalContextProps extends StuffModalProps {
    setStuff: React.Dispatch<React.SetStateAction<StuffProps>>;
}

export const StuffModalContext = createContext<StuffModalContextProps>(
    {} as StuffModalContextProps
);

export const StuffModalProvider = ({ children }: ChildrenProps) => {
    const { isOpen, onClose, onOpen } = useModal();
    const [stuff, setStuff] = useState<StuffProps>({} as StuffProps);

    return (
        <StuffModalContext.Provider
            value={{
                stuff,
                isOpen,
                onClose,
                setStuff,
                onOpen,
                stuffSubmitCallback: () => {},
            }}
        >
            {children}
        </StuffModalContext.Provider>
    );
};
