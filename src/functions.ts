import { StuffProps } from "@/type";

export const getNowDate = () => {
    const date = new Date();
    return {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        dateString: date.toLocaleDateString(),
    };
};

export const getRandomArrayItem = <T extends {}>(array: T[], count: number) => {
    const newArray: T[] = [];
    const arrayLength = array.length;

    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * arrayLength);
        newArray.push({ ...array[randomIndex] });
    }

    return newArray;
};
