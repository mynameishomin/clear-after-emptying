"use client";
import { useContext } from "react";
import Container from "@/components/layout/container";
import TodayStuffList from "@/components/stuff/todayStuffList";
import { site } from "@/variables";
import { useEffect } from "react";
import { AuthContext } from "@/context/auth";
import HistoryStuffList from "@/components/stuff/historyStuffList";
import { Alert } from "@/components/alert";
import { customFetch } from "@/components/customFetch";

export default function Home() {
    const isLogin = useContext(AuthContext);

    const test = () => {
        customFetch("/api/test");
    };

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
                    <section className="mt-20 lg:mt-36 mb-12">
                        <button onClick={test}>테스트</button>
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
                        <>
                            <section className="mb-20">
                                <h2 className="text-xl mb-4">
                                    오늘, 이런 물건을 비웠어요.
                                </h2>
                                <TodayStuffList />
                            </section>

                            <HistoryStuffList />
                        </>
                    )}
                </>
            </Container>
        </div>
    );
}
