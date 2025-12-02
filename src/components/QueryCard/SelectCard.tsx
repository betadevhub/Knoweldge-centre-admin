import QueryCardWrapper from '../../wrappers/QueryCardWrapper';
import classes from './QueryCard.module.css';
import type { SELECT_CARD } from './types';


export default function SelectCard(params: SELECT_CARD) {
    return (
        <QueryCardWrapper>
            <select className={classes.select}>
                <option>All {params.title}</option>
            </select>
        </QueryCardWrapper>
    )
}