import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { isEqual } from "@/utils/utils.module";
import {
    isSomeEmptySignupForm,
    isCompletedSignupForm,
    createUserData,
    isDuplicateEmail,
} from "@/auth/auth.module";
import { SignupFormProps } from "@/auth/auth.interface";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    const signupForm: SignupFormProps = await request.json();
    const { password, confirmPassword } = signupForm;

    if (!isCompletedSignupForm(signupForm)) {
        return Response.json(
            {
                action: {
                    title: "회원가입에 필요한 정보가 없습니다.",
                    type: "alert",
                    text: "회원가입에 필요한 정보를 입력해주세요.",
                },
            },
            {
                status: 400,
            }
        );
    }

    const isEqualPassword = isEqual(password, confirmPassword);
    if (!isEqualPassword) {
        return Response.json(
            {
                action: {
                    title: "비밀번호 확인이 일치하지 않습니다.",
                    type: "alert",
                    text: "똑같은 비밀번호를 입력해주세요.",
                },
            },
            {
                status: 405,
            }
        );
    }

    if (await isDuplicateEmail(signupForm.email)) {
        return Response.json(
            {
                action: {
                    title: "이미 등록된 이메일입니다.",
                    type: "alert",
                    text: "다른 이메일을 사용해주세요.",
                },
            },
            {
                status: 405,
            }
        );
    }

    const createdUser = await prisma.user.create({
        data: createUserData(signupForm),
    });

    const token = jwt.sign(String(createdUser.id), process.env.JWT_SECRET!);
    return Response.json(
        {
            action: {
                type: "toast",
                text: "회원가입이 되었습니다.",
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
