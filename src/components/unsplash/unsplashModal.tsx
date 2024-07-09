"use client";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUnsplash } from "@fortawesome/free-brands-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "@/components/modal";
import { useEffect, useState } from "react";
import { UNSPLASH_API_PATH } from "@/variables";
import { StuffUrlsProps } from "@/type";

interface UnsplashPhotoProps {
    id: string;
    alt_description: string;
    urls: {
        regular: string;
        thumb: string;
    };
}

interface UnsplashModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (urls: StuffUrlsProps) => void;
}

const UnsplashModal = ({ isOpen, onClose, onSelect }: UnsplashModalProps) => {
    const [keyword, setKeyword] = useState("");
    const [photoList, setPhotoList] = useState<null | UnsplashPhotoProps[]>(
        null
    );

    const onSearch = async (e: React.FormEvent, keyword: string) => {
        e.preventDefault();
        getPhotoList(keyword);
    };

    const getPhotoList = async (keyword: string) => {
        const response = await fetch(`${UNSPLASH_API_PATH}?keyword=${keyword}`);
        const json = await response.json();
        setPhotoList(json.data.results);
    };

    useEffect(() => {
        getPhotoList("stuff");
    }, []);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <>
                <ModalHeader>
                    <div className="flex justify-between items-center">
                        <h3 className="flex items-end gap-1">
                            <FontAwesomeIcon
                                className="w-6 h-6"
                                icon={faUnsplash}
                            />
                            <span className="leading-none">Unsplash</span>
                        </h3>
                        <form
                            onSubmit={(e: React.FormEvent) => {
                                onSearch(e, keyword);
                            }}
                        >
                            <div className="relative w-32">
                                <div className="flex items-center border-b-2 border-point">
                                    <input
                                        className="w-full py-0.5 pr-1 bg-transparent focus:outline-none"
                                        title="검색어"
                                        type="text"
                                        value={keyword}
                                        onChange={(e) =>
                                            setKeyword(e.target.value)
                                        }
                                    />
                                    <button className="p-1" type="submit">
                                        <FontAwesomeIcon
                                            className="block w-4 h-4"
                                            icon={faMagnifyingGlass}
                                        />
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <ul className="grid grid-cols-2 gap-2">
                        {photoList?.map((photo) => {
                            return (
                                <li
                                    className="relative pb-[100%] overflow-hidden rounded-lg border-2 border-point"
                                    key={photo.id}
                                >
                                    <div className="absolute inset-0">
                                        <Image
                                            className="w-full h-full object-cover"
                                            src={photo.urls.regular}
                                            alt={photo.alt_description}
                                            width="200"
                                            height="200"
                                        />
                                    </div>
                                    <button
                                        className="absolute bottom-1 right-1 py-px px-2 text-sm rounded-md border-2 border-point bg-sub"
                                        type="button"
                                        onClick={() => onSelect(photo.urls)}
                                    >
                                        선택
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </ModalBody>
                <ModalFooter>
                    <div className="flex justify-end">
                        <button onClick={onClose} type="button">
                            닫기
                        </button>
                    </div>
                </ModalFooter>
            </>
        </Modal>
    );
};

export default UnsplashModal;
