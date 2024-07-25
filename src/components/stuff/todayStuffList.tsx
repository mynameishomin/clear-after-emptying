import { useEffect, useMemo, useState } from "react";
import { StuffProps } from "@/type";
import { AnimatePresence, motion } from "framer-motion";
import { STUFF_API_URL } from "@/variables";
import { PulseStuffCard, StuffCard } from "@/components/stuff/stuffCard";
import { useModal } from "@/components/modal";
import StuffModal from "@/components/stuff/stuffModal";

const TodayStuffList = () => {
    const [todayStuffList, setTodayStuffList] = useState<null | StuffProps[]>(
        null
    );
    const [editStuffTarget, setEditStuffTarget] = useState<null | StuffProps>(
        null
    );

    const stuffModal = useModal();

    const getTodayStuffList = useMemo(() => {
        const today = new Date();
        const startDate = today.toISOString().split("T")[0];
        today.setDate(today.getDate() + 1);
        const endDate = today.toISOString().split("T")[0];
        return async () => {
            const response = await fetch(
                `${STUFF_API_URL}?startDate=${startDate}&endDate=${endDate}`
            );
            setTodayStuffList(await response.json());
        };
    }, []);

    const addTodayStuff = (stuff: StuffProps) => {
        setTodayStuffList((prev) => {
            if (prev) {
                prev.push(stuff);
                return [...prev];
            } else {
                return null;
            }
        });
    };

    const openEditStuffModal = (stuff: StuffProps) => {
        setEditStuffTarget(stuff);
        stuffModal.onOpen();
    };

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

    useEffect(() => {
        getTodayStuffList();
    }, [getTodayStuffList]);

    return (
        <>
            <AnimatePresence>
                {todayStuffList ? (
                    <motion.ul
                        className="grid grid-cols-2 gap-4 md:flex-row sm:grid-cols-3 lg:grid-cols-4"
                        key="today-stuff-list"
                        initial="hidden"
                        animate="visible"
                        variants={container}
                    >
                        {todayStuffList.map(
                            (stuff: StuffProps, index: number) => {
                                return (
                                    <motion.li
                                        key={index}
                                        variants={item}
                                        layout
                                        layoutId={stuff.id}
                                    >
                                        <StuffCard
                                            stuff={stuff}
                                            onClick={() => {
                                                openEditStuffModal(stuff);
                                            }}
                                        />
                                    </motion.li>
                                );
                            }
                        )}
                        <motion.li
                            className="relative pb-[100%]"
                            key="add-stuff-button"
                            layout
                            layoutId="add-stuff-button"
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
                ) : (
                    <div className="w-1/2 sm:w-1/3 lg:w-1/4">
                        <PulseStuffCard />
                    </div>
                )}
            </AnimatePresence>

            <StuffModal
                stuffData={editStuffTarget}
                isOpen={stuffModal.isOpen}
                onClose={stuffModal.onClose}
                stuffSubmitCallback={addTodayStuff}
            />
        </>
    );
};
export default TodayStuffList;
