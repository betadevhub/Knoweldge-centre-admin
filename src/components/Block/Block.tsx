// components/Block/Block.tsx
import BlockHeader from './BlockHeader';
import classes from './Block.module.css';
import type { BLOCK_PROPS } from './types';
import BlockContent from './BlockContent';
import { useState } from 'react';
import type { INPUT_EVENT, KEYBOARD_EVENT } from '../BlockRender/types';
import useTextArea from '../../hooks/useTextArea';

export default function Block(params: BLOCK_PROPS) {
    const [isHovered, setIsHovered] = useState(false);
    const { textareaRef } = useTextArea({ block: params.block });

    const handleKeyDown = (e: KEYBOARD_EVENT) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e?.preventDefault && e?.preventDefault();
            
            // Special handling for bullet blocks
            if (params.block.type === 'bullet') {
                e?.preventDefault && e?.preventDefault();
                if (params.onAddBullet) {
                    params.onAddBullet(params.block.id);
                } else {
                    // Fallback to regular behavior
                    params.onAddBlock(params.block.id);
                }
            } else {
                // Regular block - add new block
                params.onAddBlock(params.block.id);
            }
        } else if (e.key === 'Backspace' && params.block.content === '') {
            e?.preventDefault && e?.preventDefault();
            
            params.onDeleteBlock(params.block.id);
        }
    };

    const handleInput = (content: string, e: INPUT_EVENT) => {
        params.onInput(params.block.id, content, e);

        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    return (
        <div
            className={`${classes.blockRow} ${params.isActive ? classes.active : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <BlockHeader
                onAddBlock={() => params.onAddBlock(params.block.id)}
                onDeleteBlock={() => params.onDeleteBlock(params.block.id)}
                isVisible={isHovered}
            />

            <BlockContent
                block={params.block}
                onInput={handleInput}
                onKeyDown={handleKeyDown}
                onFocus={() => params.onFocus(params.block.id)}
            />
        </div>
    );
}