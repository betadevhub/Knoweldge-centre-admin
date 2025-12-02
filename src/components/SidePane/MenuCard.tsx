import { useLocation } from 'react-router-dom';
import classes from './SidePane.module.css';
import type { MENU_CARD } from './types';

export default function MenuCard(params: MENU_CARD) {
    const {pathname: path} = useLocation();
    const isActive = path === params.route;

    return (
        <div onClick={() => params.func(params.route)} className={`${classes.menuCard} ${isActive ? classes.menuCardActive : 'F'}`}>
            {params.icon}
            <p>{params.name}</p>
        </div>
    )
}