import type { SPACE_HEADER_TEXT } from "./types";
import classes from './SpaceHeader.module.css';
import { useState } from "react";

export default function SpaceHeaderText(params: SPACE_HEADER_TEXT) {
    const [value, setValue] = useState('Untilled Post');
    return (
        <div className={classes.spaceHeaderText}>
            {params.icon}
            {
                params?.editable ?
                    <input value={value} onChange={(e) => setValue(e.target.value)} name="value" type="text" required className={classes.input} placeholder="Enter your post name" />
                    :
                    <p className={classes.text}>{params.text}</p>
            }
        </div>
    )
}