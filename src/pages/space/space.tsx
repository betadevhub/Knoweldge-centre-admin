import classes from './space.module.css';
import type { BLOCK_TYPE } from './types';
import Block from '../../components/Block/Block';
import useBlocks from '../../hooks/useBlocks';
import BlockTypeMenu from '../../components/Block/BlockTypeMenu';
import SpaceHeader from '../../components/SpaceHeader/SpaceHeader';
import { blockTypes } from '../../components/Block/constants';
import { useKebab } from '../../hooks/kebab';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { URL, withCredentials } from '../../constants/utils';
import { useError } from '../../stateManagement/useError';

export default function Space() {
    const { handleAPIError } = useError();
    const { menuState, setMenuState } = useKebab();
    const { blocks, activeBlock, setActiveBlock, addBlock, deleteBlock, updateBlock, changeBlockType, addBulletBlock, setBlocks } = useBlocks();
    const [searchParams] = useSearchParams() || {};
    const postId = searchParams.get('postId')



    const [fetchingBlocks, setFetchingBlocks] = useState(false);
    const [existingName, setExistingName] = useState('')

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


    const fetchBlocks = async () => {
        setFetchingBlocks(true)
        try {
            const res = await axios.get(`${URL}/content?postId=${postId}`, withCredentials);
            const contents = res.data?.data?.contents
            setBlocks(contents);
            setExistingName(contents[0]?.postDetails?.name);

        } catch (error) {
            handleAPIError(error)

        } finally {
            setFetchingBlocks(false)
        }
    }

    useEffect(() => {
        if (postId) {
            console.log(postId)
            fetchBlocks()
        }
    }, [postId])


    if (fetchingBlocks) {
        return (
            <p>Fetching Blocks...</p>
        )
    }

    return (
        <div className={classes.container}>
            <SpaceHeader blocks={blocks} setBlocks={setBlocks} existingName={existingName} />
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

            <BlockTypeMenu
                activeBlockId={activeBlock}
                position={menuState.position}
                filter={menuState.filter}
                onChangeBlockType={handleChangeBlockType}
                onClose={() => setMenuState(prev => ({ ...prev, isOpen: false }))}
                typeList={blockTypes}
                isOpen={menuState.isOpen}
            />
        </div>
    );
}