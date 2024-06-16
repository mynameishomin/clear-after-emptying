import { useEffect, useState } from "react";
import Button from "@/components/button";
import Image from "next/image";
import { StuffProps } from "@/type";
import { getRandomArrayItem, getStuffList } from "@/functions";

export const TodayStuff = ({ title, summary, src }: StuffProps) => {
    return (
        <div className="flex flex-col gap-4 w-full h-full p-4 rounded-sm bg-white max-w-lg shadow-lg">
            <div className="max-w-52">
                <Image
                    src={src}
                    alt={title}
                    width={500}
                    height={500}
                    className="w-full h-full object-cover rounded-sm"
                />
            </div>
            <div className="flex flex-col mt-auto">
                <div className="mb-2">
                    <h3 className="text-lg font-bold">{title}</h3>
                    <p className="text-sm">{summary}</p>
                </div>

                <div className="flex flex-col mt-auto gap-2">
                    <Button text="버렸어요" />
                </div>
            </div>
        </div>
    );
};

export const TodayStuffList = () => {
    const [todayStuff, setTodayStuff] = useState<null | StuffProps[]>(null);
    useEffect(() => {
        (async () => {
            const storageTodayStuff = localStorage.getItem("todayStuff");
            const stuffList = (await getStuffList()) as StuffProps[];

            if (storageTodayStuff) {
                setTodayStuff(JSON.parse(storageTodayStuff));
            } else {
                const randomStuff = getRandomArrayItem<StuffProps>(
                    stuffList,
                    3
                );

                setTodayStuff(randomStuff);
                localStorage.setItem("todayStuff", JSON.stringify(randomStuff));
            }
        })();
    }, []);
    return (
        <ul className="flex gap-4">
            {todayStuff?.map((item: StuffProps, index: number) => {
                return (
                    <li key={index}>
                        <TodayStuff
                            title={item.title}
                            summary={item.summary}
                            src={item.src}
                        />
                    </li>
                );
            })}
        </ul>
    );
};
