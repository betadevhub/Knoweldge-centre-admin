import { useState } from "react";
import type { MENU_STATE } from "../pages/space/types";

export const useKebab = () => {

    const [menuState, setMenuState] = useState<MENU_STATE>({
        isOpen: false,
        position: { top: 0, left: 0 },
        filter: ''
    });

    const handleKebab = (e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMenuState({
            isOpen: true,
            position: { top: rect.bottom + window.scrollY, left: rect.left },
            filter: ''
        });
    };


    return { menuState, handleKebab, setMenuState }
}