export interface StuffProps {
    id: string;
    title: string;
    summary: string;
    src: string;
    isEmpty?: boolean;
    emptyDate?: string;
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
