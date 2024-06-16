export interface StuffProps {
    title: string;
    summary: string;
    src: string;
    isEmpty?: boolean;
}

export interface StuffHistoryProps extends StuffProps {
    [key: string]: string;
}
