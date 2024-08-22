import { useContext } from "react";
import { StuffProps } from "@/type";
import { LoadingStuffCardUl } from "@/components/stuff/stuffCard";
import StuffCardList from "./stuffCardList";
import { StuffModalContext } from "@/provider/stuffModal";
import { StuffContext } from "@/provider/stuff";

const TodayStuffList = () => {
    const { stuffList } = useContext(StuffContext);

    const { onOpen, setStuff, stuffSubmitCallback } =
        useContext(StuffModalContext);

    const openAddStuffModal = () => {
        setStuff({
            name: "",
            summary: "",
        } as StuffProps);
        onOpen();
    };

    return (
        <section className="mb-20">
            <h2 className="text-xl mb-4">오늘, 이런 물건을 비웠어요.</h2>
            {stuffList ? (
                <StuffCardList stuffList={stuffList} />
            ) : (
                <LoadingStuffCardUl />
            )}
        </section>
    );
};
export default TodayStuffList;
