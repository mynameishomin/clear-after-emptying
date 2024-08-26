"use client";
import { SIGNOUT_API_URL, site } from "@/variables";
import Link from "next/link";
import { useModal } from "@/components/modal";
import { useContext } from "react";
import { AuthContext } from "@/context/auth";
import { useRouter } from "next/navigation";
import Container from "./container";
import { signOut, useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import Button from "../button";
import { StuffModalContext } from "@/provider/stuffModal";
import { StuffProps } from "@/type";
import StuffModal from "../stuff/stuffModal";

export const Header = () => {
    const router = useRouter();
    const { data: session } = useSession();

    const { setStuff, onOpen } = useContext(StuffModalContext);
    const openAddStuff = () => {
        console.log("????");
        setStuff({} as StuffProps);
        onOpen();
    };

    return (
        <header className="fixed inset-0 bottom-auto mt-4 px-2 overflow-hidden z-50">
            <Container>
                <>
                    <div className="border-2 border-point h-12 pl-4 rounded-md backdrop-blur-3xl sm:pr-4">
                        <div className="flex h-full items-center">
                            <div className="mr-auto sm:mr-4 sm:pr-4 sm:border-r-2 sm:border-point">
                                <Link href="/">{site.title}</Link>
                            </div>

                            {/* <button className="sm:hidden">
                                <FontAwesomeIcon
                                    className="block w-5 h-5 p-4"
                                    icon={faBars}
                                />
                            </button> */}
                            <nav className="ml-auto sm:block">
                                <ul className="flex space-x-2">
                                    <li className="pr-2 border-r-2 border-point">
                                        <Link href="/stuff">버린 물건</Link>
                                    </li>

                                    {session ? (
                                        <li>
                                            <button
                                                type="button"
                                                onClick={() => signOut()}
                                            >
                                                로그아웃
                                            </button>
                                        </li>
                                    ) : (
                                        <li>
                                            <Link href="/signin">로그인</Link>
                                        </li>
                                    )}
                                </ul>
                            </nav>
                        </div>
                    </div>
                </>
            </Container>

            {session && (
                <div className="fixed bottom-6 right-6">
                    <Button
                        onClick={() => {
                            openAddStuff();
                        }}
                    >
                        비우기
                    </Button>
                    <StuffModal />
                </div>
            )}
        </header>
    );
};
