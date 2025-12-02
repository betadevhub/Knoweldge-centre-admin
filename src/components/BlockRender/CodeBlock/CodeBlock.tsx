import { useState, useRef, useEffect } from 'react';
import classes from './CodeBlock.module.css';
import type { TEXT_BLOCK } from '../types';


export default function CodeBlock(params:TEXT_BLOCK) {
    const [language, setLanguage] = useState('javascript');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        // Handle tab key for indentation
        if (e.key === 'Tab') {
            e.preventDefault();
            const textarea = e.target as HTMLTextAreaElement;
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const value = textarea.value;

            // Insert 2 spaces at cursor
            textarea.value = value.substring(0, start) + '  ' + value.substring(end);
            textarea.selectionStart = textarea.selectionEnd = start + 2;

            params.onInput(textarea.value, e as unknown as React.FormEvent<HTMLTextAreaElement>);
        } else {
            params.onKeyDown(e);
        }
    };

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [params.block.content]);

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(e.target.value);
    };

    return (
        <div className={classes.codeWrapper}>
            <div className={classes.codeHeader}>
                <select
                    value={language}
                    onChange={handleLanguageChange}
                    className={classes.languageSelect}
                >
                    <option value="javascript">JavaScript</option>
                    <option value="typescript">TypeScript</option>
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                    <option value="html">HTML</option>
                    <option value="css">CSS</option>
                    <option value="json">JSON</option>
                </select>
            </div>
            <div className={classes.codeContent}>
                <textarea
                    ref={textareaRef}
                    id={`block-${params.block.id}`}
                    value={params.block.content}
                    onChange={(e) => params.onInput(e.target.value, e)}
                    onKeyDown={handleKeyDown}
                    onFocus={params.onFocus}
                    placeholder={params.block.placeholder}
                    rows={Math.max(3, params.block.content.split('\n').length)}
                    className={`${classes.textarea} ${classes.codeText}`}
                    spellCheck={false}
                />
                <div className={classes.lineNumbers}>
                    {params.block.content.split('\n').map((_, i) => (
                        <div key={i} className={classes.lineNumber}>{i + 1}</div>
                    ))}
                </div>
            </div>
        </div>
    );
}
