import CardList from "../../components/Home/cardList";
import { cards } from "../../components/Home/constant";
import Intro from "../../components/Home/Intro";
import TableHeadElements from "../../components/Home/TableHeadElements";
import Table from "../../components/Table/Table";
import useNavigation from "../../hooks/navigation";
import classes from './home.module.css'


export default function Home() {
    const { func } = useNavigation();

    return (
        <div className={classes.container}>
            <Intro title='Welcome, David.' description='Your space is ready. Start by uploading a guide.' />
            <CardList list={cards} func={func} />
            <Table tableHeadElements={<TableHeadElements />} />
        </div>
    )
}