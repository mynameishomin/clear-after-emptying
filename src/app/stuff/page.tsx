"use client";
import Container from "@/components/layout/container";
import HistoryStuffList from "@/components/stuff/historyStuffList";
import StuffModal from "@/components/stuff/stuffModal";
import TodayStuffList from "@/components/stuff/todayStuffList";
import { StuffContext } from "@/provider/stuff";
import { useContext } from "react";

export default function Stuff() {
    const { stuffList, setStuffList } = useContext(StuffContext);
    return (
        <Container>
            <div>
                <TodayStuffList />
                {/* <HistoryStuffList /> */}
                <StuffModal />
            </div>
        </Container>
    );
}
