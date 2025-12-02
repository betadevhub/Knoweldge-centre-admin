import { getHeadingClass, getRows } from '../../../helpers/space';
import useTextArea from '../../../hooks/useTextArea';
import type { TEXT_BLOCK } from '../types';
import classes from './HeadingBlock.module.css';

export default function HeadingBlock(params: TEXT_BLOCK) {
    const { textareaRef } = useTextArea({ block: params.block })

    return (
        <textarea
            ref={textareaRef}
            id={`block-${params.block.id}`}
            value={params.block.content}
            onChange={(e) => params.onInput(e.target.value, e)}
            onKeyDown={params.onKeyDown}
            onFocus={params.onFocus}
            placeholder={params.block.placeholder}
            rows={getRows(params.block.type)}
            className={`${classes.textarea} ${getHeadingClass(params.block.type)}`}
        />
    );
}


