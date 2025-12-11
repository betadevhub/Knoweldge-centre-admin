import { useEffect } from "react";
import CardList from "../../components/Home/cardList";
import { cards, filterList } from "../../components/Home/constant";
import Intro from "../../components/Home/Intro";
import TableHeadElements from "../../components/Home/TableHeadElements";
import Table from "../../components/Table/Table";
import useNavigation from "../../hooks/navigation";
import BlockTypeMenu from "../../components/Block/BlockTypeMenu";
import TableBodyElements from "../../components/Home/TableBodyElements";
import { blockTypes, sortTypeList } from "./constant";
import { GetCategoriesFilter } from "../../stateManagement/defaultValues";
import { getInterpretation } from "./helper";
import { useCategories } from "../../stateManagement/useCategories";
import useFilter from "../../hooks/filter";
import { useKebab } from "../../hooks/kebab";


export default function Home() {
    const { func } = useNavigation();
    const { menuState, handleKebab, setMenuState } = useKebab();
    const { getCategoriesResult, loadingCategoriesResult, categoriesLastFetchedTimeStamp } = useCategories();
    const { filter, filterDialogState, handleFilterChange, handleMultiFilterChange, toggleFilterDialog } = useFilter({
        fil: GetCategoriesFilter
    })



    const fetchCategories = () => {
        getCategoriesResult(filter);
    }

    useEffect(() => {
        fetchCategories();
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
                filterList={filterList}
            />

            <BlockTypeMenu
                activeBlockId={'1'}
                position={menuState.position}
                filter={menuState.filter}
                onChangeBlockType={() => { }}
                onClose={() => setMenuState(prev => ({ ...prev, isOpen: false }))}
                typeList={blockTypes}
                isOpen={menuState.isOpen}
            />
        </div>
    )
}