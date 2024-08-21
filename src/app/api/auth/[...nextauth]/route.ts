import NextAuth from "next-auth";
import NaverProvider from "next-auth/providers/naver";

const handler = NextAuth({
    providers: [
        NaverProvider({
            clientId: process.env.NAVER_CLIENT_ID as string,
            clientSecret: process.env.NAVER_CLIENT_SECRET as string,
        }),
    ],
    session: {
        strategy: "jwt", // 세션을 JWT로 관리
    },
    pages: {
        signIn: "/", // 로그인 페이지 경로
    },
});

export { handler as GET, handler as POST };
