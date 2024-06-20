import { useEffect, useState } from "react";
import Button from "@/components/button";
import Image from "next/image";
import { StuffProps, TodayStuffProps } from "@/type";
import { getNowDate, getRandomArrayItem } from "@/functions";
import { AnimatePresence, motion } from "framer-motion";
import { Card } from "@/components/card";

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
    return (
        <Card>
            <div className="h-full">
                <motion.div
                    initial={{ rotateY: 0 }}
                    animate={{ rotateY: isEmpty ? 0 : 180 }}
                    className="backface-hidden absolute inset-0 flex p-4"
                >
                    <motion.div
                        className="flex flex-col mt-auto"
                        initial={{ rotateY: 180 }}
                    >
                        <div className="mb-2">
                            <h3 className="text-lg font-bold">{title}</h3>
                            <p className="text-sm">{summary}</p>
                        </div>

                        <div className="flex flex-col mt-auto gap-2">
                            <Button text="버렸어요" onClick={() => onClick()} />
                        </div>
                    </motion.div>
                </motion.div>
                <motion.div
                    className="backface-hidden relative flex flex-col p-4 gap-4 h-full bg-white"
                    initial={{ rotateY: 0 }}
                    animate={{ rotateY: isEmpty ? 180 : 0 }}
                >
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
                            <Button text="버렸어요" onClick={() => onClick()} />
                        </div>
                    </div>
                </motion.div>
            </div>
        </Card>
    );
};

const getStuffList = async (): Promise<StuffProps[]> => {
    const response = await fetch("/stuff.json");
    const stuffList = await response.json();
    return stuffList.stuff;
};

const getTodayStuff = async () => {
    const stuffList = await getStuffList();
    const randomStuff = getRandomArrayItem<StuffProps>(stuffList, 3);
    randomStuff.forEach((item) => {
        item.isEmpty = false;
        item.emptyDate = "";
    });

    return randomStuff;
};

export const TodayStuffList = () => {
    const [todayStuff, setTodayStuff] = useState<null | TodayStuffProps>(null);
    const { dateString } = getNowDate();

    const updateTodayStuff = async () => {
        const todayStuffList = await getTodayStuff();
        setTodayStuff({ date: dateString, stuff: todayStuffList });
        localStorage.setItem(
            "todayStuff",
            JSON.stringify({ date: dateString, stuff: todayStuffList })
        );
    };

    const emptyingStuff = (index: number) => {
        return () => {
            setTodayStuff((prevTodayStuff) => {
                if (!prevTodayStuff) return null;
                const newTodayStuffList = [...prevTodayStuff.stuff];
                newTodayStuffList[index].isEmpty = true;
                prevTodayStuff.stuff = newTodayStuffList;
                localStorage.setItem(
                    "todayStuff",
                    JSON.stringify(prevTodayStuff)
                );

                const storageStuffHistory =
                    localStorage.getItem("stuffHistory");
                if (storageStuffHistory) {
                    newTodayStuffList[index].emptyDate = dateString;
                    const stuffHistory = JSON.parse(storageStuffHistory);
                    stuffHistory.push(newTodayStuffList[index]);

                    localStorage.setItem(
                        "stuffHistory",
                        JSON.stringify(stuffHistory)
                    );
                }

                return {
                    date: prevTodayStuff.date,
                    stuff: newTodayStuffList,
                };
            });
        };
    };

    useEffect(() => {
        (async () => {
            const storageTodayStuff = localStorage.getItem("todayStuff");

            if (storageTodayStuff) {
                setTodayStuff(JSON.parse(storageTodayStuff));
            } else {
                const todayStuffList = await getTodayStuff();
                setTodayStuff({ date: dateString, stuff: todayStuffList });
                localStorage.setItem(
                    "todayStuff",
                    JSON.stringify({ date: dateString, stuff: todayStuffList })
                );
            }
        })();
    }, [dateString]);
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, position: "absolute" }}
                animate={{ opacity: 1, position: "relative" }}
                transition={{ delay: 0.9 }}
                key="today-stuff-list"
            >
                <motion.ul
                    className="flex justify-center gap-4"
                    animate={{
                        transition: {
                            staggerChildren: 0.2,
                        },
                    }}
                >
                    <AnimatePresence>
                        {todayStuff?.stuff.map(
                            (item: StuffProps, index: number) => {
                                return (
                                    <motion.li
                                        key={`todayStuff_${index}`}
                                        layout
                                        initial={{
                                            y: 20,
                                            opacity: 0,
                                            perspective: 800,
                                        }}
                                        animate={{
                                            y: 0,
                                            opacity: 1,
                                            rotateY: item.isEmpty ? 180 : 0,
                                        }}
                                        exit={{ opacity: 0, rotateY: 50 }}
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
                            }
                        )}
                    </AnimatePresence>
                </motion.ul>
            </motion.div>
        </AnimatePresence>
    );
};
