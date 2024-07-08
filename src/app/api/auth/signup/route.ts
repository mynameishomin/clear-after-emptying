import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { getHashedPassword, isDuplicateEmail } from "@/functions/auth";

const prisma = new PrismaClient();

interface SignupProps {
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
}

export async function POST(request: Request) {
    const { email, password, confirmPassword, name } =
        (await request.json()) as SignupProps;

    const hasSignupData = email && password && confirmPassword && name;
    if (!hasSignupData) {
        return Response.json("회원가입에 필요한 정보가 없습니다.", {
            status: 400,
        });
    }

    const isSamePassword = password === confirmPassword;
    if (!isSamePassword) {
        return Response.json("확인 비밀번호가 일치하지 않습니다.", {
            status: 405,
        });
    }

    if (await isDuplicateEmail(email)) {
        return Response.json("이미 등록된 이메일입니다.", {
            status: 405,
        });
    }

    const hashedPassword = getHashedPassword(password);
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
