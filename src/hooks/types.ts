import type { ReactNode } from "react";
import type { BLOCK } from "../pages/space/types";
import type { INPUT_EVENT } from "../components/BlockRender/types";


export interface USE_NAVIGATION {
    children: ReactNode;
}

export interface USE_TEXT_AREA {
    block: BLOCK;

}