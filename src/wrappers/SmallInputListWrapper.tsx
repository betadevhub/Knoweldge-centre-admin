import type { MAIN_WRAPPER } from './types';
import classes from './wrapper.module.css';

export default function SmallInputListWrapper(params: MAIN_WRAPPER) {
    return (
        <div className={classes.mainWrapper}>
            {params.children}
        </div>
    )

}