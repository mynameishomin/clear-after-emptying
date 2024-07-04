export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const keyword = searchParams.get("keyword");
    const res = await fetch(`https://api.unsplash.com/search/photos?page=1&query=${keyword}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Client-ID ${process.env.UNSPLASH_API_ACCESS_KEY!}`,
            "Accept-Version": "v1",
        },
    });

    console.log(process.env.UNSPLASH_API_ACCESS_KEY);
    const data = await res.json();

    return Response.json({ data });
}
