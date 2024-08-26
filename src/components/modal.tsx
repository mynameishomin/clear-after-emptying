"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ChildrenProps } from "@/type";

export const useModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const onOpen = () => {
        setIsOpen(true);
    };
    const onClose = () => {
        setIsOpen(false);
    };

    return { isOpen, onOpen, onClose };
};

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactElement;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
    const modalVariants = {
        close: {
            display: "none",
            opacity: 0,
            zIndex: 10,
        },
        open: { display: "flex", opacity: 1 },
    };

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 flex justify-center items-center p-4 pt-8 backdrop-blur-sm opacity-0"
                animate={isOpen ? "open" : "close"}
                variants={modalVariants}
            >
                <>
                    <div
                        className="absolute inset-0 -z-10"
                        onClick={onClose}
                    ></div>
                    <div className="relative w-full h-full flex justify-center py-12">
                        <div className="relative flex flex-col w-full max-w-lg max-h-full p-4 border-2 border-point rounded-lg bg-sub overflow-hidden">
                            {children}
                        </div>
                    </div>
                </>
            </motion.div>
        </AnimatePresence>
    );
};

export const ModalHeader = ({ children }: ChildrenProps) => {
    return <div className="mb-4">{children}</div>;
};

export const ModalBody = ({ children }: ChildrenProps) => {
    return <div className="overflow-hidden">{children}</div>;
};

export const ModalFooter = ({ children }: ChildrenProps) => {
    return (
        <div className="mt-auto">
            <div className="mt-4">{children}</div>
        </div>
    );
};
