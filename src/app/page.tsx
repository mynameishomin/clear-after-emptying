"use client";
import Container from "@/components/layout/container";
import { Header } from "@/components/layout/header";
import { TodayStuffList } from "@/components/stuff";
import { site } from "@/variables";
import { useEffect } from "react";
import { Card, CardWrapper } from "@/components/card";

export default function Home() {
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

                    <section>
                        <h2></h2>
                        <CardWrapper>
                            <Card>
                                <div>아직 비우지 못했어요.</div>
                            </Card>
                        </CardWrapper>
                    </section>
                </div>
            </Container>

            {/* <TodayStuffList /> */}
        </div>
    );
}
