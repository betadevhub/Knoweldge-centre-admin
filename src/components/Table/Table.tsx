import TableHeadWrapper from '../../wrappers/TableHeadWrapper';
import QueryCard from '../QueryCard/QueryCard';
import Filter from './Filter';
import classes from './Table.module.css';
import type { TABLE } from './types';


export default function Table(params: TABLE) {
    return (
        <div className={classes.parent}>
            <div className={classes.container}>
                <QueryCard lastFetched={params.lastFetched} fetch={params.fetch} loading={params.loading} filter={params.filter} toggleFilterDialog={params.toggleFilterDialog} sortTypeList={params.sortTypeList} handleFilterChange={params.handleFilterChange} />
                <TableHeadWrapper>
                    {params.tableHeadElements}
                </TableHeadWrapper>
                {params.tableBodyElements}
            </div>
            <Filter filter={params.filter} filterDialogState={params.filterDialogState} toggleFilterDialog={params.toggleFilterDialog} filterList={params.filterList} handleMultiFilterChange={params.handleMultiFilterChange} />
        </div>
    )
}