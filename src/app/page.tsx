"use client";
import { useContext } from "react";
import Container from "@/components/layout/container";
import TodayStuffList from "@/components/stuff/todayStuffList";
import { site } from "@/variables";
import { useEffect } from "react";
import { AuthContext } from "@/context/auth";
import HistoryStuffList from "@/components/stuff/historyStuffList";
import StuffModal from "@/components/stuff/stuffModal";
import { useModal } from "@/components/modal";

export default function Home() {
    const isLogin = useContext(AuthContext);
    const stuffModal = useModal();

    useEffect(() => {
        const storageStuffHistory = localStorage.getItem("stuffHistory");
        if (!storageStuffHistory) {
            localStorage.setItem("stuffHistory", JSON.stringify([]));
        }
    }, []);
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

                    {isLogin && (
                        <div>
                            <TodayStuffList />
                            <HistoryStuffList />
                            <StuffModal
                                stuffData={null}
                                isOpen={stuffModal.isOpen}
                                onClose={stuffModal.onClose}
                                stuffSubmitCallback={() => {}}
                            />
                        </div>
                    )}
                </>
            </Container>
        </div>
    );
}
