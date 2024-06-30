import { motion } from "framer-motion";

interface ModalProps {
    children: React.ReactElement;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export const Modla = ({ isOpen, setIsOpen, children }: ModalProps) => {
    console.log(isOpen);
    const modalVariants = {
        close: {
            opacity: 0,
            zIndex: -10,
        },
        open: { opacity: 1, zIndex: 10 },
    };

    return (
        <motion.div
            className="fixed inset-0 flex justify-center items-center backdrop-blur-sm"
            animate={isOpen ? "open" : "close"}
            variants={modalVariants}
        >
            <div
                className="absolute inset-0 -z-10"
                onClick={() => setIsOpen(false)}
            ></div>
            <div className="p-4 border-2 border-point rounded-lg bg-sub">
                <div>{children}</div>
            </div>
        </motion.div>
    );
};
