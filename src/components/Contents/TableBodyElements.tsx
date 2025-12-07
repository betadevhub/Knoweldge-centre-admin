import { FcFile } from "react-icons/fc";
import { compactFormat, dateFormat, numberFormat } from "../../helpers/util";
import TableBodyWrapper from "../../wrappers/TableBodyWrapper";
import CheckBox from "../Input/CheckBox";
import TableText from "../Table/TableText";
import Kebab from "../kebab/kebab";
import { useCategories } from "../../stateManagement/useCategories";
import { useNavigate } from "react-router-dom";
import { routes } from "../../constants/utils";
import type { TABLE_BODY_ELEMENT } from "../Home/types";

export default function TableBodyElements(params: TABLE_BODY_ELEMENT) {
    const { categoriesResult } = useCategories();
    const navigate = useNavigate();



    return (
        <div>
            {
                categoriesResult?.categories?.map((c, i) => (
                    <TableBodyWrapper key={i} background={i % 2 === 0 ? '#fff' : '#f9f9f7'}>
                        <CheckBox />
                        <FcFile />
                        <TableText func={()=>navigate(`${routes.categories}/${c._id}`)} title={c.name} size={'large'} />
                        <TableText title={numberFormat.format(c.postCount)} size={'small'} />
                        <TableText title={compactFormat.format(c.views)} size={'small'} />
                        <TableText title={dateFormat(c.updatedAt)} size={'small'} />
                        <Kebab handleKebab={params.handleKebab} />
                        {/* <TableText title={''} size={'xSmall'} /> */}

                    </TableBodyWrapper>
                ))
            }

        </div>
    )
}