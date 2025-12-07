import QueryCardWrapper from '../../wrappers/QueryCardWrapper';
import type { SELECT_CARD } from './types';
import classes from './QueryCard.module.css';
import { useState } from 'react';
import type { BLOCK_TYPE_OPTION, MENU_STATE } from '../../pages/space/types';
import BlockTypeMenu from '../Block/BlockTypeMenu';
import { scale } from '../../helpers/space';
import { sortedTypeListSubTree } from '../../pages/home/constant';


export default function SelectCard(params: SELECT_CARD) {

    const [typeList, setTypeList] = useState<BLOCK_TYPE_OPTION[]>([])
    const [childTypeList, setChildTypeList] = useState<BLOCK_TYPE_OPTION[]>([])

    const [menuState, setMenuState] = useState<MENU_STATE>({
        isOpen: false,
        position: { top: 0, left: 0 },
        filter: ''
    });


    const [childMenuState, setChildMenuState] = useState<MENU_STATE>({
        isOpen: false,
        position: { top: 0, left: 0 },
        filter: ''
    });


    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setTypeList(params.sortTypeList)
        setMenuState({
            isOpen: true,
            position: { top: rect.bottom + window.scrollY, left: rect.left },
            filter: ''
        });
    };

    const handleSubClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const t = sortedTypeListSubTree[e.currentTarget.name]
        setChildTypeList(t)
        setChildMenuState({
            isOpen: true,
            position: { top: rect.bottom + window.scrollY, left: rect.left + scale(-250) },
            filter: ''
        });
    };
    return (
        <div className={classes.dateCardGroup}>
            <button name='sort' onClick={handleClick}>
                <QueryCardWrapper>
                    Sort
                </QueryCardWrapper>
            </button>

            <button name='filter' onClick={params.toggleFilterDialog}>
                <QueryCardWrapper>
                    Filter
                </QueryCardWrapper>
            </button>

            {menuState.isOpen && (
                <BlockTypeMenu
                    activeBlockId={'1'}
                    position={menuState.position}
                    filter={menuState.filter}
                    onChangeBlockType={() => { console.log('abc') }}
                    forSubClick={handleSubClick}
                    onClose={() => setMenuState(prev => ({ ...prev, isOpen: false }))}
                    typeList={typeList}
                />
            )}


            {childMenuState.isOpen && (
                <BlockTypeMenu
                    activeBlockId={'1'}
                    position={childMenuState.position}
                    filter={menuState.filter}
                    onChangeBlockType={(_id, newType) => {
                        params.handleFilterChange('sort', newType)
                        setChildMenuState(prev => ({ ...prev, isOpen: false }))
                    }}
                    onClose={() => {
                        setChildMenuState(prev => ({ ...prev, isOpen: false }))
                    }
                    }
                    typeList={childTypeList}
                />
            )}
        </div>
    )
}