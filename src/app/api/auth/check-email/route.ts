import { isDuplicateEmail, isEmail } from "@/functions/auth";

export async function POST(request: Request) {
    const email: string = (await request.json()).email;

    if (!isEmail(email))
        return Response.json(
            { message: "올바른 이메일 주소를 쓰세요" },
            { status: 422 }
        );

    if (await isDuplicateEmail(email))
        return Response.json(
            { message: "똑같은 이메일이 있습니다." },
            { status: 422 }
        );

    return Response.json(
        { message: "쓸 수 있는 이메일입니다." },
        { status: 200 }
    );
}
