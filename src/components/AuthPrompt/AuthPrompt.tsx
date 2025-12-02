import classes from './Authprompt.module.css';
import type { AUTH_PROMPT } from './types';

export default function AuthPrompt(params:AUTH_PROMPT) {
    return(
        <p className={classes.authText}>
            {params.foreText}
            <span onClick={params.ctaFunc} className={classes.ctaText}> {params.ctaText}</span>
        </p>
    )
}