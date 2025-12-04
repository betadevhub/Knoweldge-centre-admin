import TableHeadWrapper from '../../wrappers/TableHeadWrapper';
import QueryCard from '../QueryCard/QueryCard';
import classes from './Table.module.css';
import type { TABLE } from './types';


export default function Table(params: TABLE) {
    return (
        <div className={classes.container}>
            <QueryCard />
            <TableHeadWrapper>
                {params.tableHeadElements}
            </TableHeadWrapper>
            {params.tableBodyElements}
        </div>
    )
}