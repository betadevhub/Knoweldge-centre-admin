import { useCategories } from '../../stateManagement/useCategories'
import classes from './QueryCard.module.css'
import SearchCard from './SearchCard'
import SelectCard from './SelectCard'
import TotalCountCard from './TotalCountCard'
import type { QUERY_CARD } from './types'

export default function QueryCard(params: QUERY_CARD) {
    const { categoriesResult } = useCategories()
    return (
        <div className={classes.container}>
            <TotalCountCard lastFetched={params.lastFetched} fetch={params.fetch} count={categoriesResult?.pagination.totalDocs || 0} loading={params.loading} />
            <div className={classes.rightGroup}>
                <SearchCard name='search' value={String(params.filter.search)} inputMode='search' handleFilterChange={params.handleFilterChange} placeholder='Search' />
                <SelectCard sortTypeList={params.sortTypeList} handleFilterChange={params.handleFilterChange} toggleFilterDialog={params.toggleFilterDialog} />
            </div>
        </div>
    )
}