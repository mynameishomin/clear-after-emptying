"use client";
import Container from "@/components/layout/container";

export default () => {

    const registerTest = async () => {
        const response = await fetch("/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: "test@test.com",
                password: "test",
                name: "호민"
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
