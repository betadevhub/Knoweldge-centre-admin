import { RiHomeLine } from "react-icons/ri";
import { routes } from "../../constants/utils";
import { FiActivity } from "react-icons/fi";
import { IoPersonOutline } from "react-icons/io5";
import { TbSocial } from "react-icons/tb";
import { PiSealQuestion } from "react-icons/pi";
import classes from './SidePane.module.css'
import { FcFolder } from "react-icons/fc";

export const general = [
    { icon: <RiHomeLine className={classes.paneIcon} />, name: 'Home', route: routes.home },
    { icon: <FiActivity className={classes.paneIcon} />, name: 'Activity', route: routes.activity },
    { icon: <IoPersonOutline className={classes.paneIcon} />, name: 'Collaborators', route: routes.collaborators },
    { icon: <PiSealQuestion className={classes.paneIcon} />, name: 'FAQ', route: routes.faq },
    { icon: <TbSocial className={classes.paneIcon} />, name: 'Socials', route: routes.socials },
]


export const categories = [
    { icon: <FcFolder className={classes.paneIcon} />, name: 'Analytics', route: routes.activity },
    { icon: <FcFolder className={classes.paneIcon} />, name: 'Engagement', route: routes.activity },
    { icon: <FcFolder className={classes.paneIcon} />, name: 'Event management', route: routes.collaborators },
    { icon: <FcFolder className={classes.paneIcon} />, name: 'Financial', route: routes.faq },
    { icon: <FcFolder className={classes.paneIcon} />, name: 'Marketing', route: routes.socials },
]



export const restricted = [
    routes.signin, routes.register
]