import classes from './HomeComponent.module.css';
import type { INTRO } from './types';

export default function Intro(params: INTRO) {
    return (
        <div className={classes.container}>
            <p className={classes.title}>{params.title}</p>
            <p className={classes.description}>{params.description}</p>
        </div>
    )
}
