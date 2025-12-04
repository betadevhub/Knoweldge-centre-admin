import { GoKebabHorizontal } from "react-icons/go";
import classes from './kebab.module.css';
import type { KEBAB } from "./types";

export default function Kebab(params: KEBAB) {
    return (
        <div onClick={params.handleKebab} className={classes.container}>
            <div className={classes.iconContainer}>
                <GoKebabHorizontal className={classes.icon} />
            </div>
        </div>
    )
}