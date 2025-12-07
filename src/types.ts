import type { IconType } from "react-icons";
import type { CATEGORIES } from "./components/SidePane/types";

export interface BLOCKS {
    id: string;
    content?: string;
    type: string;
    label?: string;
    icon?: IconType;
    placeholder: string;
};

export interface PAGINATION {
    page: number;
    limit: number;
    totalDocs: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    nextPage: number | null;
    previousPage: number | null;
}

export interface CATEGORIES_RESULT {
    categories: CATEGORIES[];
    pagination: PAGINATION;
}

export interface BUILD_FILTER {
    [key: string]: string | boolean | number | undefined | null;
}

