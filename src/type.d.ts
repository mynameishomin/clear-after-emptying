export interface StuffProps {
    title: string;
    summary: string;
    src: string;
    isEmpty?: boolean;
}

export interface StuffHistoryProps {
    [key: string]: string;
}
