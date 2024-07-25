import { useEffect, useMemo, useState } from "react";
import { StuffProps } from "@/type";
import { STUFF_API_URL } from "@/variables";
import StuffCardList from "@/components/stuff/stuffCardList";
import { LoadingStuffCardUl } from "./stuffCard";

const HistoryStuffList = () => {
    const [loading, setLoading] = useState(true);
    const [historyStuffList, setHistoryStuffList] = useState<StuffProps[]>([]);

    const getHistoryStuffList = async () => {
        const today = new Date();
        today.setDate(today.getDate() - 1);
        const endDate = today.toISOString().split("T")[0];
        const response = await fetch(`${STUFF_API_URL}?endDate=${endDate}`);

        if (response.ok) {
            setHistoryStuffList(await response.json());
            setLoading(false);
        }
    };

    useEffect(() => {
        getHistoryStuffList();
    }, []);

    return (
        <section className="mb-20">
            <h2 className="text-xl mb-4">지금까지, 이런 물건을 비웠어요.</h2>
            {loading ? (
                <LoadingStuffCardUl />
            ) : (
                <StuffCardList stuffList={historyStuffList} />
            )}
        </section>
    );
};
export default HistoryStuffList;
