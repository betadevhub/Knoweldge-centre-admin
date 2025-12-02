import { FiActivity } from "react-icons/fi";
import { routes } from "../../constants/utils";
import classes from './HomeComponent.module.css'
import { IoPersonOutline } from "react-icons/io5";
import { PiSealQuestion } from "react-icons/pi";
import { MdOutlineFileUpload } from "react-icons/md";


export const cards = [
    { icon: <MdOutlineFileUpload className={classes.cardIcon} />, name: 'Upload guide', route: routes.upload, description: 'Upload content (videos, articles) for users.', color: '#009386' },
    { icon: <FiActivity className={classes.cardIcon} />, name: 'Review activities', route: routes.activity, description: 'Monitor user interactions, engagement, and contributions.', color: '#930053' },
    { icon: <IoPersonOutline className={classes.cardIcon} />, name: 'Manage collaborators', route: routes.collaborators, description: 'Add, remove, and oversee team members who maintain content.', color: '#936000' },
    { icon: <PiSealQuestion className={classes.cardIcon} />, name: 'Manage FAQ', route: routes.faq, description: 'Update responses, add new entries, in the FAQ section.', color: '#006793' },
]