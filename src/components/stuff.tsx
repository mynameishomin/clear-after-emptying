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
                    className="backface-hidden absolute inset-0 flex"
                    initial={{ rotateY: 0 }}
                    animate={{ rotateY: stuff.isEmpty ? 0 : 180 }}
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
                    className="backface-hidden relative flex md:flex-col gap-4 h-full pb-[100%]"
                    initial={{ rotateY: 0 }}
                    animate={{ rotateY: stuff.isEmpty ? 180 : 0 }}
                >
                    <Image
                        src={stuff.src}
                        alt={stuff.title}
                        width={500}
                        height={500}
                        className="absolute inset-0 w-full h-full object-cover rounded-lg"
                    />

                    <div className="absolute left-0 right-0 bottom-0 p-1">
                        <div className="flex backdrop-blur-md rounded-md overflow-hidden">
                            <h3 className="text-white">{stuff.title}</h3>

                            <span>버릴래료</span>
                            {/* <Button
                                    text="버릴래요"
                                    onClick={() => onClick(true)}
                                /> */}
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

    const toggleEmptyingStuff = (stuffID: string, index: number) => {
        return (isEmpty: boolean) => {
            setTodayStuff((prevTodayStuff) => {
                if (!prevTodayStuff) return null;

                const newTodayStuffList = [...prevTodayStuff.stuff];
                newTodayStuffList[index].isEmpty = isEmpty;
                prevTodayStuff.stuff = newTodayStuffList;
                setStorageTodayStuff(prevTodayStuff);

                const storageStuffHistory = getStorageStuffHistory();

                newTodayStuffList[index].emptyDate = dateString;

                const stuffIndex = storageStuffHistory.findIndex(
                    (stuff) => stuff.id === stuffID
                );

                if (isEmpty) {
                    storageStuffHistory.push(newTodayStuffList[index]);
                } else {
                    storageStuffHistory.splice(stuffIndex);
                }

                setStorageStuffHistory(storageStuffHistory);

                return {
                    date: prevTodayStuff.date,
                    stuff: newTodayStuffList,
                };
            });
        };
    };

    const container = {
        visible: {
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2,
            },
        },
    };

    const item = {
        hidden: { y: 40, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
        },
    };

    useEffect(() => {
        (async () => {
            const storageTodayStuff = getStorageTodayStuff();

            if (storageTodayStuff && storageTodayStuff.date === dateString) {
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

    if (!todayStuff) return null;

    return (
        <AnimatePresence>
            <motion.ul
                className="grid grid-cols-2 gap-4 md:flex-row"
                initial="hidden"
                animate="visible"
                variants={container}
            >
                {todayStuff.stuff.map((stuff: StuffProps, index: number) => {
                    return (
                        <motion.li
                            key={stuff.id}
                            layout
                            variants={item}
                            animate={{ rotateY: stuff.isEmpty ? 180 : 0 }}
                        >
                            <TodayStuffCard
                                stuff={stuff}
                                onClick={toggleEmptyingStuff(stuff.id, index)}
                            />
                        </motion.li>
                    );
                })}
            </motion.ul>
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
    const randomStuff = getRandomArrayItem<StuffProps>(await getStuffList(), 5);
    randomStuff.forEach((item, index) => {
        item.id = `${Date.now()}${index}`;
        item.isEmpty = false;
        item.emptyDate = "";
    });

    return randomStuff;
};
