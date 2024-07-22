import { SigninFormProps } from "@/auth/auth.interface";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function GET(request: Request) {
    return Response.json({
        action: {
            type: "toast",
            title: "알럿임다",
            text: "토스트임다.",
            id: String(Date.now()),
        },
    });
}
