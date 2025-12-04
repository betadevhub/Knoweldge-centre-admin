import type { CATEGORIES } from "./types"
import classes from './SidePane.module.css'
import { FcFolder } from "react-icons/fc"
import { routes } from "../../constants/utils"

export const formatCategories = (categories: CATEGORIES[]) => {
    return categories?.map((c) => {
        const route= `${routes.categories}/${c._id}`
        return { icon: <FcFolder className={classes.paneIcon} />, name: c.name, postCount: c.postCount, route }
    })
}