import styles from './charactersExpanded.module.css';
import Menu from '../../components/menu/menu';
import Footer from '../../components/footer/footer';
import { useParams } from "react-router-dom";
import charactersData from '../../data/characters.json';

export default function CharactersExpanded({ }) {

    const { id } = useParams();
    const character = charactersData.characters.find(c => c.id === Number(id));
    console.log(charactersData);

    return (
        <>
            <Menu />
            <div className="topPageSpace">               </div>
            <div className={styles.charactersExpanded}>
                <p>{character.name}</p>
                <p>{character.village}</p>
                <p>{character.clan}</p>
                <p>{character.powerLevel}</p>
                <p>{character.description}</p>
                <p>{character.chakraType}</p>
                <img src={character.images.profile} alt={character.name} />            </div>
            <Footer />
        </>
    );
}