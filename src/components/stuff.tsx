import { useEffect, useState } from "react";
import Button from "@/components/button";
import Image from "next/image";
import { StuffHistoryProps, StuffProps } from "@/type";
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
                        <Button text="버렸어요" onClick={() => onClick()} />
                    </div>
                </div>
            </div>
        </Card>
    );
};

export const TodayStuffList = () => {
    const [todayStuff, setTodayStuff] = useState<null | StuffProps[]>(null);
    const { dateString } = getNowDate();

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

    const updateTodayStuff = async () => {
        const todayStuffList = await getTodayStuff();
        setTodayStuff(todayStuffList);
        localStorage.setItem("todayStuff", JSON.stringify(todayStuffList));
    };

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
                    newTodayStuff[index].emptyDate = dateString;
                    const stuffHistory = JSON.parse(storageStuffHistory);
                    stuffHistory.push(newTodayStuff[index]);

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

            if (storageTodayStuff) {
                setTodayStuff(JSON.parse(storageTodayStuff));
            } else {
                const todayStuffList = await getTodayStuff();
                setTodayStuff(todayStuffList);
                localStorage.setItem(
                    "todayStuff",
                    JSON.stringify(todayStuffList)
                );
            }
        })();
    }, []);
    return (
        <AnimatePresence>
            {todayStuff?.every((stuff) => stuff.isEmpty) ? (
                <motion.div
                    className="max-w-80"
                    initial={{ opacity: 0, position: "absolute" }}
                    animate={{
                        position: "relative",
                        opacity: 1,
                        transition: {
                            delay: 1.2,
                            duration: 0.6,
                        },
                    }}
                    exit={{
                        opacity: 0,
                        transition: {
                            duration: 0.6,
                        },
                    }}
                    key="empty-message"
                >
                    <h2 className="mb-2 text-2xl font-bold">
                        오늘도 비움으로 채운 당신
                    </h2>
                    <p className="mb-4">
                        미니멀리즘과 관련된 짧은 글... Lorem ipsum dolor sit
                        amet consectetur adipisicing elit. Vitae, tempore
                        voluptatibus laboriosam aliquam consequuntur rerum!
                        Nobis dolor suscipit odit repellendus eos magni
                        doloremque soluta reiciendis? Possimus distinctio
                        provident labore neque!
                    </p>
                    <Button
                        text="더 비울 수 있어요"
                        onClick={() => {
                            updateTodayStuff();
                        }}
                    />
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, position: "absolute" }}
                    animate={{ opacity: 1, position: "relative" }}
                    transition={{ delay: 0.9 }}
                    exit={{ opacity: 0 }}
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
                        {todayStuff?.map((item: StuffProps, index: number) => {
                            if (item.isEmpty) return null;
                            console.log(index);
                            return (
                                <motion.li
                                    key={index + "ssss"}
                                    layout
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
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
                </motion.div>
            )}
        </AnimatePresence>
    );
};
