import { MdCheckBox, MdCode, MdFormatListBulleted, MdFormatQuote, MdTextFields,  MdInsertLink, MdInsertPhoto } from "react-icons/md";
import type { BLOCK_TYPE_OPTION } from "../../pages/space/types";
import { BsTypeH1, BsTypeH2, BsTypeH3 } from "react-icons/bs";

export const blockTypes: BLOCK_TYPE_OPTION[] = [
    { type: 'text', label: 'Text', icon: MdTextFields, placeholder: 'Just start typing...' },
    { type: 'h1', label: 'Heading 1', icon: BsTypeH1, placeholder: 'Heading 1' },
    { type: 'h2', label: 'Heading 2', icon: BsTypeH2, placeholder: 'Heading 2' },
    { type: 'h3', label: 'Heading 3', icon: BsTypeH3, placeholder: 'Heading 3' },
    { type: 'bullet', label: 'Bulleted List', icon: MdFormatListBulleted, placeholder: 'List item' },
    { type: 'todo', label: 'To-do', icon: MdCheckBox, placeholder: 'To-do' },
    { type: 'quote', label: 'Quote', icon: MdFormatQuote, placeholder: 'Quote' },
    { type: 'code', label: 'Code', icon: MdCode, placeholder: 'Code snippet' },
    { type: 'link', label: 'Link', icon: MdInsertLink, placeholder: 'Paste a link...' },
    { type: 'image', label: 'Image', icon: MdInsertPhoto, placeholder: 'Paste image URL...' },
];