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

export const Header = () => {
    const router = useRouter();
    const { data: session } = useSession();

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
                            <nav className="sm:block">
                                <ul className="flex space-x-2">
                                    {session ? (
                                        <li className="p-2">
                                            <button
                                                type="button"
                                                onClick={() => signOut()}
                                            >
                                                로그아웃
                                            </button>
                                        </li>
                                    ) : (
                                        <li className="p-2">
                                            <Link href="/signin">로그인</Link>
                                        </li>
                                    )}
                                </ul>
                            </nav>
                        </div>
                    </div>
                </>
            </Container>
        </header>
    );
};
