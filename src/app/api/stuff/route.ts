import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

export async function GET() {
    const token = cookies().get("access_token")?.value;
    if (token) {
        // 버린 물건 목록 내려주기
        const id = jwt.verify(token, process.env.JWT_SECRET!);

        if (typeof id === "string") {
            const stuff = await prisma.stuff.findMany({
                where: { userId: id },
            });
            return Response.json(stuff, {
                status: 200,
            });
        }
    } else {
        return Response.json("로그인 필요", { status: 400 });
    }
}

export async function POST(request: Request) {
    const token = cookies().get("access_token")?.value;
    if (token) {
        const id = jwt.verify(token, process.env.JWT_SECRET!);

        const stuff = await request.json();
        const data = await prisma.stuff.create({
            data: { userId: id, ...stuff, createdAt: new Date() },
        });
        return Response.json(data);
    }
}
