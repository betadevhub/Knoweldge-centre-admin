import { useState } from "react";
import CardList from "../../components/Home/cardList";
import { cards } from "../../components/Home/constant";
import Intro from "../../components/Home/Intro";
import TableHeadElements from "../../components/Home/TableHeadElements";
import Table from "../../components/Table/Table";
import useNavigation from "../../hooks/navigation";
import classes from './home.module.css'
import type { MENU_STATE } from "../space/types";
import BlockTypeMenu from "../../components/Block/BlockTypeMenu";
import TableBodyElements from "../../components/Home/TableBodyElements";


export default function Home() {
    const { func } = useNavigation();

    const [menuState, setMenuState] = useState<MENU_STATE>({
        isOpen: false,
        position: { top: 0, left: 0 },
        filter: ''
    });

    const handleKebab = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMenuState({
            isOpen: true,
            position: { top: rect.bottom + window.scrollY, left: rect.left },
            filter: ''
        });
    }


    return (
        <div className={classes.container}>
            <Intro title='Welcome, David.' description='Your space is ready. Start by uploading a guide.' />
            <CardList list={cards} func={func} />
            <Table 
            tableHeadElements={<TableHeadElements />} 
            tableBodyElements={<TableBodyElements handleKebab={handleKebab}  />}
            />

            {menuState.isOpen && (
                <BlockTypeMenu
                    activeBlockId={'1'}
                    position={menuState.position}
                    filter={menuState.filter}
                    onChangeBlockType={() => { }}
                    onClose={() => setMenuState(prev => ({ ...prev, isOpen: false }))}
                />
            )}
        </div>
    )
}