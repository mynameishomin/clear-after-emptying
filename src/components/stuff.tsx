import { useEffect, useState } from "react";
import Button from "@/components/button";
import Image from "next/image";
import { StuffProps } from "@/type";
import { getRandomArrayItem, getStuffList } from "@/functions";
import { motion } from "framer-motion";

interface TodayStuffCardProps extends StuffProps {
    onClick: () => void;
}

export const TodayStuffCard = ({
    title,
    summary,
    src,
    isEmpty,
    onClick,
}: TodayStuffCardProps) => {
    if (isEmpty) return null;

    return (
        <div className="flex flex-col gap-4 w-full h-full p-4 rounded-sm bg-white max-w-lg shadow-lg">
            <div className="max-w-52">
                <Image
                    src={src}
                    alt={title}
                    width={500}
                    height={500}
                    className="w-full h-full object-cover rounded-sm"
                />
            </div>
            <div className="flex flex-col mt-auto">
                <div className="mb-2">
                    <h3 className="text-lg font-bold">{title}</h3>
                    <p className="text-sm">{summary}</p>
                </div>

                <div className="flex flex-col mt-auto gap-2">
                    <Button text="버렸어요." onClick={() => onClick()} />
                </div>
            </div>
        </div>
    );
};

export const TodayStuffList = () => {
    const [todayStuff, setTodayStuff] = useState<null | StuffProps[]>(null);

    const emptyingStuff = (index: number) => {
        return () => {
            setTodayStuff((prevTodayStuff) => {
                if (!prevTodayStuff) return null;
                const newTodayStuff = [...prevTodayStuff];
                newTodayStuff[index].isEmpty = true;
                localStorage.setItem(
                    "todayStuff",
                    JSON.stringify(newTodayStuff)
                );
                return newTodayStuff;
            });
        };
    };

    useEffect(() => {
        (async () => {
            const storageTodayStuff = localStorage.getItem("todayStuff");
            const stuffList = (await getStuffList()) as StuffProps[];

            if (storageTodayStuff) {
                setTodayStuff(JSON.parse(storageTodayStuff));
            } else {
                const randomStuff = getRandomArrayItem<StuffProps>(
                    stuffList,
                    3
                );
                randomStuff.forEach((item) => (item.isEmpty = false));

                setTodayStuff(randomStuff);
                localStorage.setItem("todayStuff", JSON.stringify(randomStuff));
            }
        })();
    }, []);
    return (
        <motion.ul
            className="flex gap-4"
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 1, scale: 0 },
                visible: {
                    opacity: 1,
                    scale: 1,
                    transition: {
                        delayChildren: 0.3,
                        staggerChildren: 0.2,
                    },
                },
            }}
        >
            {todayStuff?.map((item: StuffProps, index: number) => {
                return (
                    <motion.li
                        key={index}
                        layout
                        layoutId={index + "_"}
                        variants={{
                            hidden: { y: 20, opacity: 0 },
                            visible: {
                                y: 0,
                                opacity: 1,
                            },
                        }}
                    >
                        <TodayStuffCard
                            title={item.title}
                            summary={item.summary}
                            src={item.src}
                            isEmpty={item.isEmpty}
                            onClick={emptyingStuff(index)}
                        />
                    </motion.li>
                );
            })}
        </motion.ul>
    );
};
