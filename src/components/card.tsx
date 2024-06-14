import Button from "@/components/button";
import Image from "next/image";

interface CardProps {
    title: string;
    summary: string;
    src: string;
}
export default function Card({ title, summary, src }: CardProps) {
    return (
        <div className="flex p-4 rounded-sm bg-white max-w-lg shadow-lg">
            <div className="max-w-52 mr-4">
                <Image
                    src={src}
                    alt={title}
                    width={500}
                    height={500}
                    className="w-full h-full object-cover rounded-sm"
                />
            </div>
            <div className="flex flex-col">
                <div className="mb-6">
                    <h3 className="mb-2 text-lg font-bold">{title}</h3>
                    <p className="text-sm">{summary}</p>
                </div>

                <div className="flex flex-col mt-auto gap-2">
                    <Button text="버렸어요" />
                    <div className="flex justify-center gap-2">
                        <button className="text-xs">남길래요</button>
                        <button className="text-xs">없어요</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
