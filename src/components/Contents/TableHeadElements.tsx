import type { TABLE_HEAD_ELEMENT } from "../Home/types";
import CheckBox from "../Input/CheckBox";
import TableName from "../Table/TableName";
import TableText from "../Table/TableText";


export default function TableHeadElements(params: TABLE_HEAD_ELEMENT) {
    return (
        <>
            <CheckBox color="#fff" />
            <TableText title={
                <TableName title="Name" sort={params.sort} />
            } size={'large'} />
            <TableText title={'Video Duration'} size={'small'} />
            <TableText title={'Read Duration'} size={'small'} />
            <TableText title={'Views'} size={'small'} />
            <TableText title={'Updated'} size={'small'} />
            <TableText title={''} size={'xSmall'} />
        </>
    )
}