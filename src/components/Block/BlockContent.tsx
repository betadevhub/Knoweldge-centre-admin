import classes from './Block.module.css';
import type { BLOCK_CONTENT } from './types';
import TodoBlock from '../BlockRender/TodoBlock/TodoBlock';
import QuoteBlock from '../BlockRender/QuoteBlock/QuoteBlock';
import TextBlock from '../BlockRender/TextBlock/TextBlock';
import CodeBlock from '../BlockRender/CodeBlock/CodeBlock';
import HeadingBlock from '../BlockRender/HeadingBlock/HeadingBlock';
import ListBlock from '../BlockRender/ListBlock/ListBlock';
import LinkBlock from '../BlockRender/LinkBlock/LinkBlock';
import ImageBlock from '../BlockRender/ImageBlock/ImageBlock';



export default function BlockContent(params: BLOCK_CONTENT) {
  const renderBlock = () => {
    switch (params.block.type) {
      case 'h1':
      case 'h2':
      case 'h3':
        return (
          <HeadingBlock
            block={params.block}
            onInput={params.onInput}
            onKeyDown={params.onKeyDown}
            onFocus={params.onFocus}
          />
        );
      case 'bullet':
        return (
          <ListBlock
            block={params.block}
            onInput={params.onInput}
            onKeyDown={params.onKeyDown}
            onFocus={params.onFocus}
          />
        );
      case 'todo':
        return (
          <TodoBlock
            block={params.block}
            onInput={params.onInput}
            onKeyDown={params.onKeyDown}
            onFocus={params.onFocus}
          />
        );
      case 'quote':
        return (
          <QuoteBlock
            block={params.block}
            onInput={params.onInput}
            onKeyDown={params.onKeyDown}
            onFocus={params.onFocus}
          />
        );
      case 'code':
        return (
          <CodeBlock
            block={params.block}
            onInput={params.onInput}
            onKeyDown={params.onKeyDown}
            onFocus={params.onFocus}
          />
        );
      case 'link':
        return (
          <LinkBlock
            block={params.block}
            onInput={params.onInput}
            onKeyDown={params.onKeyDown}
            onFocus={params.onFocus}
            onUpdate={params.onUpdateBlock}
          />
        );
      case 'image':
        return (
          <ImageBlock
            block={params.block}
            onInput={params.onInput}
            onKeyDown={params.onKeyDown}
            onFocus={params.onFocus}
            onUpdate={params.onUpdateBlock}
          />
        );
      default:
        return (
          <TextBlock
            block={params.block}
            onInput={params.onInput}
            onKeyDown={params.onKeyDown}
            onFocus={params.onFocus}
          />
        );
    }
  };

  return <div className={classes.blockContent}>{renderBlock()}</div>;
}


