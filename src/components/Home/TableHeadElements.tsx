import CheckBox from "../Input/CheckBox";
import TableText from "../Table/TableText";


export default function TableHeadElements() {
    return (
        <>
            <CheckBox color="#fff" />
            <TableText title={'Name'} size={'large'} />
            <TableText title={'Posts'} size={'small'} />
            <TableText title={'Views'} size={'small'} />
            <TableText title={'Updated'} size={'small'} />
            <TableText title={''} size={'xSmall'} />
        </>
    )
}