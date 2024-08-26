"use client";
import Container from "@/components/layout/container";
import StuffModal from "@/components/stuff/stuffModal";
import StuffList from "@/components/stuff/stuffList";
import { useContext } from "react";
import Button from "@/components/button";
import { StuffModalContext } from "@/provider/stuffModal";
import { StuffProps } from "@/type";

export default function Stuff() {
    const { setStuff, onOpen } = useContext(StuffModalContext);
    const openAddStuff = () => {
        setStuff({} as StuffProps);
        onOpen();
    };
    return (
        <Container>
            <>
                <StuffList />

                <Button
                    className="fixed bottom-6 right-6 mt-auto mb-4 justify-center"
                    onClick={() => {
                        openAddStuff();
                    }}
                >
                    비우기
                </Button>
                <StuffModal />
            </>
        </Container>
    );
}
