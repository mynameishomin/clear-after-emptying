import { PrismaClient } from "@prisma/client";
import { StuffProps } from "@/type";
import { getServerSession } from "next-auth";
const prisma = new PrismaClient();

export async function GET(request: Request) {
    const test = await getServerSession();
    console.log(test, "tlqkf");
    return Response.json("tlqkf");
}
