import { motion } from "framer-motion";

interface ModalProps {
    children: React.ReactElement;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    onAction: () => void;
}

export const Modla = ({
    isOpen,
    setIsOpen,
    onAction,
    children,
}: ModalProps) => {
    const modalVariants = {
        close: {
            opacity: 0,
            zIndex: -10,
        },
        open: { opacity: 1, zIndex: 10 },
    };

    return (
        <motion.div
            className="fixed inset-0 flex justify-center items-center p-4 backdrop-blur-sm opacity-0"
            animate={isOpen ? "open" : "close"}
            variants={modalVariants}
        >
            <div
                className="absolute inset-0 -z-10"
                onClick={() => setIsOpen(false)}
            ></div>
            <div className="flex flex-col max-h-full p-4 border-2 border-point rounded-lg bg-sub overflow-hidden">
                <div className="overflow-auto mb-4">{children}</div>
                <div className="flex justify-end gap-2">
                    <button
                        className="py-1 px-2 rounded-lg border-2 border-point"
                        onClick={() => setIsOpen(false)}
                    >
                        닫기
                    </button>
                    <button
                        className="py-1 px-2 rounded-lg border-2 border-point"
                        onClick={() => onAction()}
                    >
                        버리기
                    </button>
                </div>
            </div>
        </motion.div>
    );
};
