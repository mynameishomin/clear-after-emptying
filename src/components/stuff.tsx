import { useEffect, useState } from "react";
import Button from "@/components/button";
import Image from "next/image";
import { StuffHistoryProps, StuffProps, TodayStuffProps } from "@/type";
import {
    createGetStorage,
    createSetStorage,
    getNowDate,
    getRandomArrayItem,
} from "@/functions";
import { AnimatePresence, motion } from "framer-motion";
import { Card } from "@/components/card";
import { STUFF_HISTORY, TODAY_STUFF } from "@/variables";

interface TodayStuffCardProps {
    stuff: StuffProps;
    onClick: (isEmpty: boolean) => void;
}

export const TodayStuffCard = ({ stuff, onClick }: TodayStuffCardProps) => {
    return (
        <Card>
            <div className="h-full">
                <motion.div
                    initial={{ rotateY: 0 }}
                    animate={{ rotateY: stuff.isEmpty ? 0 : 180 }}
                    className="backface-hidden absolute inset-0 flex p-4"
                >
                    <motion.div
                        className="flex flex-col mt-auto"
                        initial={{ rotateY: 180 }}
                    >
                        <div className="mb-2">
                            <h3 className="text-lg font-bold">{stuff.title}</h3>
                            <p className="text-sm">{stuff.summary}</p>
                        </div>

                        <div className="flex flex-col mt-auto gap-2">
                            <Button
                                text="남길래요"
                                onClick={() => onClick(false)}
                            />
                        </div>
                    </motion.div>
                </motion.div>
                <motion.div
                    className="backface-hidden relative flex flex-col p-4 gap-4 h-full bg-white"
                    initial={{ rotateY: 0 }}
                    animate={{ rotateY: stuff.isEmpty ? 180 : 0 }}
                >
                    <Image
                        src={stuff.src}
                        alt={stuff.title}
                        width={500}
                        height={500}
                        className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="flex flex-col mt-auto">
                        <div className="mb-2">
                            <h3 className="text-lg font-bold">{stuff.title}</h3>
                            <p className="text-sm">{stuff.summary}</p>
                        </div>

                        <div className="flex flex-col mt-auto gap-2">
                            <Button
                                text="버릴래요"
                                onClick={() => onClick(true)}
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </Card>
    );
};

export const TodayStuffList = () => {
    const [todayStuff, setTodayStuff] = useState<null | TodayStuffProps>(null);
    const { dateString } = getNowDate();

    const toggleEmptyingStuff = (index: number) => {
        return (isEmpty: boolean) => {
            setTodayStuff((prevTodayStuff) => {
                if (!prevTodayStuff) return null;

                const newTodayStuffList = [...prevTodayStuff.stuff];
                newTodayStuffList[index].isEmpty = isEmpty;
                prevTodayStuff.stuff = newTodayStuffList;
                setStorageTodayStuff(prevTodayStuff);

                const storageStuffHistory = getStorageStuffHistory();

                if (storageStuffHistory) {
                    newTodayStuffList[index].emptyDate = dateString;
                    const stuffHistory = storageStuffHistory;
                    stuffHistory.push(newTodayStuffList[index]);

                    setStorageStuffHistory(stuffHistory);
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
            const storageTodayStuff = getStorageTodayStuff();

            if (storageTodayStuff) {
                setTodayStuff(storageTodayStuff);
            } else {
                const todayStuffList = await getTodayStuff();
                const newTodayStuff = {
                    date: dateString,
                    stuff: todayStuffList,
                };
                setTodayStuff(newTodayStuff);
                setStorageTodayStuff(newTodayStuff);
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
                    className="flex flex-col justify-center gap-4"
                    initial={{ perspective: 800 }}
                    animate={{
                        transition: {
                            staggerChildren: 0.2,
                        },
                    }}
                >
                    <AnimatePresence>
                        {todayStuff?.stuff.map(
                            (stuff: StuffProps, index: number) => {
                                return (
                                    <motion.li
                                        key={`todayStuff_${index}`}
                                        layout
                                        initial={{
                                            y: 20,
                                            opacity: 0,
                                        }}
                                        animate={{
                                            y: 0,
                                            opacity: 1,
                                            rotateY: stuff.isEmpty ? 180 : 0,
                                        }}
                                        exit={{ opacity: 0, rotateY: 50 }}
                                    >
                                        <TodayStuffCard
                                            stuff={stuff}
                                            onClick={toggleEmptyingStuff(index)}
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

const getStuffList = async (): Promise<StuffProps[]> => {
    return (await (await fetch("/stuff.json")).json()).stuff;
};

const getStorageTodayStuff = createGetStorage<TodayStuffProps>(TODAY_STUFF);
const setStorageTodayStuff = createSetStorage<TodayStuffProps>(TODAY_STUFF);

const getStorageStuffHistory = createGetStorage<StuffProps[]>(STUFF_HISTORY);
const setStorageStuffHistory = createSetStorage<StuffProps[]>(STUFF_HISTORY);

const getTodayStuff = async () => {
    const stuffList = await getStuffList();
    const randomStuff = getRandomArrayItem<StuffProps>(stuffList, 3);
    randomStuff.forEach((item, index) => {
        item.id = `${Date.now()}${index}`;
        item.isEmpty = false;
        item.emptyDate = "";
    });

    return randomStuff;
};
