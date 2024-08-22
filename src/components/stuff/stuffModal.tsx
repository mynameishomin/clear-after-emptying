import Image from "next/image";
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useModal,
} from "@/components/modal";
import { StuffProps, StuffUrlsProps } from "@/type";
import { useContext, useState } from "react";
import UnsplashModal from "@/components/unsplash/unsplashModal";
import { customFetch } from "@/components/customFetch";
import { StuffModalContext } from "@/provider/stuffModal";

export interface StuffModalProps {
    stuff: StuffProps | null;
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
    stuffSubmitCallback: (stuff: StuffProps) => void;
}

const StuffModal = () => {
    const { stuff, setStuff, isOpen, onClose } = useContext(StuffModalContext);
    const unsplashModal = useModal();

    const onSelectImage = (urls: StuffUrlsProps) => {
        setStuff((prev) => {
            prev.urls = urls;
            return { ...prev };
        });

        unsplashModal.onClose();
    };

    const onChangeStuff = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { value, name } = e.target;
        setStuff((prev) => {
            prev[name] = value;
            return { ...prev };
        });
    };

    const addStuff = async () => {};

    const onSubmitStuff = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await customFetch("/api/stuff", {
            method: stuff?.id ? "PUT" : "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(stuff),
        });

        if (response.ok) {
            const addedStuff: StuffProps = await response.json();

            setStuff({ name: "", summary: "" } as StuffProps);
            // stuffSubmitCallback(addedStuff);
            onClose();
        }
    };

    const deleteStuff = async () => {
        const response = await customFetch("/api/stuff", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(stuff),
        });
        onClose();
    };

    return (
        <>
            {stuff && (
                <form onSubmit={onSubmitStuff}>
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <>
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
                                                                strokeWidth="4"
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
                                                        onClick={
                                                            unsplashModal.onOpen
                                                        }
                                                    >
                                                        바꾸기
                                                    </button>
                                                </>
                                            ) : (
                                                <button
                                                    className="absolute inset-0 flex justify-center items-center"
                                                    type="button"
                                                    onClick={
                                                        unsplashModal.onOpen
                                                    }
                                                >
                                                    <span className="text-2xl">
                                                        +
                                                    </span>
                                                </button>
                                            )}
                                        </div>
                                    </label>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <div className="flex justify-end gap-3">
                                    {stuff.id ? (
                                        <button
                                            className="mr-auto"
                                            type="button"
                                            onClick={deleteStuff}
                                        >
                                            삭제
                                        </button>
                                    ) : null}
                                    <button type="button" onClick={onClose}>
                                        닫기
                                    </button>
                                    <button type="submit">
                                        {stuff.id ? "수정" : "버리기"}
                                    </button>
                                </div>
                            </ModalFooter>
                        </>
                    </Modal>
                </form>
            )}

            <UnsplashModal
                isOpen={unsplashModal.isOpen}
                onClose={unsplashModal.onClose}
                onSelect={onSelectImage}
            />
        </>
    );
};

export default StuffModal;
