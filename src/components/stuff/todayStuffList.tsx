import { useContext, useEffect, useMemo, useState } from "react";
import { StuffProps } from "@/type";
import { motion } from "framer-motion";
import { STUFF_API_URL } from "@/variables";
import {
    LoadingStuffCardUl,
    StuffCardLiVariants,
} from "@/components/stuff/stuffCard";
import StuffCardList from "./stuffCardList";
import { StuffModalContext } from "@/provider/stuffModal";

const TodayStuffList = () => {
    const [loading, setLoading] = useState(true);
    const [todayStuffList, setTodayStuffList] = useState<StuffProps[]>([]);

    const { onOpen, setStuff, stuffSubmitCallback } =
        useContext(StuffModalContext);

    const getTodayStuffList = async () => {
        const today = new Date();
        const startDate = today.toISOString().split("T")[0];
        today.setDate(today.getDate() + 1);
        const endDate = today.toISOString().split("T")[0];
        const response = await fetch(
            `${STUFF_API_URL}?startDate=${startDate}&endDate=${endDate}`
        );

        if (response.ok) {
            setTodayStuffList(await response.json());
            setLoading(false);
        }
    };

    const addTodayStuff = (stuff: StuffProps) => {
        setTodayStuffList((prev) => {
            if (prev) {
                prev.push(stuff);
                return [...prev];
            } else {
                return [];
            }
        });
    };

    const openAddStuffModal = () => {
        setStuff({
            name: "",
            summary: "",
        } as StuffProps);
        onOpen();
    };

    const openEditStuffModal = (stuff: StuffProps) => {
        setStuff(stuff);
        onOpen();
    };

    useEffect(() => {
        getTodayStuffList();
    }, []);

    return (
        <>
            <section className="mb-20">
                <h2 className="text-xl mb-4">오늘, 이런 물건을 비웠어요.</h2>
                {loading ? (
                    <LoadingStuffCardUl />
                ) : (
                    <StuffCardList stuffList={todayStuffList}>
                        <motion.li
                            className="relative pb-[100%]"
                            key="add-stuff-button"
                            layout
                            layoutId="add-stuff-button"
                            variants={StuffCardLiVariants}
                        >
                            <motion.button
                                className="absolute inset-0 flex justify-center items-center w-full h-full border-2 border-point rounded-lg hover:bg-main transition-all"
                                onClick={openAddStuffModal}
                            >
                                <span className="text-2xl">+</span>
                            </motion.button>
                        </motion.li>
                    </StuffCardList>
                )}
            </section>

            {/* <StuffModal
                stuffData={editStuffTarget}
                isOpen={stuffModal.isOpen}
                onClose={stuffModal.onClose}
                stuffSubmitCallback={addTodayStuff}
            /> */}
        </>
    );
};
export default TodayStuffList;
