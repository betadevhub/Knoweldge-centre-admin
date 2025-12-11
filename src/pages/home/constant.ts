import { MdOutlineFolderOpen, MdOutlineCheckBox, MdOutlineDriveFileRenameOutline, MdOutlineDeleteOutline, MdOutlineSchedule, MdOutlineUpdate, MdOutlineSortByAlpha, MdOutlineFormatListNumbered, MdOutlineRemoveRedEye, MdOutlineNewReleases, MdOutlineHistory, MdOutlineArrowDownward, MdOutlineArrowUpward } from 'react-icons/md';
import type { BLOCK_TYPE_OPTION } from "../space/types";

export const blockTypes: BLOCK_TYPE_OPTION[] = [
    { type: 'open', label: 'Open', icon: MdOutlineFolderOpen },
    { type: 'select', label: 'Select', icon: MdOutlineCheckBox },
    { type: 'Rename', label: 'Rename', icon: MdOutlineDriveFileRenameOutline },
    { type: 'Delete', label: 'Delete', icon: MdOutlineDeleteOutline, color: 'red' },
];



export const sortTypeList: BLOCK_TYPE_OPTION[] = [
    { type: 'createdDate', label: 'Created Date', icon: MdOutlineSchedule, sub: blockTypes },
    { type: 'updatedDate', label: 'Updated Date', icon: MdOutlineUpdate, sub: blockTypes },
    { type: 'name', label: 'Name', icon: MdOutlineSortByAlpha, sub: blockTypes },
    { type: 'postCount', label: 'Post Count', icon: MdOutlineFormatListNumbered, sub: blockTypes },
    { type: 'views', label: 'views', icon: MdOutlineRemoveRedEye, sub: blockTypes },
];


export const createdDateSortTree: BLOCK_TYPE_OPTION[] = [
    { type: '-createdAt', label: 'Newest to Oldest', icon: MdOutlineNewReleases },
    { type: '+createdAt', label: 'Oldest to Newest', icon: MdOutlineHistory },
];

export const updatedDateSortTree: BLOCK_TYPE_OPTION[] = [
    { type: '-updatedAt', label: 'Newest to Oldest', icon: MdOutlineArrowDownward },
    { type: '+updatedAt', label: 'Oldest to Newest', icon: MdOutlineArrowUpward },
];

export const nameSortTree: BLOCK_TYPE_OPTION[] = [
    { type: '+name', label: 'A to Z', icon: MdOutlineSchedule },
    { type: '-name', label: 'Z to A', icon: MdOutlineUpdate },
];

export const postCountSortTree: BLOCK_TYPE_OPTION[] = [
    { type: '-postCount', label: 'highest to lowest', icon: MdOutlineSchedule },
    { type: '+postCount', label: 'lowest to highest', icon: MdOutlineUpdate },
];
export const viewsSortTree: BLOCK_TYPE_OPTION[] = [
    { type: '-views', label: 'highest to lowest', icon: MdOutlineSchedule },
    { type: '+views', label: 'lowest to highest', icon: MdOutlineUpdate },
];

export const videoDurationSortTree: BLOCK_TYPE_OPTION[] = [
    { type: '-videoDuration', label: 'highest to lowest', icon: MdOutlineSchedule },
    { type: '+videoDuration', label: 'lowest to highest', icon: MdOutlineUpdate },
];

export const readDurationSortTree: BLOCK_TYPE_OPTION[] = [
    { type: '-readDuration', label: 'highest to lowest', icon: MdOutlineSchedule },
    { type: '+readDuration', label: 'lowest to highest', icon: MdOutlineUpdate },
];


export const sortedTypeListSubTree: { [x: string]: BLOCK_TYPE_OPTION[] } = {
    createdDate: createdDateSortTree,
    updatedDate: updatedDateSortTree,
    name: nameSortTree,
    postCount: postCountSortTree,
    views: viewsSortTree
}


export const sortInterpretationTree: { [x: string]: BLOCK_TYPE_OPTION[] } = {
    createdAt: createdDateSortTree,
    updatedAt: updatedDateSortTree,
    name: nameSortTree,
    postCount: postCountSortTree,
    views: viewsSortTree,
    videoDuration: videoDurationSortTree,
    readDuration: readDurationSortTree
}

export const textMatchTree: { [x: string]: string } = {
    createdAt: 'Created Date',
    updatedAt: 'Updated Date',
    name: 'Name',
    postCount: 'Post Count',
    views: "Views"
}