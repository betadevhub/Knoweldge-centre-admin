import { useState, useCallback } from 'react';
import type { BLOCK, BLOCK_TYPE } from '../pages/space/types';
import { Blocks } from '../pages/space/constants';


export default function useBlocks() {
    const [blocks, setBlocks] = useState<BLOCK[]>(Blocks);
    const [activeBlock, setActiveBlock] = useState<string>('1');

    const addBlock = useCallback((afterId: string) => {
        const newBlock: BLOCK = {
            id: Date.now().toString(),
            type: 'text',
            content: '',
            placeholder: "Type '/' for commands"
        };

        setBlocks(prev => {
            const index = prev.findIndex(b => b.id === afterId);
            const newBlocks = [...prev];
            newBlocks.splice(index + 1, 0, newBlock);
            return newBlocks;
        });

        setActiveBlock(newBlock.id);
    }, []);


    const addBulletBlock = useCallback((afterId: string) => {
        const newBlock: BLOCK = {
            id: Date.now().toString(),
            type: 'bullet',
            content: '',
            placeholder: 'List item'
        };
    
        setBlocks(prev => {
            const index = prev.findIndex(b => b.id === afterId);
            const newBlocks = [...prev];
            newBlocks.splice(index + 1, 0, newBlock);
            return newBlocks;
        });
    
        setActiveBlock(newBlock.id);
    }, []);

    const deleteBlock = useCallback((id: string) => {
        setBlocks(prev => {
            const index = prev.findIndex(b => b.id === id);
            if (prev.length > 1 && index > 0) {
                const newBlocks = prev.filter(b => b.id !== id);
                setActiveBlock(newBlocks[index - 1].id);
                return newBlocks;
            }
            return prev;
        });
    }, []);

    const updateBlock = useCallback((id: string, updates: Partial<BLOCK>) => {
        setBlocks(prev =>
            prev.map(block =>
                block.id === id ? { ...block, ...updates } : block
            )
        );
    }, []);

    const changeBlockType = useCallback((id: string, newType: BLOCK_TYPE) => {
        setBlocks(prev =>
            prev.map(block => {
                if (block.id !== id) return block;

                // Clear URL-related fields when switching away from link/image
                const shouldClearUrl = !['link', 'image'].includes(newType) && ['link', 'image'].includes(block.type);

                return {
                    ...block,
                    type: newType,
                    content: shouldClearUrl ? '' : block.content.replace(/^\/.*$/, ''),
                    url: shouldClearUrl ? undefined : block.url,
                    alt: shouldClearUrl ? undefined : block.alt,
                    placeholder: getPlaceholderForType(newType)
                };
            })
        );
    }, []);

    const getPlaceholderForType = (type: BLOCK_TYPE): string => {
        const placeholders: Record<BLOCK_TYPE, string> = {
            'text': 'Just start typing...',
            'h1': 'Heading 1',
            'h2': 'Heading 2',
            'h3': 'Heading 3',
            'bullet': 'List item',
            'todo': 'To-do',
            'quote': 'Quote',
            'code': 'Code snippet',
            'link': 'Link',
            'image': 'Image',
        };
        return placeholders[type];
    };

    return {
        blocks,
        activeBlock,
        setActiveBlock,
        addBlock,
        addBulletBlock,
        deleteBlock,
        updateBlock,
        changeBlockType
    };
}

