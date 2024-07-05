import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

interface UserProps {
    email: string;
    password: string;
    name: string;
}

export async function POST(request: Request) {
    const { email, password, name } = (await request.json()) as UserProps;

    const hasSignupData = email && password && name;
    if (!hasSignupData) {
        return Response.json("회원가입에 필요한 정보가 업습니다.", {
            status: 400,
        });
    }

    const isDuplicateUser = Boolean(
        await prisma.user.findUnique({ where: { email } })
    );
    if (isDuplicateUser) {
        return Response.json("이미 등록된 이메일입니다.", {
            status: 405,
        });
    }

    const hashedPassword = bcrypt.hashSync(password, 8);
    const createdUser = await prisma.user.create({
        data: { email, name, password: hashedPassword },
    });

    const token = jwt.sign(String(createdUser.id), process.env.JWT_SECRET!);
    return Response.json("사용자 생성 성공", {
        headers: {
            "Set-Cookie": `access_token=${token}; Path=/; Expires=${new Date(
                Date.now() + 60 * 60 * 24 * 1000 * 3
            ).toUTCString()}; HttpOnly`,
        },
    });
}
