// components/BlockRenderer/ListBlock.tsx
import useTextArea from '../../../hooks/useTextArea';
import type { TEXT_BLOCK } from '../types';
import classes from './ListBlock.module.css';

export default function ListBlock(params: TEXT_BLOCK) {
    const { textareaRef } = useTextArea({ block: params.block });
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            
            // Get current cursor position
            const textarea = e.currentTarget;
            const cursorPos = textarea.selectionStart;
            const text = textarea.value;
            
            // Check if we're at the end of the line or line is empty
            if (cursorPos === text.length || text.trim() === '') {
                // Create a new bullet block
                params.onKeyDown({
                    ...e,
                    key: 'Enter',
                    currentTarget: textarea,
                    preventDefault: () => {},
                    isNewBullet: true // Custom flag
                } as unknown as React.KeyboardEvent<HTMLTextAreaElement>);
            } else {
                // Insert newline with bullet at the cursor position
                const beforeCursor = text.substring(0, cursorPos);
                const afterCursor = text.substring(cursorPos);
                
                // Update current block with text before cursor
                textarea.value = beforeCursor;
                params.onInput(beforeCursor, e);
                
                // Create new bullet block with text after cursor
                setTimeout(() => {
                    params.onKeyDown({
                        ...e,
                        key: 'Enter',
                        currentTarget: textarea,
                        preventDefault: () => {},
                        isNewBullet: true,
                        carryOverText: afterCursor // Text to carry to new block
                    } as unknown as React.KeyboardEvent<HTMLTextAreaElement>);
                }, 0);
            }
        } else if (e.key === 'Backspace') {
            const textarea = e.currentTarget;
            const cursorPos = textarea.selectionStart;
            
            // If backspace at beginning of line with no text, delete the bullet
            if (cursorPos === 0 && textarea.value === '') {
                e.preventDefault();
                params.onKeyDown(e);
            } else {
                params.onKeyDown(e);
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            // Add indentation (2 spaces) at cursor
            const textarea = e.currentTarget;
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const value = textarea.value;
            
            textarea.value = value.substring(0, start) + '  ' + value.substring(end);
            textarea.selectionStart = textarea.selectionEnd = start + 2;
            
            params.onInput(textarea.value, e);
        } else {
            params.onKeyDown(e);
        }
    };

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        params.onInput(e.target.value, e);
    };

    return (
        <div className={classes.listWrapper}>
            <span className={classes.bullet}>•</span>
            <textarea
                ref={textareaRef}
                id={`block-${params.block.id}`}
                value={params.block.content}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                onFocus={params.onFocus}
                placeholder={params.block.placeholder}
                rows={1}
                className={`${classes.textarea} ${classes.listText}`}
            />
        </div>
    );
}