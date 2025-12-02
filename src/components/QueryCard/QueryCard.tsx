import DateGroup from './DateGroup'
import classes from './QueryCard.module.css'
import SelectCard from './SelectCard'
import TotalCountCard from './TotalCountCard'

export default function QueryCard() {
    return (
        <div className={classes.container}>
            <TotalCountCard count={5} />
            <div className={classes.rightGroup}>
                <SelectCard title={'uploads'} />
                <DateGroup />
            </div>
        </div>
    )
}