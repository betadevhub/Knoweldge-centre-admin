import { FcFile } from "react-icons/fc";
import { compactFormat, dateFormat, hoursFormat } from "../../helpers/util";
import TableBodyWrapper from "../../wrappers/TableBodyWrapper";
import CheckBox from "../Input/CheckBox";
import TableText from "../Table/TableText";
import Kebab from "../kebab/kebab";
import { useNavigate, useParams } from "react-router-dom";
import { routes } from "../../constants/utils";
import type { TABLE_BODY_ELEMENT } from "../Home/types";
import { usePosts } from "../../stateManagement/usePosts";

export default function TableBodyElements(params: TABLE_BODY_ELEMENT) {
    const { postsResult } = usePosts();
    const navigate = useNavigate();
    const { id } = useParams();



    return (
        <div>
            {
                postsResult?.posts?.map((p, i) => (
                    <TableBodyWrapper key={i} background={i % 2 === 0 ? '#fff' : '#f9f9f7'}>
                        <CheckBox />
                        <FcFile />
                        <TableText func={() => { navigate(`${routes.space}/${p.category?.name}/${id}?postId=${p._id}`) }} title={p.name} size={'large'} />
                        <TableText title={hoursFormat(p.videoDuration)} size={'small'} />
                        <TableText title={hoursFormat(p.readDuration)} size={'small'} />
                        <TableText title={compactFormat.format(p.views)} size={'small'} />
                        <TableText title={dateFormat(p.updatedAt)} size={'small'} />
                        <Kebab handleKebab={params.handleKebab} />
                        {/* <TableText title={''} size={'xSmall'} /> */}

                    </TableBodyWrapper>
                ))
            }

        </div>
    )
}