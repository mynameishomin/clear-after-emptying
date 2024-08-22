import NextAuth, { AuthOptions } from "next-auth";
import NaverProvider from "next-auth/providers/naver";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
        };
    }
}

export const authOptions: AuthOptions = {
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
        signIn: "/signin", // 로그인 페이지 경로
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async session({ session, token }) {
            session.user.id = token.sub as string;
            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
