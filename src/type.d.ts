export interface StuffProps {
    id?: string;
    name: string;
    summary: string;
    imageUrl: string;
    createdAt?: string;
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
