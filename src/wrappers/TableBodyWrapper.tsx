import type { QUERY_CARD_WRAPPER } from './types';
import classes from './wrapper.module.css';

export default function TableBodyWrapper(params: QUERY_CARD_WRAPPER) {
    return (
        <div style={params.background ? { background: params.background } : {}} className={`${classes.tableHead} ${classes.tableBody}`}>
            {params.children}
        </div>
    )
}