import { useContext } from "react";
import StuffCardList from "@/components/stuff/stuffCardList";
import { LoadingStuffCardUl } from "./stuffCard";
import { StuffContext } from "@/provider/stuff";

const HistoryStuffList = () => {
    const { stuffList } = useContext(StuffContext);
    console.log(stuffList);
    const today = new Date().toISOString().split("T")[0];

    // createdAt이 오늘 날짜가 아닌 항목만 필터링
    const stuff = stuffList?.filter((item) => {
        const itemDate = item.createdAt?.split("T")[0];
        return itemDate !== today;
    });
    return (
        <section className="mb-20">
            <h2 className="text-xl mb-4">지금까지, 이런 물건을 비웠어요.</h2>
            {stuff ? (
                <StuffCardList stuffList={stuff} />
            ) : (
                <LoadingStuffCardUl />
            )}
        </section>
    );
};
export default HistoryStuffList;
