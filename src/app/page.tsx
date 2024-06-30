"use client";
import Container from "@/components/layout/container";
import { Header } from "@/components/layout/header";
import { TodayStuffList } from "@/components/stuff";
import { site } from "@/variables";
import { useEffect, useState } from "react";
import { StuffHistoryProps } from "@/type";

export default function Home() {
    const [stuffHistory, setStuffHistory] = useState<null | StuffHistoryProps>(
        null
    );
    useEffect(() => {
        const storageStuffHistory = localStorage.getItem("stuffHistory");
        if (!storageStuffHistory) {
            localStorage.setItem("stuffHistory", JSON.stringify([]));
        }
    }, []);
    return (
        <div className="flex flex-col md:justify-center w-full">
            <Header />
            <Container>
                <div>
                    <div className="mt-36 mb-12">
                        <h1 className="mb-1 text-4xl">
                            {site.title}:
                            <br />
                            {site.summary}
                        </h1>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Explicabo obcaecati a fugit, dolorem soluta
                            suscipit ex. Odit assumenda veniam harum quaerat
                            iure molestias, quibusdam, non dolorem tenetur ullam
                            voluptate qui.
                        </p>
                    </div>

                    <section className="mb-20">
                        <h2 className="text-xl mb-4">
                            오늘, 이런 물건을 비웠어요.
                        </h2>
                        <TodayStuffList />
                    </section>

                    {stuffHistory && (
                        <section>
                            <h2 className="text-xl mb-1">
                                지금까지 물건을 이만큼 비웠어요.
                            </h2>
                        </section>
                    )}
                </div>
            </Container>

            {/* <TodayStuffList /> */}
        </div>
    );
}
