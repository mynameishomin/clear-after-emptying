"use client";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUnsplash } from "@fortawesome/free-brands-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "@/components/modal";
import { useEffect, useRef, useState } from "react";
import { UNSPLASH_API_PATH } from "@/variables";

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
    onSelect: (url: string) => void;
}

const UnsplashModal = ({ isOpen, onClose, onSelect }: UnsplashModalProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [keyword, setKeyword] = useState("");
    const [photoList, setPhotoList] = useState<UnsplashPhotoProps[]>([]);
    const photoListRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        if (isLoading) return false;
        const listElement = photoListRef.current;
        if (!listElement) return false;

        const scrollY =
            listElement.scrollHeight -
            listElement.scrollTop -
            listElement.clientHeight;

        if (scrollY < 200) {
            getPhotoList(keyword || "stuff", photoList.length / 10 + 1);
        }
    };

    const onSearch = async (e: React.FormEvent, keyword: string) => {
        e.preventDefault();
        setPhotoList([]);
        getPhotoList(keyword, 1);
    };

    const getPhotoList = async (keyword: string, page: number) => {
        setIsLoading(true);
        const response = await fetch(
            `${UNSPLASH_API_PATH}?page=${page}&keyword=${keyword}`
        );
        const json = await response.json();
        setPhotoList((prev) => {
            return [...prev, ...json.data.results];
        });
        setIsLoading(false);
    };

    useEffect(() => {
        getPhotoList("stuff", 1);
    }, []);

    useEffect(() => {
        photoListRef.current?.addEventListener("scroll", handleScroll);

        return () => {
            photoListRef.current?.removeEventListener("scroll", handleScroll);
        };
    }, [photoListRef, isLoading]);

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
                    <div className="overflow-auto h-full" ref={photoListRef}>
                        <ul className="grid grid-cols-2 gap-2">
                            {!photoList || photoList?.length === 0 ? (
                                <li>검색 결과가 없습니다.</li>
                            ) : (
                                photoList?.map((photo) => {
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
                                                onClick={() =>
                                                    onSelect(photo.urls.regular)
                                                }
                                            >
                                                선택
                                            </button>
                                        </li>
                                    );
                                })
                            )}
                        </ul>
                    </div>
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
