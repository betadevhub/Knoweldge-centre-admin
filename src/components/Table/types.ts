import type { ReactNode } from "react";


export interface TABLE {
    tableHeadElements: ReactNode
};

export interface TABLE_TEXT {
    title: string;
    size: 'large' | 'medium' | 'small' | 'xSmall' | 'flex'
};
