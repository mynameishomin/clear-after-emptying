"use client";
import Container from "@/components/layout/container";
import StuffModal from "@/components/stuff/stuffModal";
import StuffList from "@/components/stuff/stuffList";
import { StuffContext } from "@/provider/stuff";
import { useContext } from "react";

export default function Stuff() {
    const { stuffList, setStuffList } = useContext(StuffContext);
    return (
        <Container>
            <>
                <StuffList />
                <StuffModal />
            </>
        </Container>
    );
}
