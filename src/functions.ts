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

export const createGetStorage = <T>(itemName: string) => {
    return (): T => {
        const storageString = localStorage.getItem(itemName);
        return storageString ? JSON.parse(storageString) : null;
    };
};

export const createSetStorage = <T>(itemName: string) => {
    return (data: T) => localStorage.setItem(itemName, JSON.stringify(data));
};
