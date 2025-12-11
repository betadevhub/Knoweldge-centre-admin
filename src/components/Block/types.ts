import type { BLOCK, BLOCK_TYPE, BLOCK_TYPE_OPTION, MENU_STATE } from "../../pages/space/types";
import type { INPUT_EVENT, KEYBOARD_EVENT } from "../BlockRender/types";

export interface BLOCK_PROPS {
    block: BLOCK;
    isActive: boolean;
    onInput: (id: string, content: string, e: INPUT_EVENT) => void;
    onAddBlock: (id: string) => void;
    onDeleteBlock: (id: string) => void;
    onChangeBlockType: (id: string, newType: BLOCK_TYPE) => void;
    onFocus: (id: string) => void;
    onMenuOpen: React.Dispatch<React.SetStateAction<MENU_STATE>>;
    onAddBullet?: (id: string) => void;
}

export interface BLOCK_HEADER {
    onAddBlock: () => void;
    onDeleteBlock: () => void;
    isVisible: boolean;
}

export interface BLOCK_CONTENT {
    block: BLOCK;
    onInput: (content: string, e: INPUT_EVENT) => void;
    onKeyDown: (e: KEYBOARD_EVENT) => void;
    onFocus: () => void;
    onUpdateBlock?: (id: string, updates: Partial<BLOCK>) => void;
}

export interface BLOCK_TYPE_MENU {
    activeBlockId: string;
    position: { top: number; left: number };
    filter: string;
    onChangeBlockType: (id: string, newType: BLOCK_TYPE) => void;
    onClose: () => void;
    forSubClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    typeList: BLOCK_TYPE_OPTION[];
    isOpen: boolean
}


