import classes from './Table.module.css';
import type { TABLE_NAME } from './types';

export default function TableName(params: TABLE_NAME) {
    return (
        <>
            {params.title} <span className={classes.sortText}>{params.sort ? `${params.sort}` : ''}</span>
        </>
    )
}