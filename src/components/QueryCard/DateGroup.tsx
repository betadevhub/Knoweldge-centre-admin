import DateCard from './DateCard';
import classes from './QueryCard.module.css';

export default function DateGroup() {
    return (
        <div className={classes.dateCardGroup}>
            <DateCard />
            <p>-</p>
            <DateCard />
        </div>
    )
}