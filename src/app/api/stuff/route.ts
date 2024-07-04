import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(request: Request) {
    // const res = await fetch("stuffUrl", {});
    // const data = await res.json();
    return Response.json({ data: "test" });
}

export async function POST(request: Request) {
    const stuff = await request.json();
    const data = await prisma.stuff.create({
        data: { ...stuff, createdAt: new Date() },
    });
    return Response.json(data);
}
