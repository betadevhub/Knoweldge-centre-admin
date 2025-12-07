import type { ReactNode } from "react";

export interface MAIN_WRAPPER {
    children: ReactNode;
}

export interface QUERY_CARD_WRAPPER extends MAIN_WRAPPER {
    background?: string;
}


export interface INPUT_LIST extends MAIN_WRAPPER {
    cta?: (e:React.FormEvent) => void
}


export interface CARD_WRAPPER extends MAIN_WRAPPER {
    title: string;
    addLogo?: boolean;
}