import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(request: Request) {
    const res = await fetch("stuffUrl", {});
    const data = await res.json();
    return Response.json({ data });
}

export async function POST(request: Request) {
    const res = await fetch("stuffUrl", {});
    
    return Response.json({});
}
