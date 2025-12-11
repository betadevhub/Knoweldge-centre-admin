import type { SPACE_HEADER_TEXT } from "./types";
import classes from './SpaceHeader.module.css';

export default function SpaceHeaderText(params: SPACE_HEADER_TEXT) {
    return (
        <div className={classes.spaceHeaderText}>
            {params.icon}
            {
                params?.editable ?
                    <input value={params.text} onChange={(e) => params.func?.(e.target.name, e.target.value)} name="name" type="text" required className={classes.input} placeholder="Enter your post name" />
                    :
                    <p className={classes.text}>{params.text}</p>
            }
        </div>
    )
}