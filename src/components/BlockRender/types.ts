import type { BLOCK } from "../../pages/space/types";
import type { TEXT_FORMAT } from "../Toolbar/types";

export interface TEXT_BLOCK {
    block: BLOCK;
    onInput: (content: string, e: INPUT_EVENT) => void;
    onKeyDown: (e: KEYBOARD_EVENT) => void;
    onFocus: () => void;
    onFormatChange?: (blockId: string, selection: Range, format: TEXT_FORMAT) => void;
    onClearFormat?: (blockId: string, selection: Range) => void;
}

export interface TODO_BLOCK extends TEXT_BLOCK {
    onToggle?: (id: string, checked: boolean) => void;
}

export interface LINK_BLOCK extends TEXT_BLOCK {
    onUpdate?: (id: string, updates: Partial<BLOCK>) => void;
}

export type INPUT_EVENT =
    | React.FormEvent<HTMLTextAreaElement>
    | React.FormEvent<HTMLInputElement>;

export type KEYBOARD_EVENT =
    | React.KeyboardEvent<HTMLTextAreaElement>
    | React.KeyboardEvent<HTMLInputElement>;