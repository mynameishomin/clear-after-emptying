export interface StuffProps {
    title: string;
    summary: string;
    src: string;
    isEmpty?: boolean;
    emptyDate?: string;
}

export interface StuffHistoryProps extends StuffProps {
    [key: string]: string;
}
