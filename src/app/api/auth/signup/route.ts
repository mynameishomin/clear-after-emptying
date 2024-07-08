import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { AuthFormProps, createUserData, getHashedPassword, isCompletedSignupForm, isDuplicateEmail, isSamePassword } from "@/functions/auth";

const prisma = new PrismaClient();


export async function POST(request: Request) {
    const signupForm: AuthFormProps = await request.json();

    if (!isCompletedSignupForm(signupForm)) {
        return Response.json("회원가입에 필요한 정보가 없습니다.", {
            status: 400,
        });
    }
    
    if (!isSamePassword(signupForm)) {
        return Response.json("확인 비밀번호가 일치하지 않습니다.", {
            status: 405,
        });
    }

    if (await isDuplicateEmail(signupForm)) {
        return Response.json("이미 등록된 이메일입니다.", {
            status: 405,
        });
    }

    const createdUser = await prisma.user.create({ data: createUserData(signupForm) });

    const token = jwt.sign(String(createdUser.id), process.env.JWT_SECRET!);
    return Response.json("사용자 생성 성공", {
        headers: {
            "Set-Cookie": `access_token=${token}; Path=/; Expires=${new Date(
                Date.now() + 60 * 60 * 24 * 1000 * 3
            ).toUTCString()}; HttpOnly`,
        },
    });
}
