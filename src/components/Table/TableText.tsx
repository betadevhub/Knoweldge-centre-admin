import classes from './Table.module.css';
import type { TABLE_TEXT } from './types';


export default function TableText(params: TABLE_TEXT) {
    return (
        <div className={`${classes.tableText} ${classes[params.size]}`}>
            <p>{params.title}</p>
        </div>
    )
}