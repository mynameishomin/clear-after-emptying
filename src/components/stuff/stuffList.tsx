import { useContext } from "react";
import { LoadingStuffCardUl } from "@/components/stuff/stuffCard";
import StuffCardList from "./stuffCardList";
import { StuffContext } from "@/provider/stuff";

const TodayStuffList = () => {
    const { stuffList } = useContext(StuffContext);

    return (
        <section>
            <h2 className="text-xl mb-4">지금까지 이런 물건을 비웠어요.</h2>
            {stuffList ? (
                <StuffCardList stuffList={stuffList} />
            ) : (
                <LoadingStuffCardUl />
            )}
        </section>
    );
};
export default TodayStuffList;
