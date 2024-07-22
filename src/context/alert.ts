import { createContext } from "react";

interface AlertProps {
    title: string;
    text: string;
}

export const AlertContext = createContext<AlertProps[]>([]);
