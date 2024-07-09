import Image from "next/image";
import { StuffProps } from "@/type";
import { motion } from "framer-motion";
import { Card } from "@/components/card";

interface StuffCardProps {
    stuff: StuffProps;
    onClick: (isEmpty: boolean) => void;
}

export const StuffCard = ({ stuff, onClick }: StuffCardProps) => {
    return (
        <Card>
            <motion.div className="backface-hidden relative flex md:flex-col gap-4 h-full pb-[100%]">
                <Image
                    className="absolute w-full h-full object-cover"
                    src={stuff.urls.regular}
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
                        {new Date(stuff.createdAt).toLocaleDateString()}
                    </span>
                </div>
            </motion.div>
        </Card>
    );
};

export const PulseStuffCard = () => {
    return (
        <Card>
            <div className="relative pb-[100%]">
                <div className="absolute inset-0 flex flex-col p-3 text-transparent">
                    <h3 className="shrink-0 mb-2 text-xl animate-pulse rounded-sm bg-main">
                        로딩중
                    </h3>
                    <div className="flex flex-col gap-1">
                        <p className="animate-pulse rounded-sm bg-main">로딩중</p>
                        <p className="w-3/4 animate-pulse rounded-sm bg-main">로딩중</p>
                    </div>
                    <p className="shrink-0 mt-auto text-sm text-right">
                        <span className="inline-block w-2/5 animate-pulse rounded-sm bg-main">로딩중</span>
                    </p>
                </div>
            </div>
        </Card>
    );
};
