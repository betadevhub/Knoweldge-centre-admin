import { FcFolder } from "react-icons/fc";
import { compactFormat, numberFormat } from "../../helpers/util";
import { categories } from "../../temp/categories";
import TableBodyWrapper from "../../wrappers/TableBodyWrapper";
import CheckBox from "../Input/CheckBox";
import TableText from "../Table/TableText";
import Kebab from "../kebab/kebab";
import type { TABLE_BODY_ELEMENT } from "./types";


export default function TableBodyElements(params:TABLE_BODY_ELEMENT) {
    return (
        <div>
            {
                categories?.map((c, i) => (
                    <TableBodyWrapper background={i % 2 === 0 ? '#fff' : '#f9f9f7'}>
                        <CheckBox />
                        <FcFolder />
                        <TableText title={c.name} size={'large'} />
                        <TableText title={numberFormat.format(c.postCount)} size={'small'} />
                        <TableText title={compactFormat.format(c.views)} size={'small'} />
                        <TableText title={c.updatedAt} size={'small'} />
                        <Kebab handleKebab={params.handleKebab}  />
                        {/* <TableText title={''} size={'xSmall'} /> */}

                    </TableBodyWrapper>
                ))
            }

        </div>
    )
}