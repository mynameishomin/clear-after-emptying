import { PrismaClient } from "@prisma/client";
import { getAccessToken, verifyAccessToken } from "@/functions/auth";
const prisma = new PrismaClient();

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)

    const token = getAccessToken();
    if (token) {
        const id = verifyAccessToken(token);

        if (typeof id === "string") {
            const startDate = searchParams.get("startDate");
            const endDate = searchParams.get("endDate");
            const whereClause: any = {userId: id};

            if(startDate || endDate) {
                whereClause.createdAt = {
                    ...(startDate && { gte: new Date(startDate) }),
                    ...(endDate && { lte: new Date(endDate) }),
                };
            }


            const stuff = await prisma.stuff.findMany({
                where: whereClause,
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
    const token = getAccessToken();
    if (token) {
        const id = verifyAccessToken(token);

        const stuff = await request.json();
        const data = await prisma.stuff.create({
            data: { userId: id, ...stuff, createdAt: new Date() },
        });
        return Response.json(data);
    }
}
