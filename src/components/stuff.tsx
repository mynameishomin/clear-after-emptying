import { useEffect, useState } from "react";
import Image from "next/image";
import { StuffProps, StuffUrlsProps, TodayStuffProps } from "@/type";
import { AnimatePresence, motion } from "framer-motion";
import { Card } from "@/components/card";
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
                        {stuff.name}
                    </h3>
                    <p className="relative grow leading-5 overflow-hidden">
                        {stuff.summary}
                        <span className="absolute inset-0 top-1/2 bg-gradient-to-t from-sub to-transparent"></span>
                    </p>
                    <span className="shrink-0 text-sm text-right">
                        {stuff.createdAt}
                    </span>
                </div>
            </motion.div>
        </Card>
    );
};

export const TodayStuffList = () => {
    const [todayStuff, setTodayStuff] = useState<null | TodayStuffProps>(null);
    const [stuff, setStuff] = useState<StuffProps>({} as StuffProps);
    const stuffModal = useModal();
    const unsplashModal = useModal();

    const onChangeStuff = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { value, name } = e.target;
        setStuff((prev) => {
            prev[name] = value;
            return { ...prev };
        });
    };

    const onSelectImage = (urls: StuffUrlsProps) => {
        setStuff((prev) => {
            prev.urls = urls;
            return { ...prev };
        });

        unsplashModal.onClose();
    };

    const onSubmitStuff = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetch("/api/stuff", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(stuff),
        });

        console.log("asdas");
        setStuff({ name: "", summary: "" } as StuffProps);
        stuffModal.onClose();
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

    return (
        <>
            <AnimatePresence>
                <motion.ul
                    className="grid grid-cols-2 gap-4 md:flex-row sm:grid-cols-3"
                    key="today-stuff-list"
                    initial="hidden"
                    animate="visible"
                    variants={container}
                >
                    {todayStuff?.stuff.map(
                        (stuff: StuffProps, index: number) => {
                            return (
                                <motion.li key={index} layout variants={item}>
                                    <TodayStuffCard
                                        stuff={stuff}
                                        onClick={() => {}}
                                    />
                                </motion.li>
                            );
                        }
                    )}
                    <motion.li
                        className="relative pb-[100%]"
                        key={Date.now()}
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
            </AnimatePresence>

            <Modal isOpen={stuffModal.isOpen} onClose={stuffModal.onClose}>
                <form onSubmit={onSubmitStuff}>
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
                                        value={stuff.name}
                                        onChange={onChangeStuff}
                                        name="name"
                                    />
                                </div>
                            </label>
                            <label className="flex flex-col">
                                <h4>설명</h4>
                                <div className="border-b-2 border-point">
                                    <textarea
                                        className="w-full py-0.5 pr-1 bg-transparent focus:outline-none"
                                        rows={3}
                                        value={stuff.summary}
                                        onChange={onChangeStuff}
                                        name="summary"
                                    />
                                </div>
                            </label>

                            <label className="flex flex-col">
                                <h4 className="mb-1">사진</h4>

                                <div className="relative flex justify-center items-center pb-[60%] border-2 border-point rounded-lg overflow-hidden hover:bg-main transition-all">
                                    {stuff.urls ? (
                                        <>
                                            <div className="absolute inset-0 flex justify-center items-center">
                                                <svg
                                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        stroke-width="4"
                                                    ></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    ></path>
                                                </svg>
                                            </div>
                                            <Image
                                                className="absolute inset-0 w-full h-full object-cover"
                                                src={stuff.urls.regular}
                                                alt={stuff.name}
                                                width="200"
                                                height="200"
                                            />
                                            <button
                                                className="absolute bottom-1 right-1 py-px px-2 text-sm rounded-md border-2 border-point bg-sub"
                                                type="button"
                                                onClick={unsplashModal.onOpen}
                                            >
                                                바꾸기
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            className="absolute inset-0 flex justify-center items-center"
                                            type="button"
                                            onClick={unsplashModal.onOpen}
                                        >
                                            <span className="text-2xl">+</span>
                                        </button>
                                    )}
                                </div>
                            </label>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <div className="flex justify-end gap-3">
                            <button type="button" onClick={stuffModal.onClose}>
                                닫기
                            </button>
                            <button type="submit">버리기</button>
                        </div>
                    </ModalFooter>
                </form>
            </Modal>

            <UnsplashModal
                isOpen={unsplashModal.isOpen}
                onClose={unsplashModal.onClose}
                onSelect={onSelectImage}
            />
        </>
    );
};
