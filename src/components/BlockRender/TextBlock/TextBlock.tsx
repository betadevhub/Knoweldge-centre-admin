import { useState, useRef, useEffect, useCallback } from 'react';
import type { TEXT_BLOCK } from '../types';
import classes from './TextBlock.module.css';
import RichTextToolbar from '../../Toolbar/Toolbar';
import type { TEXT_FORMAT } from '../../Toolbar/types';

export default function TextBlock(params: TEXT_BLOCK) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [showToolbar, setShowToolbar] = useState(false);
  const [toolbarPosition, setToolbarPosition] = useState({ x: 0, y: 0 });
  const [selection, setSelection] = useState<Range | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Save selection when it changes
  const saveSelection = useCallback(() => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      setSelection(sel.getRangeAt(0).cloneRange());
    }
  }, []);

  // Restore selection
  const restoreSelection = useCallback(() => {
    if (!selection) return;
    
    const sel = window.getSelection();
    if (sel) {
      sel.removeAllRanges();
      sel.addRange(selection);
    }
  }, [selection]);

  // Handle input
  const handleInput = useCallback(() => {
    if (!editorRef.current) return;
    
    const textContent = editorRef.current.textContent || '';
    
    // Create synthetic event with getBoundingClientRect
    const syntheticEvent = {
      target: { 
        value: textContent,
        getBoundingClientRect: () => editorRef.current!.getBoundingClientRect()
      },
      currentTarget: editorRef.current,
      getBoundingClientRect: () => editorRef.current!.getBoundingClientRect()
    } as unknown as React.FormEvent<HTMLTextAreaElement>;
    
    params.onInput(textContent, syntheticEvent);
  }, [params.onInput]);

  // Handle selection change
  const handleSelectionChange = useCallback(() => {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    
    const range = sel.getRangeAt(0);
    
    // Check if selection is within our editor
    if (editorRef.current?.contains(range.commonAncestorContainer)) {
      saveSelection();
      
      if (!sel.isCollapsed) {
        // Show toolbar above selection
        const rect = range.getBoundingClientRect();
        setToolbarPosition({
          x: rect.left + rect.width / 2,
          y: rect.top - 50
        });
        setShowToolbar(true);
      } else {
        setShowToolbar(false);
      }
    }
  }, [saveSelection]);

  // Handle formatting
  const handleFormatChange = useCallback((format: TEXT_FORMAT) => {
    if (!selection) return;
    
    // Restore selection first
    restoreSelection();
    
    // Apply formatting using execCommand
    if (format.bold) document.execCommand('bold', false);
    if (format.italic) document.execCommand('italic', false);
    if (format.underline) document.execCommand('underline', false);
    if (format.strikethrough) document.execCommand('strikethrough', false);
    if (format.code) document.execCommand('formatBlock', false, '<code>');
    if (format.color) document.execCommand('foreColor', false, format.color);
    if (format.highlightColor) document.execCommand('backColor', false, format.highlightColor);
    if (format.link) {
      const url = prompt('Enter URL:', format.link);
      if (url) document.execCommand('createLink', false, url);
    }
    
    // Update content
    handleInput();
    setShowToolbar(false);
  }, [selection, restoreSelection, handleInput]);

  const handleClearFormat = useCallback(() => {
    if (!selection) return;
    
    restoreSelection();
    document.execCommand('removeFormat', false);
    handleInput();
    setShowToolbar(false);
  }, [selection, restoreSelection, handleInput]);

  // Handle keyboard events
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    // Handle Enter key for new blocks
    if (e.key === 'Enter' && !e.shiftKey) {
        e?.preventDefault();
        // Create synthetic event with getBoundingClientRect
      const syntheticEvent = {
        ...e,
        target: {
          value: e.currentTarget.textContent || '',
          getBoundingClientRect: () => e.currentTarget.getBoundingClientRect()
        },
        currentTarget: e.currentTarget,
        getBoundingClientRect: () => e.currentTarget.getBoundingClientRect()
      } as unknown as React.KeyboardEvent<HTMLTextAreaElement>;
      
      params.onKeyDown(syntheticEvent);
    }
    // Handle Backspace for empty block
    else if (e.key === 'Backspace' && editorRef.current?.textContent === '') {
      e?.preventDefault();
      // Trigger block deletion through parent
      const syntheticEvent = {
        key: 'Backspace',
        preventDefault: () => {},
        target: editorRef.current,
        getBoundingClientRect: () => editorRef.current!.getBoundingClientRect(),
        currentTarget: editorRef.current
      } as unknown as React.KeyboardEvent<HTMLTextAreaElement>;
      params.onKeyDown(syntheticEvent);
    }
    // Handle Tab for indentation
    else if (e.key === 'Tab') {
      e.preventDefault();
      document.execCommand('insertHTML', false, '&nbsp;&nbsp;&nbsp;&nbsp;');
    }
    else {
      // Create synthetic event for other keys
      const syntheticEvent = {
        ...e,
        target: {
          value: e.currentTarget.textContent || '',
          getBoundingClientRect: () => e.currentTarget.getBoundingClientRect()
        },
        currentTarget: e.currentTarget,
        getBoundingClientRect: () => e.currentTarget.getBoundingClientRect()
      } as unknown as React.KeyboardEvent<HTMLTextAreaElement>;
      
      params.onKeyDown(syntheticEvent);
    }
  }, [params.onKeyDown]);

  // Set initial content
  useEffect(() => {
    if (editorRef.current && params.block.content !== editorRef.current.innerHTML) {
      // Preserve cursor position
      const savedSelection = selection;
      
      // Set content
      editorRef.current.innerHTML = params.block.content || '';
      
      // Restore cursor if needed
      if (savedSelection) {
        setTimeout(() => {
          const sel = window.getSelection();
          if (sel) {
            sel.removeAllRanges();
            sel.addRange(savedSelection);
          }
        }, 0);
      }
    }
  }, [params.block.content]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowToolbar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Add selectionchange listener
  useEffect(() => {
    const handleDocumentSelectionChange = () => {
      if (editorRef.current) {
        const sel = window.getSelection();
        if (sel && sel.rangeCount > 0) {
          const range = sel.getRangeAt(0);
          if (editorRef.current.contains(range.commonAncestorContainer)) {
            handleSelectionChange();
          }
        }
      }
    };

    document.addEventListener('selectionchange', handleDocumentSelectionChange);
    return () => document.removeEventListener('selectionchange', handleDocumentSelectionChange);
  }, [handleSelectionChange]);

  return (
    <div ref={containerRef} className={classes.container}>
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        className={classes.editor}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onFocus={params.onFocus}
        onMouseUp={handleSelectionChange}
        onKeyUp={handleSelectionChange}
        data-placeholder={params.block.placeholder}
      />

      <RichTextToolbar
        onFormatChange={handleFormatChange}
        onClearFormat={handleClearFormat}
        selection={selection || undefined}
        position={toolbarPosition}
        visible={showToolbar}
      />
    </div>
  );
}