import styles from './jutsusExpanded.module.css';
import Menu from '../../components/menu/menu';
import Footer from '../../components/footer/footer';
import { useParams } from "react-router-dom";
import jutsusData from '../../data/jutsus.json';

export default function jutsusExpanded({ }) {

    const { id } = useParams();
    const jutsu = jutsusData.jutsus.find(j => j.id === Number(id));


    return (
        <>
            <Menu />
            <div className="topPageSpace">               </div>
            <div className={styles.jutsusExpanded}>
                <p>{jutsu.name}</p>
                <p>{jutsu.type}</p>
                <p>{jutsu.rank}</p>
                <p>{jutsu.chakraType[0]}</p>
                <p>{jutsu.clan && jutsu.clan}</p>
                <p>{jutsu.description}</p>
                <img src={jutsu.images.profile} alt={jutsu.name} />
            </div>
            <Footer />
        </>
    );
}