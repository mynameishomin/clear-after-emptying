export async function POST() {
    return Response.json("로그아웃 성공 성공", {
        headers: {
            "Set-Cookie": `access_token=deleted; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT HttpOnly`,
        },
        status: 200,
    });
}
