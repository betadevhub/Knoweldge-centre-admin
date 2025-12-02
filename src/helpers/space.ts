
import classes from '../components/BlockRender/HeadingBlock/HeadingBlock.module.css'
import type { INPUT_EVENT } from '../components/BlockRender/types';
import { baseWidth } from '../constants/utils';

export const getHeadingClass = (type: string): string => {
    switch (type) {
        case 'h1':
            return classes.h1;
        case 'h2':
            return classes.h2;
        case 'h3':
            return classes.h3;
        default:
            return '';
    }
};

export const getRows = (type: string): number => {
    switch (type) {
        case 'h1':
            return 2;
        case 'h2':
        case 'h3':
            return 1;
        default:
            return 1;
    }
};


export const isTextAreaEvent = (
    e: INPUT_EVENT
): e is React.FormEvent<HTMLTextAreaElement> => {
    return (e.target as HTMLElement).tagName === 'TEXTAREA';
};

export const isInputEvent = (
    e: INPUT_EVENT
): e is React.FormEvent<HTMLInputElement> => {
    return (e.target as HTMLElement).tagName === 'INPUT';
};


export const extractYouTubeId = (url: string): string | null => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
};

export const scale = (size: number) => {
    const width = window.innerWidth;
    return (width * size) / baseWidth
};