"use client";
import Container from "@/components/layout/container";
import TodayStuffList from "@/components/stuff/todayStuffList";
import { site } from "@/variables";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/auth";

export default function Home() {
    const auth = useContext(AuthContext);

    useEffect(() => {
        const storageStuffHistory = localStorage.getItem("stuffHistory");
        if (!storageStuffHistory) {
            localStorage.setItem("stuffHistory", JSON.stringify([]));
        }
    }, []);
    return (
        <div className="flex flex-col md:justify-center w-full">
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
                </div>
            </Container>
        </div>
    );
}