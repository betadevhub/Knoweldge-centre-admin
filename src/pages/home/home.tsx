import { useEffect, useState } from "react";
import CardList from "../../components/Home/cardList";
import { cards } from "../../components/Home/constant";
import Intro from "../../components/Home/Intro";
import TableHeadElements from "../../components/Home/TableHeadElements";
import Table from "../../components/Table/Table";
import useNavigation from "../../hooks/navigation";
import type { MENU_STATE } from "../space/types";
import BlockTypeMenu from "../../components/Block/BlockTypeMenu";
import TableBodyElements from "../../components/Home/TableBodyElements";
import { blockTypes, sortTypeList } from "./constant";
import { GetCategoriesFilter } from "../../stateManagement/defaultValues";
import { getInterpretation } from "./helper";
import { useCategories } from "../../stateManagement/useCategories";
import type { BUILD_FILTER } from "../../types";


export default function Home() {
    const { func } = useNavigation();
    const { getCategoriesResult, loadingCategoriesResult, categoriesLastFetchedTimeStamp } = useCategories();

    const [filter, setFilter] = useState<BUILD_FILTER>(GetCategoriesFilter);
    const [filterDialogState, setFilterDialogState] = useState(false);

    const [menuState, setMenuState] = useState<MENU_STATE>({
        isOpen: false,
        position: { top: 0, left: 0 },
        filter: ''
    });

    const handleFilterChange = (name: string, value: string) => {
        setFilter((prev) => ({ ...prev, [name]: value }));
    }

    const handleMultiFilterChange = (values: BUILD_FILTER) => {
        setFilter(values);
    }

    const handleKebab = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMenuState({
            isOpen: true,
            position: { top: rect.bottom + window.scrollY, left: rect.left },
            filter: ''
        });
    };

    const toggleFilterDialog = () => {
        setFilterDialogState(prev => !prev)
    }


    const fetchCategories = () => {
         getCategoriesResult(filter); 
        }

    useEffect(() => {
        fetchCategories()
    }, [filter])



    return (
        <div >
            <Intro title='Welcome, David.' description='Your space is ready. Start by uploading a guide.' />
            <CardList list={cards} func={func} />
            <Table
                tableHeadElements={<TableHeadElements sort={getInterpretation(filter.sort as string)} />}
                tableBodyElements={<TableBodyElements handleKebab={handleKebab} />}
                sortTypeList={sortTypeList}
                handleFilterChange={handleFilterChange}
                handleMultiFilterChange={handleMultiFilterChange}
                filterDialogState={filterDialogState}
                toggleFilterDialog={toggleFilterDialog}
                filter={filter}
                loading={loadingCategoriesResult}
                fetch={fetchCategories}
                lastFetched={categoriesLastFetchedTimeStamp}
            />

            {menuState.isOpen && (
                <BlockTypeMenu
                    activeBlockId={'1'}
                    position={menuState.position}
                    filter={menuState.filter}
                    onChangeBlockType={() => { }}
                    onClose={() => setMenuState(prev => ({ ...prev, isOpen: false }))}
                    typeList={blockTypes}

                />
            )}
        </div>
    )
}