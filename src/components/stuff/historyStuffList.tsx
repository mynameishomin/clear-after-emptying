import { useEffect, useMemo, useState } from "react";
import { StuffProps } from "@/type";
import { AnimatePresence, motion } from "framer-motion";
import { STUFF_API_URL } from "@/variables";
import StuffCardList from "./stuffCardList";

const HistoryStuffList = () => {
    const [historyStuffList, setHistoryStuffList] = useState<
        null | StuffProps[]
    >(null);

    const getHistoryStuffList = useMemo(() => {
        const today = new Date();
        today.setDate(today.getDate() - 1);
        const endDate = today.toISOString().split("T")[0];
        return async () => {
            const response = await fetch(`${STUFF_API_URL}?endDate=${endDate}`);
            setHistoryStuffList(await response.json());
        };
    }, []);

    useEffect(() => {
        getHistoryStuffList();
    }, [getHistoryStuffList]);

    return (
        <>
            <AnimatePresence>
                {historyStuffList?.length !== 0 && (
                    <section className="mb-20">
                        <h2 className="text-xl mb-4">
                            지금까지, 이런 물건을 비웠어요.
                        </h2>
                        <StuffCardList stuffList={historyStuffList} />
                    </section>
                )}
            </AnimatePresence>
        </>
    );
};
export default HistoryStuffList;
