import { FcFile, FcFolder } from 'react-icons/fc';
import classes from './SpaceHeader.module.css';
import SpaceHeaderText from './SpaceHeaderText';


export default function SpaceHeader() {
    return (
        <div className={classes.container}>
            <SpaceHeaderText
                icon={<FcFolder className={classes.icon} />}
                text='Analytics'
            />
            <p>/</p>
            <SpaceHeaderText
                icon={<FcFile className={classes.icon} />}
                text='What your analytics actually mean'
                editable={true}
            />

            <div className={classes.right}>
                <p className={classes.lastPublished}>Last Published: 45m ago</p>
                <button className={classes.save}>Save to Draft</button>
                <button className={classes.publishButton}>Publish</button>
            </div>
        </div>
    )
}