import Card from './card';
import classes from './HomeComponent.module.css';
import type { CARD_LIST } from './types';

export default function CardList(params: CARD_LIST) {

  return (
    <div className={classes.cardList}>
      {
        params.list?.map((p, i) => (
          <Card {...p} func={params.func} key={i} />
        ))
      }

    </div>
  )
}