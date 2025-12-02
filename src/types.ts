import type { IconType } from "react-icons";

export interface BLOCKS {
    id: string;
    content?: string;
    type: string;
    label?: string;
    icon?: IconType;
    placeholder: string;
}