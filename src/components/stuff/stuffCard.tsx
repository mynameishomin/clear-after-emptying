import Image from "next/image";
import { StuffProps } from "@/type";
import { Card } from "@/components/card";
import { useContext } from "react";
import { StuffModalContext } from "@/provider/stuffModal";

interface StuffCardProps {
    stuff: StuffProps;
    onClick: () => void;
}

export const StuffCard = ({ stuff, onClick }: StuffCardProps) => {
    return (
        <Card>
            <button
                className="relative flex md:flex-col gap-4 w-full h-full pb-[100%] text-left"
                type="button"
                onClick={onClick}
            >
                <Image
                    className="absolute w-full h-full object-cover"
                    src={stuff.url}
                    alt={stuff.name}
                    width={200}
                    height={200}
                />

                <div className="absolute inset-0 flex flex-col p-3 text-sub bg-black/45">
                    <h3 className="shrink-0 mb-2 text-xl truncate">
                        {stuff.name}
                    </h3>
                    <p className="relative leading-5 text-overflow">
                        {stuff.summary}
                    </p>
                    <span className="shrink-0 mt-auto text-sm text-right">
                        {new Date(
                            stuff.createdAt as string
                        ).toLocaleDateString()}
                    </span>
                </div>
            </button>
        </Card>
    );
};

export const PulseStuffCard = () => {
    return (
        <Card>
            <div className="relative pb-[100%]">
                <div className="absolute inset-0 flex flex-col p-3 text-transparent animate-pulse">
                    <h3 className="shrink-0 mb-2 text-xl animate-pulse rounded-sm bg-main">
                        로딩중
                    </h3>
                    <div className="flex flex-col gap-1">
                        <p className="animate-pulse rounded-sm bg-main">
                            로딩중
                        </p>
                        <p className="w-3/4 animate-pulse rounded-sm bg-main">
                            로딩중
                        </p>
                    </div>
                    <p className="shrink-0 mt-auto text-sm text-right">
                        <span className="inline-block w-2/5 animate-pulse rounded-sm bg-main">
                            로딩중
                        </span>
                    </p>
                </div>
            </div>
        </Card>
    );
};

export const LoadingStuffCardUl = () => {
    return (
        <StuffCardUl>
            <PulseStuffCard />
        </StuffCardUl>
    );
};

export const StuffCardUl = ({
    children,
}: {
    children?: React.ReactElement | null;
}) => {
    return (
        <ul
            className="grid grid-cols-2 gap-4 md:flex-row sm:grid-cols-3 lg:grid-cols-4"
            key="today-stuff-list"
        >
            {children}
        </ul>
    );
};

export const StuffCardLi = ({ stuffList }: { stuffList: StuffProps[] }) => {
    const { setStuff, onOpen } = useContext(StuffModalContext);
    const openEditStuffModal = (stuff: StuffProps) => {
        setStuff(stuff);
        onOpen();
    };

    return stuffList.length === 0 ? (
        <p>조회된 물건이 없습니다.</p>
    ) : (
        stuffList?.map((stuff: StuffProps, index: number) => {
            return (
                <li key={index}>
                    <StuffCard
                        stuff={stuff}
                        onClick={() => {
                            openEditStuffModal(stuff);
                        }}
                    />
                </li>
            );
        })
    );
};
