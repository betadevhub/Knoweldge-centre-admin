import type { ReactNode, SetStateAction } from "react";
import type { BLOCK } from "../../pages/space/types";


export interface SPACE_HEADER_TEXT {
    icon: ReactNode;
    text: string;
    editable?: boolean
    func?: (name: string, value: string) => void
}

export interface SPACE_HEADER {
    existingName?: string;
    blocks: BLOCK[];
    setBlocks: React.Dispatch<SetStateAction<BLOCK[]>>
}