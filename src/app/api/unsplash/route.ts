export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const keyword = searchParams.get("keyword");
    const page = searchParams.get("page");
    const res = await fetch(
        `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}`,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Client-ID ${process.env
                    .UNSPLASH_API_ACCESS_KEY!}`,
                "Accept-Version": "v1",
            },
        }
    );

    const data = await res.json();

    return Response.json({ data });
}
