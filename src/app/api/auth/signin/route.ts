import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

interface LoginProps {
    email: string;
    password: string;
}

interface CookiesProps {
    [key: string]: string;
}

export async function POST(request: Request) {
    const { email, password } = (await request.json()) as LoginProps;

    const cookieString = request.headers.get("cookie");
    if (!cookieString) {
        return Response.json({});
    }

    const cookies = cookieString
        .split("; ")
        .reduce((acc: CookiesProps, cookie) => {
            const [key, value] = cookie.split("=");
            acc[key] = value;
            return acc;
        }, {});

    const token = cookies["access_token"];

    // const hashedPassword = bcrypt.hashSync(password, 8);
    // const createdUser = await prisma.user.create({
    //     data: { email, name, password: hashedPassword },
    // });

    // const token = jwt.sign(String(createdUser.id), process.env.JWT_SECRET!);
    // return Response.json("사용자 생성 성공", {
    //     headers: {
    //         "Set-Cookie": `access_token=${token}; Path=/; Expires=${new Date(
    //             Date.now() + 60 * 60 * 24 * 1000 * 3
    //         ).toUTCString()}; HttpOnly`,
    //     },
    // });
    return Response.json({});
}
