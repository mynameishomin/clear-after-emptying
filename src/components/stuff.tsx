import { useEffect, useState } from "react";
import Button from "@/components/button";
import Image from "next/image";
import { StuffHistoryProps, StuffProps } from "@/type";
import { getNowDate, getRandomArrayItem, getStuffList } from "@/functions";
import { motion } from "framer-motion";
import { Card } from "@/components/card";

interface TodayStuffCardProps extends StuffProps {
    onClick: () => void;
}

export const TodayStuffCard = ({
    title,
    summary,
    src,
    onClick,
}: TodayStuffCardProps) => {
    return (
        <Card>
            <div className="flex flex-col gap-4 h-full">
                <Image
                    src={src}
                    alt={title}
                    width={500}
                    height={500}
                    className="w-full h-full object-cover rounded-lg"
                />
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
        </Card>
    );
};

export const TodayStuffList = () => {
    const [todayStuff, setTodayStuff] = useState<null | StuffProps[]>(null);
    const { dateString } = getNowDate();

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

                const storageStuffHistory =
                    localStorage.getItem("stuffHistory");
                if (storageStuffHistory) {
                    const stuffHistory = JSON.parse(storageStuffHistory);
                    console.log(stuffHistory);
                    if (!stuffHistory[dateString])
                        stuffHistory[dateString] = [];
                    stuffHistory[dateString].push(newTodayStuff[index]);

                    localStorage.setItem(
                        "stuffHistory",
                        JSON.stringify(stuffHistory)
                    );
                }

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
        <div>
            {todayStuff?.every((stuff) => stuff.isEmpty) ? (
                <div>다 비움</div>
            ) : (
                <motion.ul
                    className="flex gap-4"
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0 }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                delayChildren: 0.3,
                                staggerChildren: 0.2,
                            },
                        },
                    }}
                >
                    {todayStuff?.map((item: StuffProps, index: number) => {
                        if (item.isEmpty) return null;
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
            )}
        </div>
    );
};
