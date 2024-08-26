import { StuffProps } from "@/type";
import { StuffCardLi, StuffCardUl } from "@/components/stuff/stuffCard";

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
