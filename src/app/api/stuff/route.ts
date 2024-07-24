import { PrismaClient } from "@prisma/client";
import { getAccessToken, verifyAccessToken } from "@/auth/auth.module";
import { StuffProps } from "@/type";
const prisma = new PrismaClient();

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const token = getAccessToken();
    if (!token)
        return Response.json("로그인 정보가 없습니다.", { status: 422 });

    const id = verifyAccessToken(token);

    if (typeof id === "string") {
        const startDate = searchParams.get("startDate");
        const endDate = searchParams.get("endDate");
        const whereClause: any = { userId: id };

        if (startDate || endDate) {
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
    } else {
        return Response.json("로그인 필요", { status: 400 });
    }
}

export async function POST(request: Request) {
    const token = getAccessToken();

    if (!token) return Response.json("로그인 정보가 없습니다.");

    const id = verifyAccessToken(token);
    const stuff = await request.json();

    if (!stuff.name || !stuff.summary || !stuff.urls) {
        return Response.json(
            {
                action: {
                    type: "alert",
                    title: "버릴 물건 정보가 부족합니다.",
                    text: "버릴 물건 정보를 모두 입력해주세요.",
                },
            },
            { status: 422 }
        );
    }

    const data = await prisma.stuff.create({
        data: { userId: id, ...stuff, createdAt: new Date() },
    });
    return Response.json(data);
}

export async function PUT(request: Request) {
    const token = getAccessToken();
    if (!token)
        return Response.json("로그인 정보가 없습니다.", { status: 422 });

    const id = verifyAccessToken(token);
    const updateData: StuffProps = await request.json();

    if (typeof id === "string") {
        const stuff = await prisma.stuff.findUnique({ where: { id } });

        if (!stuff)
            return Response.json("물건 정보가 없습니다.", { status: 422 });

        const updatedStuff = await prisma.stuff.update({
            where: { id: stuff.id },
            data: {
                ...updateData,
                urls: updateData.urls
                    ? JSON.parse(JSON.stringify(updateData.urls))
                    : undefined,
            },
        });

        return Response.json(updatedStuff, { status: 200 });
    }
}
