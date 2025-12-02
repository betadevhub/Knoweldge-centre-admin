import classes from './QuoteBlock.module.css';
import type { TEXT_BLOCK } from '../types';
import useTextArea from '../../../hooks/useTextArea';


export default function QuoteBlock(params: TEXT_BLOCK) {
  const { textareaRef } = useTextArea({ block: params.block })
  return (
    <div className={classes.quoteWrapper}>
      <div className={classes.quoteBar} />
      <textarea
        ref={textareaRef}
        id={`block-${params.block.id}`}
        value={params.block.content}
        onChange={(e) => params.onInput(e.target.value, e)}
        onKeyDown={params.onKeyDown}
        onFocus={params.onFocus}
        placeholder={params.block.placeholder}
        rows={2}
        className={`${classes.textarea} ${classes.quoteText}`}
      />
    </div>
  );
}
