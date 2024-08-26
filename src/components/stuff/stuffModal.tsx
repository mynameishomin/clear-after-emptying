"use client";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useModal,
} from "@/components/modal";
import { StuffProps } from "@/type";
import { useContext, useEffect, useState } from "react";
import UnsplashModal from "@/components/unsplash/unsplashModal";
import { customFetch } from "@/components/customFetch";
import { StuffModalContext } from "@/provider/stuffModal";
import { STUFF_API_URL } from "@/variables";
import { StuffContext } from "@/provider/stuff";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export enum HTTPMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    PATCH = "PATCH",
    OPTIONS = "OPTIONS",
    HEAD = "HEAD",
}

export interface StuffModalProps {
    stuff: StuffProps | null;
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
    stuffSubmitCallback: (stuff: StuffProps) => void;
}

const StuffModal = () => {
    const [loading, setLoading] = useState(false);
    const unsplashModal = useModal();
    const { setStuffList } = useContext(StuffContext);
    const { stuff, isOpen, onClose } = useContext(StuffModalContext);
    const { register, handleSubmit, watch, setValue, reset } =
        useForm<StuffProps>();
    const router = useRouter();

    const onSubmit = (httpMethod: HTTPMethod) => {
        const onSubmitWithHttpMethod: SubmitHandler<StuffProps> = async (
            formData
        ) => {
            setLoading(true);
            const response = await customFetch(STUFF_API_URL, {
                method: httpMethod,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                const { data } = await response.json();

                setStuffList((prev) => {
                    const prevList = prev ?? [];

                    switch (httpMethod) {
                        case HTTPMethod.POST:
                            return [data, ...prevList];
                            break;
                        case HTTPMethod.DELETE:
                            return prevList.filter(
                                (stuff) => stuff.id !== formData.id
                            );
                            break;
                        case HTTPMethod.PUT:
                            const index = prevList.findIndex(
                                (stuff) => stuff.id === formData.id
                            );
                            prevList[index] = data;
                            return [...prevList];
                            break;
                        default:
                            return prevList;
                    }
                });
                onClose();
                setLoading(false);
            }
        };
        return onSubmitWithHttpMethod;
    };

    const onSelectImage = (url: string) => {
        setValue("url", url);
        unsplashModal.onClose();
    };

    useEffect(() => {
        if (stuff) {
            setValue("id", stuff.id);
            setValue("name", stuff.name);
            setValue("summary", stuff.summary);
            setValue("url", stuff.url);
            setValue("createdAt", stuff.createdAt);
            setValue("userId", stuff.userId);
        }
    }, [stuff, setValue]);
    return (
        <>
            {stuff && (
                <form>
                    <input type="hidden" defaultValue="" {...register("url")} />
                    <input type="hidden" defaultValue="" {...register("id")} />
                    <input
                        type="hidden"
                        defaultValue=""
                        {...register("createAt")}
                    />

                    <Modal isOpen={isOpen} onClose={onClose}>
                        <>
                            <ModalHeader>
                                <h3 className="text-lg">버릴 물건</h3>
                            </ModalHeader>
                            <ModalBody>
                                <div className="flex flex-col gap-4 h-full overflow-auto">
                                    <label className="flex flex-col">
                                        <h4>이름</h4>
                                        <div className="border-b-2 border-point">
                                            <input
                                                className="w-full bg-transparent focus:outline-none"
                                                type="text"
                                                defaultValue=""
                                                {...register("name")}
                                            />
                                        </div>
                                    </label>
                                    <label className="flex flex-col">
                                        <h4>설명</h4>
                                        <div className="border-b-2 border-point">
                                            <textarea
                                                className="w-full py-0.5 pr-1 bg-transparent focus:outline-none"
                                                rows={3}
                                                defaultValue=""
                                                {...register("summary")}
                                            />
                                        </div>
                                    </label>

                                    <label className="flex flex-col">
                                        <h4 className="mb-1">사진</h4>

                                        <div className="relative flex justify-center items-center pb-[60%] border-2 border-point rounded-lg overflow-hidden hover:bg-main transition-all">
                                            <button
                                                className="absolute inset-0"
                                                type="button"
                                                onClick={unsplashModal.onOpen}
                                            ></button>
                                            {watch("url") ? (
                                                <Image
                                                    className="absolute inset-0 w-full h-full object-cover"
                                                    src={watch("url")}
                                                    alt={watch("name")}
                                                    width="200"
                                                    height="200"
                                                />
                                            ) : (
                                                <span className="absolute inset-0 flex justify-center items-center text-2xl">
                                                    +
                                                </span>
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
                                            onClick={handleSubmit(
                                                onSubmit(HTTPMethod.DELETE)
                                            )}
                                        >
                                            삭제
                                        </button>
                                    ) : null}
                                    <button type="button" onClick={onClose}>
                                        닫기
                                    </button>

                                    {stuff.id ? (
                                        <button
                                            type="button"
                                            onClick={handleSubmit(
                                                onSubmit(HTTPMethod.PUT)
                                            )}
                                        >
                                            수정
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={handleSubmit(
                                                onSubmit(HTTPMethod.POST)
                                            )}
                                        >
                                            버리기
                                        </button>
                                    )}
                                </div>
                            </ModalFooter>
                            {loading ? (
                                <motion.div
                                    className="absolute inset-0 bg-sub flex justify-center items-center"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <svg
                                        className="w-20 animate-spin text-main"
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
                                </motion.div>
                            ) : null}
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
