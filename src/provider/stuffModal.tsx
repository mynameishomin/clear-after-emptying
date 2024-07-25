"use client";
import { ChildrenProps } from "@/type";
import { StuffModalContext } from "@/context/stuffModal";
import { StuffModalProps } from "@/components/stuff/stuffModal";
interface StuffModalProviderProps extends ChildrenProps, StuffModalProps {}

export const StuffModalProvider = ({
    children,
    stuffData,
    isOpen,
    onClose,
    stuffSubmitCallback,
}: StuffModalProviderProps) => {
    return (
        <StuffModalContext.Provider value={{} as StuffModalProps}>
            {children}
        </StuffModalContext.Provider>
    );
};

import { createContext, useState } from "react";

// 컨텍스트 생성
const ExampleContext = createContext("");

const ExampleProvider = ({ children }) => {
    const [value, setValue] = useState("Hello, World!");

    return (
        <ExampleContext.Provider value={{ value, setValue }}>
            {children}
        </ExampleContext.Provider>
    );
};
