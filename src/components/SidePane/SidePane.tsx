import classes from './SidePane.module.css';
import logo from '../../assets/ticketlogo 1.svg'
import MenuCardList from './MenuCardList';
import { general, restricted } from './constant';
import { FiPlus } from 'react-icons/fi';
import MenuCard from './MenuCard';
import { IoMdSettings } from 'react-icons/io';
import { routes } from '../../constants/utils';
import useNavigation from '../../hooks/navigation';
import { formatCategories } from './helper';
import { useLocation } from 'react-router-dom';
import { useCategories } from '../../stateManagement/useCategories';
import { useEffect } from 'react';
import { FaMinus } from 'react-icons/fa';

export default function SidePane() {
    const { func } = useNavigation();
    const { pathname: path } = useLocation();
    const { showCategoryCreationDialog, firstFiveCategoriesResult, getFirstFiveCategoriesResult, loadingFirstFiveCategoriesResult, toggleCategoryCreationDialog } = useCategories();

    useEffect(() => {
        getFirstFiveCategoriesResult()
    }, [])

    if (restricted.includes(path)) return null

    return (
        <div className={classes.container}>
            <img src={logo} alt='Ticket lush logo' className={classes.logo} />
            <MenuCardList title='General' list={general} func={func} />
            <div className={classes.line1} />
            <MenuCardList title='Categories' list={formatCategories(firstFiveCategoriesResult?.categories || [])} titleIcon={
                <div onClick={toggleCategoryCreationDialog} className={classes.paneIconBackground}>
                    {!showCategoryCreationDialog ?
                        <FiPlus className={classes.paneIcon} />
                        : <FaMinus className={classes.paneIcon} />
                    }
                </div>
            } hasNextPage={firstFiveCategoriesResult?.pagination.hasNextPage}
                loading={loadingFirstFiveCategoriesResult}
                func={func}
            />

            <div className={`${classes.line1} ${classes.line2}`} />
            <MenuCard name='Settings' icon={<IoMdSettings className={classes.paneIcon} />} route={routes.settings} func={() => { }} />

        </div>
    )
}