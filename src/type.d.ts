export interface StuffProps {
    [key: string]: string;
    id: string;
    name: string;
    summary: string;
    urls: StuffUrlsProps;
    createdAt: string;
}

export interface StuffUrlsProps {
    regular: string;
    thumb: string;
}

export interface ChildrenProps {
    children: React.ReactElement;
}