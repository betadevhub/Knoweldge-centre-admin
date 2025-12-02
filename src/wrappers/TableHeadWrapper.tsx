import type { QUERY_CARD_WRAPPER } from './types';
import classes from './wrapper.module.css';

export default function TableHeadWrapper(params: QUERY_CARD_WRAPPER) {
    return (
        <div className={classes.tableHead}>
            {params.children}
        </div>
    )
}