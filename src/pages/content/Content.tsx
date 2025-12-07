import { useParams } from 'react-router-dom';
import classes from './Content.module.css';
import Intro from '../../components/Home/Intro';
import { numberFormat } from '../../helpers/util';
import LastSync from '../../components/LastSync/LastSync';
import Table from '../../components/Table/Table';
import { sortTypeList } from './constants';
import type { BUILD_FILTER } from '../../types';
import { GetCategoriesFilter } from '../../stateManagement/defaultValues';
import { useState } from 'react';
import TableBodyElements from '../../components/Contents/TableBodyElements';
import TableHeadElements from '../../components/Contents/TableHeadElements';
import Button from '../../components/Button/Button';

export default function Contents() {
    const params = useParams();
    const [filter, setFilter] = useState<BUILD_FILTER>(GetCategoriesFilter);
    const [filterDialogState, setFilterDialogState] = useState(false);

    const handleFilterChange = (name: string, value: string) => {
        setFilter((prev) => ({ ...prev, [name]: value }));
    }

    const handleMultiFilterChange = (values: BUILD_FILTER) => {
        setFilter(values);
    }

    return (
        <div className={classes.container}>
            <Intro
                title={'Ticket management'}
                description='Here are the contents under this category' />
            <div className={classes.metricsDescription}>
                <p> <span>{numberFormat.format(20)} </span>Posts</p>
                |
                <p> <span>{numberFormat.format(300)} </span> Times this category was opened</p>
                |
                <LastSync fetch={() => { }} lastFetched={''} loading={false} />

                <div className={classes.buttonContainer}>
                    <Button title={'Create Content'} />
                </div>
            </div>

            <Table
                tableHeadElements={<TableHeadElements sort={''} />}
                tableBodyElements={<TableBodyElements handleKebab={() => { }} />}
                sortTypeList={sortTypeList}
                handleFilterChange={handleFilterChange}
                handleMultiFilterChange={handleMultiFilterChange}
                filterDialogState={filterDialogState}
                toggleFilterDialog={() => { }}
                filter={filter}
                loading={false}
                fetch={() => { }}
                lastFetched={''}
            />

        </div>
    )
}