import { motion } from "framer-motion";
export interface AlertProps {
    title: string;
    text: string;
    onClose?: () => void;
}

export const Alert = ({ title, text, onClose }: AlertProps) => {
    return (
        <motion.div
            className="fixed inset-0 z-10 backdrop-blur-sm flex justify-center items-center"
            layoutId="alert"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="w-full max-w-96 p-4 bg-sub rounded-md border-2 border-point"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
            >
                <h3 className="text-2xl mb-2">{title}</h3>
                <p className="mb-4">{text}</p>
                <div className="text-right">
                    <button onClick={onClose}>Close</button>
                </div>
            </motion.div>
        </motion.div>
    );
};
