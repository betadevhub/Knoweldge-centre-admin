

import classes from './HomeComponent.module.css';
import type { CARD } from './types';

export default function Card(params: CARD) {
    return (
        <div onClick={() => params.func(params.route)} className={classes.cardContainer}>
            <div style={{background: params.color}} className={classes.cardIconContainer}>{params.icon}</div>
            <div className={classes.cardTextContainer}>
                <p className={classes.cardName}>{params.name}</p>
                <p className={classes.cardDescription}>{params.description}</p>
            </div>
        </div>
    )
}