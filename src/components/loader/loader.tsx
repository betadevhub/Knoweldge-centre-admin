import classes from './loader.module.css'
import type { LOADER } from './types'

export default function Loader(params: LOADER) {
    return (
        <div style={params?.background ? { background: params.background } : {}} className={classes.loader}></div>
    )
}