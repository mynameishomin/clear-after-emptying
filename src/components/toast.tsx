import { AnimatePresence, motion } from "framer-motion";

export interface ToastsProps {
    text: string;
    id: string;
}

export const Toast = ({ toasts }: { toasts: ToastsProps[] }) => {
    return (
        <ul className="fixed right-0 top-0">
            <AnimatePresence>
                {toasts.length !== 0 &&
                    toasts.map((toast, index) => {
                        return (
                            <motion.li
                                className="relative"
                                layout
                                layoutId={toast.id}
                                initial={{ opacity: 0, y: -50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 50 }}
                                key={index}
                            >
                                {toast.text + toast.id}
                            </motion.li>
                        );
                    })}
            </AnimatePresence>
        </ul>
    );
};
