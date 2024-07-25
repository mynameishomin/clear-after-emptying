import { useEffect, useMemo, useState } from "react";
import { StuffProps } from "@/type";
import { motion } from "framer-motion";
import { STUFF_API_URL } from "@/variables";
import {
    LoadingStuffCardUl,
    StuffCardLiVariants,
} from "@/components/stuff/stuffCard";
import { useModal } from "@/components/modal";
import StuffModal from "@/components/stuff/stuffModal";
import StuffCardList from "./stuffCardList";

const TodayStuffList = () => {
    const [loading, setLoading] = useState(true);
    const [todayStuffList, setTodayStuffList] = useState<StuffProps[]>([]);
    const [editStuffTarget, setEditStuffTarget] = useState<null | StuffProps>(
        null
    );

    const stuffModal = useModal();

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

    const openEditStuffModal = (stuff: StuffProps) => {
        setEditStuffTarget(stuff);
        stuffModal.onOpen();
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
                                onClick={stuffModal.onOpen}
                            >
                                <span className="text-2xl">+</span>
                            </motion.button>
                        </motion.li>
                    </StuffCardList>
                )}
            </section>

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
