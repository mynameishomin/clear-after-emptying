import { useEffect, useState } from "react";
import Image from "next/image";
import { StuffProps, TodayStuffProps } from "@/type";
import {
    createGetStorage,
    createSetStorage,
    getNowDate,
    getRandomArrayItem,
} from "@/functions";
import { AnimatePresence, motion } from "framer-motion";
import { Card } from "@/components/card";
import { STUFF_HISTORY, TODAY_STUFF } from "@/variables";
import { Modla } from "@/components/modal";

interface TodayStuffCardProps {
    stuff: StuffProps;
    onClick: (isEmpty: boolean) => void;
}

export const TodayStuffCard = ({ stuff, onClick }: TodayStuffCardProps) => {
    return (
        <Card>
            <motion.div className="backface-hidden relative flex md:flex-col gap-4 h-full pb-[100%]">
                <Image
                    src={stuff.src}
                    alt={stuff.title}
                    width={500}
                    height={500}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0">
                    {stuff.isEmpty ? (
                        <motion.button
                            layout
                            layoutId={stuff.id}
                            className="absolute -inset-1/4 bg-main"
                        >
                            버렸어요
                        </motion.button>
                    ) : (
                        <motion.div
                            className="absolute inset-0 top-auto flex flex-col -m-0.5 px-4 py-2 border-2 border-point rounded-t-lg overflow-hidden bg-main"
                            initial={{ y: -100 }}
                            animate={{ y: 0 }}
                        >
                            <h3 className="mb-1">{stuff.title}</h3>
                            <motion.button
                                layout
                                layoutId={stuff.id}
                                className="w-full py-1 px-4 border-2 border-point rounded-full bg-sub"
                                whileHover={{ scale: 1.08 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => onClick(true)}
                            >
                                버릴래요
                            </motion.button>
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </Card>
    );
};

export const TodayStuffList = () => {
    const [todayStuff, setTodayStuff] = useState<null | TodayStuffProps>(null);
    const { dateString } = getNowDate();

    const [isOpen, setIsOpen] = useState(false);

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

    const throwStuff = ({
        id,
        title,
        summary,
        src,
        isEmpty,
        emptyDate,
    }: StuffProps) => {
        const stuffHistory = getStorageStuffHistory();
        stuffHistory.push({
            id: id,
            title: title,
            summary: summary,
            src: src,
            isEmpty: isEmpty,
            emptyDate: emptyDate,
        });
        setStorageStuffHistory(stuffHistory);
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
                className="grid grid-cols-2 gap-4 md:flex-row sm:grid-cols-3"
                initial="hidden"
                animate="visible"
                variants={container}
            >
                {todayStuff.stuff.map((stuff: StuffProps, index: number) => {
                    return (
                        <motion.li key={stuff.id} layout variants={item}>
                            <TodayStuffCard
                                stuff={stuff}
                                onClick={toggleEmptyingStuff(stuff.id, index)}
                            />
                        </motion.li>
                    );
                })}
                <motion.li
                    className="relative pb-[100%]"
                    key="add-stuff-card"
                    layout
                    variants={item}
                >
                    <motion.button
                        className="absolute inset-0 flex justify-center items-center w-full h-full border-2 border-point rounded-lg hover:bg-main transition-all"
                        onClick={() => {
                            setIsOpen((prev) => !prev);
                        }}
                    >
                        <span className="text-2xl">+</span>
                    </motion.button>
                </motion.li>
            </motion.ul>
            <Modla isOpen={isOpen} setIsOpen={setIsOpen} onAction={throwStuff}>
                <div className="flex flex-col gap-4 min-w-64">
                    <label className="flex flex-col">
                        <h3 className="mb-1 pl-1">이름</h3>
                        <input
                            className="py-1 px-2 rounded-lg border-2 border-point"
                            type="text"
                        />
                    </label>

                    <label className="flex flex-col">
                        <h3 className="mb-1 pl-1">설명</h3>
                        <textarea
                            className="py-1 px-2 rounded-lg border-2 border-point"
                            rows={3}
                        />
                    </label>
                </div>
            </Modla>
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
    const randomStuff = getRandomArrayItem<StuffProps>(await getStuffList(), 0);
    randomStuff.forEach((item, index) => {
        item.id = `${Date.now()}${index}`;
        item.isEmpty = false;
        item.emptyDate = "";
    });

    return randomStuff;
};
