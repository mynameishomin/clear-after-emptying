"use client";
import { site } from "@/variables";
import Link from "next/link";
import { useContext } from "react";
import Container from "./container";
import { signOut, useSession } from "next-auth/react";
import Button from "../button";
import { StuffModalContext } from "@/provider/stuffModal";
import { StuffProps } from "@/type";
import StuffModal from "../stuff/stuffModal";

export const Header = () => {
    const { data: session } = useSession();
    const { setStuff, onOpen } = useContext(StuffModalContext);

    return (
        <header className="fixed inset-0 bottom-auto mt-4 px-2 overflow-hidden z-50">
            <Container>
                <>
                    <div className="border-2 border-point h-12 px-4 rounded-md backdrop-blur-3xl">
                        <div className="flex h-full items-center">
                            <div className="mr-auto sm:mr-4 sm:pr-4 sm:border-r-2 sm:border-point">
                                <Link href="/">{site.title}</Link>
                            </div>

                            <nav className="ml-auto">
                                <ul className="flex space-x-2">
                                    {session ? (
                                        <li>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    signOut({
                                                        callbackUrl: "/",
                                                    });
                                                }}
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
        </header>
    );
};
