import { useEffect, useState } from "react";
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
import {
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    useModal,
} from "@/components/modal";
import UnsplashModal from "./unsplash/unsplashModal";

interface TodayStuffCardProps {
    stuff: StuffProps;
    onClick: (isEmpty: boolean) => void;
}

export const TodayStuffCard = ({ stuff, onClick }: TodayStuffCardProps) => {
    return (
        <Card>
            <motion.div className="backface-hidden relative flex md:flex-col gap-4 h-full pb-[100%]">
                <div className="absolute inset-0 flex flex-col p-3">
                    <h3 className="shrink-0 mb-2 text-xl truncate">
                        {stuff.title}
                    </h3>
                    <p className="relative grow leading-5 overflow-hidden">
                        {stuff.summary}
                        <span className="absolute inset-0 top-1/2 bg-gradient-to-t from-sub to-transparent"></span>
                    </p>
                    <span className="shrink-0 text-sm text-right">
                        {stuff.emptyDate}
                    </span>
                </div>
            </motion.div>
        </Card>
    );
};

export const TodayStuffList = () => {
    const [todayStuff, setTodayStuff] = useState<null | TodayStuffProps>(null);
    const [stuffTitle, setStuffTitle] = useState("");
    const [stuffSummary, setStuffSummary] = useState("");

    const { dateString } = getNowDate();

    const stuffModal = useModal();
    const unsplashModal = useModal();

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

    const throwStuff = () => {
        const storageTodayStuff = getStorageTodayStuff();
        storageTodayStuff.stuff.push({
            id: String(Date.now()),
            title: stuffTitle,
            summary: stuffSummary,
            src: "",
            isEmpty: true,
            emptyDate: dateString,
        });
        setStorageTodayStuff(storageTodayStuff);
        setTodayStuff(storageTodayStuff);
        setStuffTitle("");
        setStuffSummary("");
        // setIsOpen(false);
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
                        onClick={stuffModal.onOpen}
                    >
                        <span className="text-2xl">+</span>
                    </motion.button>
                </motion.li>
            </motion.ul>

            <Modal isOpen={stuffModal.isOpen} onClose={stuffModal.onClose}>
                <form>
                    <ModalHeader>
                        <h3 className="text-lg">버릴 물건</h3>
                    </ModalHeader>
                    <ModalBody>
                        <div className="flex flex-col gap-4">
                            <label className="flex flex-col">
                                <h4>이름</h4>
                                <div className="border-b-2 border-point">
                                    <input
                                        className="w-full bg-transparent focus:outline-none"
                                        type="text"
                                        value={stuffTitle}
                                        onChange={(e) =>
                                            setStuffTitle(e.target.value)
                                        }
                                    />
                                </div>
                            </label>
                            <label className="flex flex-col">
                                <h4>설명</h4>
                                <div className="border-b-2 border-point">
                                    <textarea
                                        className="w-full py-0.5 pr-1 bg-transparent focus:outline-none"
                                        rows={3}
                                        value={stuffSummary}
                                        onChange={(e) =>
                                            setStuffSummary(e.target.value)
                                        }
                                    />
                                </div>
                            </label>

                            <label className="flex flex-col">
                                <h4 className="mb-1">사진</h4>
                                <button
                                    type="button"
                                    className="relative flex justify-center items-center pb-[40%] border-2 border-point rounded-lg hover:bg-main transition-all"
                                    onClick={unsplashModal.onOpen}
                                >
                                    <div className="absolute inset-0 flex justify-center items-center">
                                        <span className="text-2xl">+</span>
                                    </div>
                                </button>
                            </label>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <div></div>
                    </ModalFooter>
                </form>
            </Modal>

            <UnsplashModal isOpen={unsplashModal.isOpen} onClose={unsplashModal.onClose} />
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
