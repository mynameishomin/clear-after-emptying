import { AuthFormProps } from "@/functions/auth";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    const signinForm: AuthFormProps = await request.json();

    const selectedUser = await prisma.user.findUnique({where: { email: signinForm.email.value }});
    if(!selectedUser) return Response.json("이메일 또는 비밀번호가 틀렸습니다.", { status: 400 });

    const isMatchPassword = bcrypt.compareSync(signinForm.password.value, selectedUser.password);
    if(!isMatchPassword) return Response.json("이메일 또는 비밀번호가 틀렸습니다.", { status: 400 });

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
