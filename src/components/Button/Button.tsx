import classes from './Button.module.css';
import type { BUTTON } from './types';

export default function Button(params: BUTTON) {
    return (
        <button className={classes.container}>
            {params.title}
        </button>
    )
}