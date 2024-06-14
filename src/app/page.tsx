import Card from "@/components/card";

export default function Home() {
    return (
        <div className="flex flex-col justify-center items-center w-full h-full">
            <div className="relative px-6">
                <time className="block text-xs" dateTime="2024-06-14">
                    6월 14일
                </time>
                <h2 className="mb-4 text-2xl font-bold">오늘 버릴 물건</h2>
                <Card
                    title="신발"
                    summary="1년동안 신지 않은 신발이 있나요?"
                    src="/images/shose.jpg"
                />
            </div>
        </div>
    );
}
