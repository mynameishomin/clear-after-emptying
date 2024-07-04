import { useEffect, useState } from "react";
import { StuffProps, TodayStuffProps } from "@/type";
import { AnimatePresence, motion } from "framer-motion";
import { Card } from "@/components/card";
import {
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    useModal,
} from "@/components/modal";
import UnsplashModal from "./unsplash/unsplashModal";

interface TodayStuffCardProps {
    stuff: StuffProps;
    onClick: (isEmpty: boolean) => void;
}

export const TodayStuffCard = ({ stuff, onClick }: TodayStuffCardProps) => {
    return (
        <Card>
            <motion.div className="backface-hidden relative flex md:flex-col gap-4 h-full pb-[100%]">
                <div className="absolute inset-0 flex flex-col p-3">
                    <h3 className="shrink-0 mb-2 text-xl truncate">
                        {stuff.name}
                    </h3>
                    <p className="relative grow leading-5 overflow-hidden">
                        {stuff.summary}
                        <span className="absolute inset-0 top-1/2 bg-gradient-to-t from-sub to-transparent"></span>
                    </p>
                    <span className="shrink-0 text-sm text-right">
                        {stuff.createdAt}
                    </span>
                </div>
            </motion.div>
        </Card>
    );
};

export const TodayStuffList = () => {
    const [todayStuff, setTodayStuff] = useState<null | TodayStuffProps>(null);
    const [stuffTitle, setStuffTitle] = useState("");
    const [stuffSummary, setStuffSummary] = useState("");

    const [stuff, setStuff] = useState<StuffProps>();

    const stuffModal = useModal();
    const unsplashModal = useModal();

    const container = {
        visible: {
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2,
            },
        },
    };

    const item = {
        hidden: { y: 40, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
        },
    };

    if (!todayStuff) return null;

    return (
        <AnimatePresence>
            <motion.ul
                className="grid grid-cols-2 gap-4 md:flex-row sm:grid-cols-3"
                initial="hidden"
                animate="visible"
                variants={container}
            >
                {todayStuff.stuff.map((stuff: StuffProps, index: number) => {
                    return (
                        <motion.li key={stuff.id} layout variants={item}>
                            <TodayStuffCard
                                stuff={stuff}
                                onClick={() => {}}
                            />
                        </motion.li>
                    );
                })}
                <motion.li
                    className="relative pb-[100%]"
                    key="add-stuff-card"
                    layout
                    variants={item}
                >
                    <motion.button
                        className="absolute inset-0 flex justify-center items-center w-full h-full border-2 border-point rounded-lg hover:bg-main transition-all"
                        onClick={stuffModal.onOpen}
                    >
                        <span className="text-2xl">+</span>
                    </motion.button>
                </motion.li>
            </motion.ul>

            <Modal isOpen={stuffModal.isOpen} onClose={stuffModal.onClose}>
                <form>
                    <ModalHeader>
                        <h3 className="text-lg">버릴 물건</h3>
                    </ModalHeader>
                    <ModalBody>
                        <div className="flex flex-col gap-4">
                            <label className="flex flex-col">
                                <h4>이름</h4>
                                <div className="border-b-2 border-point">
                                    <input
                                        className="w-full bg-transparent focus:outline-none"
                                        type="text"
                                        value={stuffTitle}
                                        onChange={(e) =>
                                            setStuffTitle(e.target.value)
                                        }
                                    />
                                </div>
                            </label>
                            <label className="flex flex-col">
                                <h4>설명</h4>
                                <div className="border-b-2 border-point">
                                    <textarea
                                        className="w-full py-0.5 pr-1 bg-transparent focus:outline-none"
                                        rows={3}
                                        value={stuffSummary}
                                        onChange={(e) =>
                                            setStuffSummary(e.target.value)
                                        }
                                    />
                                </div>
                            </label>

                            <label className="flex flex-col">
                                <h4 className="mb-1">사진</h4>
                                <button
                                    type="button"
                                    className="relative flex justify-center items-center pb-[40%] border-2 border-point rounded-lg hover:bg-main transition-all"
                                    onClick={unsplashModal.onOpen}
                                >
                                    <div className="absolute inset-0 flex justify-center items-center">
                                        <span className="text-2xl">+</span>
                                    </div>
                                </button>
                            </label>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <div></div>
                    </ModalFooter>
                </form>
            </Modal>

            <UnsplashModal isOpen={unsplashModal.isOpen} onClose={unsplashModal.onClose} onSelect={() => {}} />
        </AnimatePresence>
    );
};