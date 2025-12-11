import classes from './Content.module.css';
import Intro from '../../components/Home/Intro';
import { numberFormat } from '../../helpers/util';
import LastSync from '../../components/LastSync/LastSync';
import Table from '../../components/Table/Table';
import { contentFilterList, sortTypeList } from './constants';
import { GetCategoriesFilter } from '../../stateManagement/defaultValues';
import { useEffect } from 'react';
import TableBodyElements from '../../components/Contents/TableBodyElements';
import TableHeadElements from '../../components/Contents/TableHeadElements';
import Button from '../../components/Button/Button';
import { usePosts } from '../../stateManagement/usePosts';
import useFilter from '../../hooks/filter';
import { useNavigate, useParams } from 'react-router-dom';
import { useCategories } from '../../stateManagement/useCategories';
import BlockTypeMenu from '../../components/Block/BlockTypeMenu';
import { useKebab } from '../../hooks/kebab';
import { blockTypes } from '../home/constant';
import { getInterpretation } from '../home/helper';
import { routes } from '../../constants/utils';

export default function Contents() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { menuState, handleKebab, setMenuState } = useKebab();

    const { getCategoriesByIdResult, loadingCategoriesByIdResult, categoriesByIdLastFetchedTimeStamp, categoriesByIdResult } = useCategories();
    const { getPostsResult, loadingPostsResult, postsLastFetchedTimeStamp } = usePosts();
    const { filter, filterDialogState, handleFilterChange, handleMultiFilterChange, toggleFilterDialog } = useFilter({
        fil: GetCategoriesFilter
    })



    const fetchPosts = () => {
        getPostsResult({ ...filter, category: id });
    }

    useEffect(() => {
        if (id) {
            getCategoriesByIdResult(id)
        }
    }, [id])

    useEffect(() => {
        if (id) {
            fetchPosts();
        }

    }, [filter, id])

    return (
        <div className={classes.container}>

            <Intro
                title={categoriesByIdResult?.name || 'Fetching name...'}
                description='Here are the contents under this category' />
            <div className={classes.metricsDescription}>
                <p> <span>{
                    loadingCategoriesByIdResult ?
                        '--'
                        :
                        numberFormat.format(categoriesByIdResult?.postCount || 0)
                } </span>
                    Posts</p>
                |
                <p> <span>{
                    loadingCategoriesByIdResult ?
                        '--'
                        :
                        numberFormat.format(categoriesByIdResult?.views || 0)

                } </span> Times this category was opened</p>
                |
                <LastSync fetch={() => id && getCategoriesByIdResult(id)} lastFetched={categoriesByIdLastFetchedTimeStamp} loading={false} />

                <div className={classes.buttonContainer}>
                    <Button func={()=>{navigate(`${routes.space}/${categoriesByIdResult?.name}/${id}`)}} title={'Create Content'} />
                </div>
            </div>




            <Table
                tableHeadElements={<TableHeadElements sort={getInterpretation(filter.sort as string)} />}
                tableBodyElements={<TableBodyElements handleKebab={handleKebab} />}
                sortTypeList={sortTypeList}
                handleFilterChange={handleFilterChange}
                handleMultiFilterChange={handleMultiFilterChange}
                filterDialogState={filterDialogState}
                toggleFilterDialog={toggleFilterDialog}
                filter={filter}
                loading={loadingPostsResult}
                fetch={fetchPosts}
                lastFetched={postsLastFetchedTimeStamp}
                filterList={contentFilterList}
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