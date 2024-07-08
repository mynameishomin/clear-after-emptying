import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

interface LoginProps {
    email: string;
    password: string;
}

export async function POST(request: Request) {
    const { email, password } = (await request.json()) as LoginProps;

    const selectedUser = await prisma.user.findUnique({where: { email }});
    if(!selectedUser) return Response.json("이메일 또는 비밀번호가 틀렸습니다.", { status: 400 });

    const isMatchPassword = bcrypt.compareSync(password, selectedUser.password);
    if(isMatchPassword) {
        const token = jwt.sign(String(selectedUser.id), process.env.JWT_SECRET!);
        return Response.json("로그인 성공", {
            headers: {
                "Set-Cookie": `access_token=${token}; Path=/; Expires=${new Date(
                    Date.now() + 60 * 60 * 24 * 1000 * 3
                ).toUTCString()}; HttpOnly`,
            },
        });
    }
}
