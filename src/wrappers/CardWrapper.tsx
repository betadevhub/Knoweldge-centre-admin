import classes from './wrapper.module.css';
import type { CARD_WRAPPER } from './types';
import standalonelogo from '../assets/standaloneticketlogo.svg'

export default function CardWrapper(params: CARD_WRAPPER) {
    return (
        <div className={classes.cardWrapper}>
            {params?.addLogo && <img src={standalonelogo} alt='ticket lush logo'  className={classes.standalonelogo}/>}
            <p className={classes.cardWrapperTitle}>{params.title}</p>
            {params.children}
        </div>
    )
}