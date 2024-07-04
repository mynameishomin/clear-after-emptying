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

interface ModalProps {
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
                className="fixed inset-0 flex justify-center items-center p-4 pt-20 backdrop-blur-sm opacity-0"
                animate={isOpen ? "open" : "close"}
                variants={modalVariants}
            >
                <>
                    <div
                        className="absolute inset-0 -z-10"
                        onClick={onClose}
                    ></div>
                    <div className="flex flex-col w-full max-h-full p-4 border-2 border-point rounded-lg bg-sub overflow-hidden">
                        {children}
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
    return <div className="rounded-lg overflow-auto">{children}</div>;
};

export const ModalFooter = ({ children }: ChildrenProps) => {
    return <div className="mt-4">{children}</div>;
};

// interface ModalProps_ {
//     children: React.ReactElement;
//     isOpen: boolean;
//     setIsOpen: (isOpen: boolean) => void;
//     onAction: () => void;
// }

// export const Modla_ = ({
//     isOpen,
//     setIsOpen,
//     onAction,
//     children,
// }: ModalProps_) => {
//     const modalVariants = {
//         close: {
//             opacity: 0,
//             zIndex: -10,
//         },
//         open: { opacity: 1, zIndex: 10 },
//     };

//     return (
//         <motion.div
//             className="fixed inset-0 flex justify-center items-center p-4 backdrop-blur-sm opacity-0"
//             animate={isOpen ? "open" : "close"}
//             variants={modalVariants}
//         >
//             <div
//                 className="absolute inset-0 -z-10"
//                 onClick={() => setIsOpen(false)}
//             ></div>
//             <div className="flex flex-col max-h-full p-4 border-2 border-point rounded-lg bg-sub overflow-hidden">
//                 <div className="overflow-auto mb-4">{children}</div>
//                 <div className="flex justify-end gap-2">
//                     <button
//                         className="py-1 px-2 rounded-lg border-2 border-point"
//                         onClick={() => setIsOpen(false)}
//                     >
//                         닫기
//                     </button>
//                     <button
//                         className="py-1 px-2 rounded-lg border-2 border-point"
//                         onClick={() => onAction()}
//                     >
//                         버리기
//                     </button>
//                 </div>
//             </div>
//         </motion.div>
//     );
// };
