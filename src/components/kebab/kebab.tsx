import { GoKebabHorizontal } from "react-icons/go";
import classes from './kebab.module.css';

export default function Kebab() {
    return (
        <div className={classes.container}>
            <div className={classes.iconContainer}>
                <GoKebabHorizontal className={classes.icon} />
            </div>
        </div>
    )
}