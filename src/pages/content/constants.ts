import { MdOutlineMenuBook, MdOutlineOndemandVideo, MdOutlineRemoveRedEye, MdOutlineSchedule, MdOutlineSortByAlpha, MdOutlineUpdate } from "react-icons/md";
import type { BLOCK_TYPE_OPTION } from "../space/types";
import { blockTypes } from "../home/constant";
import { filterList } from "../../components/Home/constant";

export const sortTypeList: BLOCK_TYPE_OPTION[] = [
    { type: 'createdDate', label: 'Created Date', icon: MdOutlineSchedule, sub: blockTypes },
    { type: 'updatedDate', label: 'Updated Date', icon: MdOutlineUpdate, sub: blockTypes },
    { type: 'name', label: 'Name', icon: MdOutlineSortByAlpha, sub: blockTypes },
    { type: 'videoDuration', label: 'Video Duration', icon: MdOutlineOndemandVideo, sub: blockTypes },
    { type: 'readDuration', label: 'Read Duration', icon: MdOutlineMenuBook, sub: blockTypes },
    { type: 'views', label: 'views', icon: MdOutlineRemoveRedEye, sub: blockTypes },
];


export const contentFilterList = [
    ...filterList,
    { title: 'Video Duration', name: 'VideoDuration', type: 'number', c: 2 },
    { title: 'Read Duration', name: 'ReadDuration', type: 'number', c: 2 },
].filter(f=>f.name !== 'PostCount')