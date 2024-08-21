"use client";
import Image from "next/image";
import { signIn } from "next-auth/react";
import Container from "@/components/layout/container";
import Link from "next/link";

export default function Signup() {
    return (
        <Container>
            <div className="pt-8 flex justify-center">
                <div className="flex flex-col items-center max-w-60 w-full">
                    <h2 className="mb-8 text-2xl">로그인</h2>

                    <ul className="flex flex-col gap-2 w-full">
                        <li>
                            <button
                                className="flex items-center justify-center w-full p-2 rounded-md border-2 border-point transition hover:bg-point hover:text-white"
                                type="button"
                                onClick={() =>
                                    signIn("naver", {
                                        redirect: true,
                                        callbackUrl: "/",
                                    })
                                }
                            >
                                <Image
                                    className="mr-2"
                                    src="/images/logo/naver.svg"
                                    alt="네이버"
                                    width={32}
                                    height={32}
                                />
                                <span>네이버 로그인</span>
                            </button>
                        </li>
                        <li>
                            <button
                                className="flex items-center justify-center w-full p-2 rounded-md border-2 border-point transition hover:bg-point hover:text-white"
                                type="button"
                            >
                                <Image
                                    className="mr-2"
                                    src="/images/logo/kakao.svg"
                                    alt="카카오"
                                    width={32}
                                    height={32}
                                />
                                <span>카카오 로그인 가짜</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </Container>
    );
}
