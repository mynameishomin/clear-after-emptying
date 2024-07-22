import { useEffect, useMemo, useState } from "react";
import { StuffProps } from "@/type";
import { AnimatePresence, motion } from "framer-motion";
import { STUFF_API_URL } from "@/variables";
import { PulseStuffCard, StuffCard } from "@/components/stuff/stuffCard";
import { useModal } from "@/components/modal";
import StuffModal from "@/components/stuff/stuffModal";

const StuffCardList = ({ stuffList }: { stuffList: null | StuffProps[] }) => {
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

    return (
        <>
            <AnimatePresence>
                {stuffList ? (
                    <motion.ul
                        className="grid grid-cols-2 gap-4 md:flex-row sm:grid-cols-3 lg:grid-cols-4"
                        key="today-stuff-list"
                        initial="hidden"
                        animate="visible"
                        variants={container}
                    >
                        {stuffList.map((stuff: StuffProps, index: number) => {
                            return (
                                <motion.li
                                    key={index}
                                    variants={item}
                                    layout
                                    layoutId={stuff.id}
                                >
                                    <StuffCard
                                        stuff={stuff}
                                        onClick={() => {}}
                                    />
                                </motion.li>
                            );
                        })}
                    </motion.ul>
                ) : (
                    <div className="w-1/2 sm:w-1/3 lg:w-1/4">
                        <PulseStuffCard />
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};
export default StuffCardList;
