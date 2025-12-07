import type { BLOCK_TYPE_OPTION } from "../../pages/space/types"
import type { BUILD_FILTER } from "../../types";

export interface TOTAL_COUNT_CARD {
    count: number;
    loading: boolean
    fetch: () => void;
    lastFetched: Date | string;
}

export interface SELECT_CARD {
    sortTypeList: BLOCK_TYPE_OPTION[];
    handleFilterChange: (name: string, value: string) => void;
    toggleFilterDialog?: () => void;
}

export interface QUERY_CARD {
    sortTypeList: BLOCK_TYPE_OPTION[];
    handleFilterChange: (name: string, value: string) => void;
    toggleFilterDialog: () => void;
    filter: BUILD_FILTER;
    loading: boolean;
    fetch: () => void;
    lastFetched: Date | string
}

export interface INPUT_CARD {
    placeholder: string;
    inputMode?: 'numeric' | 'url' | 'email' | 'search';
    name: string
    handleFilterChange: (name: string, value: string) => void;
    value: string | number | readonly string[] | undefined;
}

