import type { MENU_CARD, MENU_LIST } from "../SidePane/types";

export interface INTRO {
    title: string;
    description: string;
}

export interface CARD extends MENU_CARD {
    description: string;
    color: string;
}


export interface CARD_LIST {
    list: CARD_ITEM_LIST[];
    func: (r: string) => void
}

export interface CARD_ITEM_LIST extends MENU_LIST{
    description: string;
    color: string;
}