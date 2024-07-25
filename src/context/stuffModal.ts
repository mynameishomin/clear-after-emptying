import { StuffModalProps } from "./../components/stuff/stuffModal";
import { createContext } from "react";

export const StuffModalContext = createContext<StuffModalProps>(
    {} as StuffModalProps
);
