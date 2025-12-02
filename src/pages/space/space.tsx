import { useState } from 'react';
import classes from './space.module.css';
import type { BLOCK_TYPE, MENU_STATE } from './types';
import Block from '../../components/Block/Block';
import useBlocks from '../../hooks/useBlocks';
import BlockTypeMenu from '../../components/Block/BlockTypeMenu';

export default function Space() {
    const { blocks, activeBlock, setActiveBlock, addBlock, deleteBlock, updateBlock, changeBlockType, addBulletBlock } = useBlocks();
    const [menuState, setMenuState] = useState<MENU_STATE>({
        isOpen: false,
        position: { top: 0, left: 0 },
        filter: ''
    });

    const handleInput = (id: string, content: string, e: React.FormEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        updateBlock(id, { content });

        if (content.endsWith('/') && content.length === 1) {
            const rect = (e.target as HTMLElement).getBoundingClientRect();
            setMenuState({
                isOpen: true,
                position: { top: rect.bottom + window.scrollY, left: rect.left },
                filter: ''
            });
        }
    };

    const handleChangeBlockType = (id: string, newType: BLOCK_TYPE) => {
        changeBlockType(id, newType);
        setMenuState(prev => ({ ...prev, isOpen: false }));
    };



    return (
        <div className={classes.container}>
            <div className={classes.editorWrapper}>
                <div className={classes.blocksContainer}>
                    {blocks.map((block) => (
                        <Block
                            key={block.id}
                            block={block}
                            isActive={activeBlock === block.id}
                            onInput={handleInput}
                            onAddBlock={() => addBlock(block.id)}
                            onAddBullet={() => addBulletBlock(block.id)} // NEW
                            onDeleteBlock={() => deleteBlock(block.id)}
                            onChangeBlockType={handleChangeBlockType}
                            onFocus={() => setActiveBlock(block.id)}
                            onMenuOpen={setMenuState}
                        />
                    ))}
                </div>
            </div>

            {menuState.isOpen && (
                <BlockTypeMenu
                    activeBlockId={activeBlock}
                    position={menuState.position}
                    filter={menuState.filter}
                    onChangeBlockType={handleChangeBlockType}
                    onClose={() => setMenuState(prev => ({ ...prev, isOpen: false }))}
                />
            )}
        </div>
    );
}