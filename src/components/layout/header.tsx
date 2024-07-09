"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { SIGNOUT_API_URL, site } from "@/variables";
import Link from "next/link";
import AuthModal from "@/components/auth/authModal";
import { useModal } from "@/components/modal";
import { useContext } from "react";
import { AuthContext } from "@/context/auth";
import { useRouter } from "next/navigation";

export const Header = () => {
    const isLogin = useContext(AuthContext);
    const { isOpen, onOpen, onClose } = useModal();
    const router = useRouter();

    const onLogout = async () => {
        const response = await fetch(SIGNOUT_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if(response.ok) {
            router.refresh();
        }
    };

    return (
        <header className="fixed inset-0 bottom-auto mt-4 px-2 overflow-hidden sm:flex sm:justify-center z-10">
            <div className="border-2 border-point h-12 pl-4 rounded-md backdrop-blur-3xl sm:pr-4">
                <div className="flex h-full items-center">
                    <div className="mr-auto sm:mr-4 sm:pr-2 sm:border-r-2 sm:border-point">
                        {site.title}
                    </div>

                    <button className="sm:hidden">
                        <FontAwesomeIcon
                            className="block w-5 h-5 p-4"
                            icon={faBars}
                        />
                    </button>
                    <nav className="hidden sm:block">
                        <ul className="flex space-x-2">
                            <li className="p-2">
                                <Link href="/">메뉴</Link>
                            </li>
                            <li className="p-2">
                                <Link href="/">메뉴</Link>
                            </li>
                            <li className="p-2">
                                <Link href="/">메뉴</Link>
                            </li>
                            <li className="p-2">
                                <Link href="/">메뉴</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            {!isLogin ? (
                <button
                    className="fixed bottom-5 right-5 py-1 px-2 rounded-lg border-2 border-point bg-sub"
                    onClick={onOpen}
                    type="button"
                >
                    로그인/회원가입
                </button>
            ) : (
                null
                // <button
                //     className="fixed bottom-5 right-5 py-1 px-2 rounded-lg border-2 border-point bg-sub"
                //     onClick={onLogout}
                //     type="button"
                // >
                //     로그아웃
                // </button>
            )}
            <AuthModal isOpen={isOpen} onClose={onClose} />
        </header>
    );
};
