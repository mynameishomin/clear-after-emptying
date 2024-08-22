"use client";
import { useContext } from "react";
import Container from "@/components/layout/container";
import TodayStuffList from "@/components/stuff/todayStuffList";
import { site } from "@/variables";
import { useEffect } from "react";
import HistoryStuffList from "@/components/stuff/historyStuffList";
import StuffModal from "@/components/stuff/stuffModal";
import { useModal } from "@/components/modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import { useSession, signIn } from "next-auth/react";
import Button from "@/components/button";
import Link from "next/link";

export default function Home() {
    const stuffModal = useModal();

    const data = useSession();
    // console.log(data);

    // fetch("/api/stuff");

    return (
        <div className="flex flex-col md:justify-center w-full">
            <Container>
                <>
                    <section className="mt-20 lg:mt-22 mb-12">
                        <h1 className="mb-1 text-4xl">
                            {site.title}:
                            <br />
                            {site.summary}
                        </h1>
                        <p>
                            우리가 소유하는 물건들은 우리의 마음과 공간을
                            차지합니다. 불필요한 물건을 비워내고, 오직 필요한
                            것들로만 우리의 삶을 채울 때, 우리는 진정으로
                            자유로워질 수 있습니다. 단순함 속에서 진정한 행복과
                            평화를 찾으며, 물질적인 소유가 아닌 경험과 관계를
                            소중히 여기는 삶을 살아가봅시다.
                        </p>
                    </section>

                    <section className="flex justify-center items-center gap-8 mb-20">
                        <div>
                            <div className="w-[600px] h-72 bg-gray-300 rounded-md"></div>
                        </div>
                        <div className="flex flex-col items-start">
                            <h2 className="mb-1 text-5xl">비우고 기록하세요</h2>
                            <p className="mb-6">
                                비움 뒤 맑음은 내가 그동안 얼마나 많은 물건을
                                비웠는지, 어떤 종류의 물건을, 어떻게 비웠는지 한
                                눈에 볼 수 있게 정리해줍니다.
                            </p>
                            <Link href="/stuff">
                                비우러 가기
                                <FontAwesomeIcon icon={faArrowRight} />
                            </Link>
                        </div>
                    </section>
                    <section className="flex justify-center items-center gap-8 mb-20">
                        <div className="flex flex-col items-end text-right">
                            <h2 className="mb-1 text-5xl">비우고 기록하세요</h2>
                            <p className="mb-6">
                                비움 뒤 맑음은 내가 그동안 얼마나 많은 물건을
                                비웠는지, 어떤 종류의 물건을, 어떻게 비웠는지 한
                                눈에 볼 수 있게 정리해줍니다.
                            </p>

                            <Link href="/stuff">
                                비우러 가기
                                <FontAwesomeIcon icon={faArrowRight} />
                            </Link>
                        </div>
                        <div>
                            <div className="w-[600px] h-72 bg-gray-300 rounded-md"></div>
                        </div>
                    </section>

                    {/* {session && (
                        <div>
                            <TodayStuffList />
                            <HistoryStuffList />
                            <StuffModal />
                        </div>
                    )} */}
                </>
            </Container>
        </div>
    );
}
