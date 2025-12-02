import type { MAIN_WRAPPER } from './types';
import classes from './wrapper.module.css';

export default function AuthWrapper(params: MAIN_WRAPPER) {

    return (
        <div className={classes.authWrapper}>
            {params.children}
        </div>
    )
}