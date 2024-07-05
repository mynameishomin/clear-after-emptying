import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type UserActions = "register" | "login";
interface UserProps {
    id: string;
    password: string;
    name: string;
}

export async function POST(request: Request) {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get("action") as UserActions;

    const userData: UserProps = await request.json();


    switch(action) {
        case "register":
            await prisma.user.create({data: {...userData}})
            console.log("등록");
            break;
        case "login" : 
            break;
        default: 
    }

    
    return Response.json({});
}