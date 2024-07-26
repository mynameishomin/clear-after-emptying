import { StuffProps } from "@/type";
import { StuffCardLi, StuffCardUl } from "@/components/stuff/stuffCard";
import { useContext } from "react";
import { StuffModalContext } from "@/provider/stuffModal";

const StuffCardList = ({
    children,
    stuffList,
}: {
    children?: React.ReactElement;
    stuffList: StuffProps[];
}) => {
    return (
        <StuffCardUl>
            <>
                <StuffCardLi stuffList={stuffList} />
                {children}
            </>
        </StuffCardUl>
    );
};
export default StuffCardList;
