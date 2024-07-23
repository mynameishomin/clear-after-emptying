import { SigninFormProps } from "@/auth/auth.interface";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const signinFailAction = {
    title: "이메일 또는 비밀번호가 틀렸습니다.",
    type: "alert",
    text: "다시 확인하고 시도해주세요.",
};

export async function POST(request: Request) {
    const signinForm: SigninFormProps = await request.json();

    const selectedUser = await prisma.user.findUnique({
        where: { email: signinForm.email },
    });
    if (!selectedUser)
        return Response.json(
            { action: signinFailAction },
            {
                status: 400,
            }
        );

    const isMatchPassword = bcrypt.compareSync(
        signinForm.password,
        selectedUser.password
    );

    if (!isMatchPassword) {
        return Response.json(
            {
                action: signinFailAction,
            },
            {
                status: 400,
            }
        );
    }
    if (isMatchPassword) {
        const token = jwt.sign(
            String(selectedUser.id),
            process.env.JWT_SECRET!
        );
        return Response.json(
            {
                action: {
                    type: "toast",
                    text: "로그인 되었습니다.",
                },
            },
            {
                headers: {
                    "Set-Cookie": `access_token=${token}; Path=/; Expires=${new Date(
                        Date.now() + 60 * 60 * 24 * 1000 * 3
                    ).toUTCString()}; HttpOnly`,
                },
            }
        );
    }
}
