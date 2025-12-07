import type { ReactNode } from "react";
import type { BLOCK_TYPE_OPTION } from "../../pages/space/types";
import type { BUILD_FILTER } from "../../types";


export interface TABLE {
    tableHeadElements: ReactNode;
    tableBodyElements: ReactNode;
    sortTypeList: BLOCK_TYPE_OPTION[];
    handleFilterChange: (name: string, value: string) => void;
    handleMultiFilterChange: (values: BUILD_FILTER) => void;
    filterDialogState: boolean;
    toggleFilterDialog: () => void;
    filter: BUILD_FILTER;
    loading: boolean
    fetch: () => void
    lastFetched: Date | string
};

export interface TABLE_TEXT {
    title: string | ReactNode;
    size: 'large' | 'medium' | 'small' | 'xSmall' | 'flex';
    func?: () => void;
};


export interface FILTER_LIST {
    title: string;
    type: string;
    name: string;
    c: number
}

export interface FILTER {
    filterList: FILTER_LIST[];
    filterDialogState: boolean;
    toggleFilterDialog?: () => void;
    handleMultiFilterChange: (values: BUILD_FILTER) => void;
    filter: BUILD_FILTER
}


export interface TABLE_NAME {
    sort?: string;
    title: string;
}