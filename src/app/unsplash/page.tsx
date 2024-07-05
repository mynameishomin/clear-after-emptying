"use client";
import Container from "@/components/layout/container";
import { useContext } from "react";
import { AuthContext } from "../context/auth";

const Page = () => {
    const auth = useContext(AuthContext);
    const registerTest = async () => {
        const response = await fetch("/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: "test@test.com",
                password: "test",
                name: "호민",
            }),
        });
    };

    return (
        <Container>
            <div>
                <button onClick={registerTest}>테스트</button>
            </div>
        </Container>
    );
};

export default Page;
