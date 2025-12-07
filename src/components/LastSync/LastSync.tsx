import { HiOutlineRefresh } from 'react-icons/hi';
import classes from './LastSync.module.css';
import { dateFormat } from '../../helpers/util';
import type { LAST_SYNC } from './types';

export default function LastSync(params: LAST_SYNC) {
    return (
        <>
            <HiOutlineRefresh onClick={params.fetch} className={`${classes.refreshIcon} ${params.loading ? classes.loading : ''}`} />
            <p className={classes.lastFetched}>Last Fetched: {params.lastFetched ?
                `${dateFormat(String(params.lastFetched))} at ${new Date(params.lastFetched).toLocaleTimeString()}`
                : '-'}</p>
        </>
    )
}