import type { ReactNode } from "react";

export interface MENU_CARD {
    icon: ReactNode;
    name: string;
    route: string;
    func: (r: string) => void;
}


export interface MENU_CARD_LIST {
    title: string;
    loading?: boolean;
    list: MENU_LIST[];
    titleIcon?: ReactNode;
    hasNextPage?: boolean;
    func: (r: string) => void;
}


export interface MENU_LIST {
    icon: ReactNode;
    name: string;
    route: string;
}

export interface CATEGORIES {
    _id: string;
    name: string;
    postCount: number;
    views: number;
    updatedAt: string;
}