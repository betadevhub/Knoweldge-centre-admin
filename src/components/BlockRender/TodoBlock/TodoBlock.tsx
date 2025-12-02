import classes from './TodoBlock.module.css';
import type { TODO_BLOCK } from '../types';
import useTextArea from '../../../hooks/useTextArea';


export default function TodoBlock(params: TODO_BLOCK) {
    const { textareaRef } = useTextArea({ block: params.block })
    const handleToggle = () => {
        if (params.onToggle) {
            params.onToggle(params.block.id, !params.block.checked);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        // Handle spacebar to toggle checkbox
        if (e.key === ' ' && e.target === document.activeElement) {
            e.preventDefault();
            handleToggle();
            return;
        }
        params.onKeyDown(e);
    };

    return (
        <div className={classes.todoWrapper}>
            <input
                type="checkbox"
                checked={params.block.checked || false}
                onChange={handleToggle}
                className={classes.checkbox}
                id={`checkbox-${params.block.id}`}
            />
            <label htmlFor={`checkbox-${params.block.id}`} className={classes.checkboxLabel} />
            <textarea
                ref={textareaRef}
                id={`block-${params.block.id}`}
                value={params.block.content}
                onChange={(e) => params.onInput(e.target.value, e)}
                onKeyDown={handleKeyDown}
                onFocus={params.onFocus}
                placeholder={params.block.placeholder}
                rows={1}
                className={`${classes.textarea} ${params.block.checked ? classes.checked : ''}`}
            />
        </div>
    );
}


