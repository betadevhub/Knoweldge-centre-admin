import Loader from '../loader/loader';
import classes from './Button.module.css';
import type { BUTTON } from './types';

export default function Button(params: BUTTON) {
    return (
        <button onClick={params.func} disabled={params.disabled} className={classes.container}>
            {params.title}
            {params.loading && <Loader background='#fff' />}
        </button>
    )
}