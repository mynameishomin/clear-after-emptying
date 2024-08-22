import { PrismaClient } from "@prisma/client";
import { StuffProps } from "@/type";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.id) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { searchParams } = new URL(request.url);
        const startDate = searchParams.get("startDate");
        const endDate = searchParams.get("endDate");

        const where: Record<string, any> = { userId: session.user.id };
        where.createdAt = {
            ...(startDate && { gte: new Date(startDate) }),
            ...(endDate && { lte: new Date(endDate) }),
        };

        const stuff = await prisma.stuff.findMany({ where });

        return NextResponse.json(stuff, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "예상하지 못한 오류 발생" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    const stuff = await request.json();

    if (!stuff.name || !stuff.summary || !stuff.urls) {
        return NextResponse.json(
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
        data: { userId: session?.user.id, ...stuff, createdAt: new Date() },
    });
    return NextResponse.json(
        {
            data,
            action: {
                type: "toast",
                text: "삭제되었습니다.",
            },
        },
        { status: 200 }
    );
}

export async function PUT(request: Request) {
    const token = getAccessToken();
    if (!token)
        return Response.json("로그인 정보가 없습니다.", { status: 422 });

    const id = verifyAccessToken(token);
    const updateData: StuffProps = await request.json();

    if (typeof id === "string") {
        const stuff = await prisma.stuff.findUnique({
            where: { id: updateData.id },
        });
        console.log(updateData);
        if (!stuff)
            return Response.json("물건 정보가 없습니다.", { status: 422 });

        const updatedStuff = await prisma.stuff.update({
            where: { id: stuff.id },
            data: {
                summary: updateData.summary,
                name: updateData.name,
                urls: updateData.urls
                    ? JSON.parse(JSON.stringify(updateData.urls))
                    : undefined,
            },
        });

        return Response.json(updatedStuff, { status: 200 });
    }
}

export async function DELETE(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        const stuff = await request.json();

        await prisma.stuff.delete({
            where: { id: stuff.id, userId: session?.user.id },
        });

        return Response.json(
            {
                action: {
                    type: "toast",
                    text: "삭제되었습니다.",
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "예상하지 못한 오류 발생" },
            { status: 500 }
        );
    }
}
