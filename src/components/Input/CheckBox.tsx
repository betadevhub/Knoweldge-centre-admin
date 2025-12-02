import classes from './input.module.css';
import type { CHECKBOX } from './types';

export default function CheckBox(params: CHECKBOX) {
    return (
        <div style={{ borderColor: params.color }} className={classes.checkBoxContainer}>

        </div>
    )
}