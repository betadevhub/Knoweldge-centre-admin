import { useState } from 'react';
import classes from './input.module.css';
import type { INPUT } from './types';

export default function Input(params: INPUT) {
    const [type, setType] = useState(params.type);

    const togglePasswordIcon = () => {
        setType((prev) => {
            return prev === 'text' ? 'password' : 'text'
        })
    }

    return (
        <div className={classes.inputContainer}>
            <div className={classes.label}>
                <p>{params.label}</p>
                {
                    params.type === 'password' &&
                    <div className={classes.togglePasswordIcon} onClick={togglePasswordIcon}>
                        {type === 'password' ?
                            <p>SHOW</p> : <p>HIDE</p>}
                    </div>
                }
            </div>
            <input disabled={params.disabled} onChange={params.handleChange} value={params.value} required={params.required} className={`${classes.input} ${params.size === 'small' ? classes.smallInput : ''}`} type={type} placeholder={params.placeholder} name={params.name} />


        </div>
    )
}