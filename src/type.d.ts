export interface StuffProps {
    [key: string]: string;
    id?: string;
    name: string;
    summary: string;
    url: string;
    createdAt?: string;
}

export interface ChildrenProps {
    children: React.ReactElement;
}
