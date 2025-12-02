import type { INPUT_LIST } from './types';
import classes from './wrapper.module.css';

export default function InputList(params: INPUT_LIST) {
    return (
        <form onSubmit={params.cta} className={classes.inputListWrapper}>
            {params.children}
        </form>
    )
}