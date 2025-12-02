import QueryCardWrapper from '../../wrappers/QueryCardWrapper';
import classes from './QueryCard.module.css';

export default function DateCard() {
    return (
        <QueryCardWrapper>
            <input type='date'  className={classes.select}/>
        </QueryCardWrapper>
    )
}