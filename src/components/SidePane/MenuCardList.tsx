import Loader from '../loader/loader';
import MenuCard from './MenuCard';
import classes from './SidePane.module.css';
import type { MENU_CARD_LIST } from './types';

export default function MenuCardList(params: MENU_CARD_LIST) {


  return (
    <div className={classes.menuCardList}>
      <div className={classes.listNameContainer}>
        <p className={classes.listName}>{params.title}</p>
        {params.titleIcon}
      </div>


      {
        params.loading ?
          <div className={classes.loaderContainer}>
            <Loader background={'#b5c7cb'} />
          </div>
          :
          <>
            {!params.list.length && <p className={classes.noCategory}>No category found</p>}
            {
              params.list?.map((p, i) => (
                <MenuCard func={params.func} {...p} key={i} />
              ))
            }
            {
              params.hasNextPage &&
              <p className={classes.seeAll}>See all</p>
            }

          </>
      }



    </div>
  )
}