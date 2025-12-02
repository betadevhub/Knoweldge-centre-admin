import type { QUERY_CARD_WRAPPER } from "./types";
import classes from './wrapper.module.css'

export default function QueryCardWrapper(params: QUERY_CARD_WRAPPER) {
    return <div style={{ background: params.background }} className={classes.queryCard}>{params.children}</div>
}