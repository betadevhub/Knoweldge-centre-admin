import type { ReactNode } from "react";
import type { BLOCK } from "../pages/space/types";
import type { BUILD_FILTER } from "../types";


export interface USE_NAVIGATION {
    children: ReactNode;
}

export interface USE_TEXT_AREA {
    block: BLOCK;

}

export interface USE_FILTER {
    fil: BUILD_FILTER
}