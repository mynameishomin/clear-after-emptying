export interface StuffProps {
    [key: string]: string;
    id?: string;
    name: string;
    summary: string;
    urls: StuffUrlsProps;
    createdAt?: string;
}

export interface StuffUrlsProps {
    regular: string;
    thumb: string;
}

export interface StuffHistoryProps extends StuffProps {
    [key: string]: string;
}

export interface TodayStuffProps {
    date: string;
    stuff: StuffProps[];
}

export interface ChildrenProps {
    children: React.ReactElement;
}