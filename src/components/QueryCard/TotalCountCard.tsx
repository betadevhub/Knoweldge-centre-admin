import {  numberFormat } from '../../helpers/util';
import QueryCardWrapper from '../../wrappers/QueryCardWrapper';
import classes from './QueryCard.module.css';
import type { TOTAL_COUNT_CARD } from './types';
import LastSync from '../LastSync/LastSync';


export default function TotalCountCard(params: TOTAL_COUNT_CARD) {
    return (
        <div className={classes.totalCountCard}>
            <QueryCardWrapper background='#fff'>
                <p>Total Count</p>
            </QueryCardWrapper>
            <p className={classes.totalCountNumber}>{numberFormat.format(params.count)}</p>
            <LastSync fetch={params.fetch} lastFetched={params.lastFetched} loading={params.loading} />
        </div>
    )
}