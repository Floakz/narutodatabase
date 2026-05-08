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
            <div className="container">
                <div className="topPageSpace"></div>

                <span className={styles.sectionCookieCrumble}>NARUTO CHARACTER</span>

                <div className={styles.infoContainer}>
                    <h1 className={styles.titleExpanded}>{character.name}</h1>


                    <div className={styles.introInfoWrapper}>
                        <img className={styles.characterMainImage} src={character.images.profile} alt={character.name} />

                        <div className={styles.introInfo}>
                            <span className={styles.quickFacts}>📌 Quick Facts</span>
                            <div className={styles.quickFactsContainer}>
                                <p><b>Clan:</b> {character.clan ? character.clan : "Unkown"}</p>
                                <p><b>Village:</b> {character.village ? character.village : "Unkown"}</p>
                                <p><b>Power Level:</b> {character.powerLevel ? character.powerLevel : "Unkown"}</p>
                                <p><b>Rank:</b> {character.stats.rank ? character.stats.rank : "Unkown"}</p>
                                <p><b>🌪️ Brief Description:</b><br /><br /> {character.description ? character.description : "Unkown"}</p>

                            </div>
                        </div>
                    </div>


                    <div className={styles.statsSectionWrapper}>
                        <span className={styles.quickFacts}>📊 Stats</span>
                        <div className={styles.statsContainer}>
                            <div><b>Strength:</b><div className={styles.statBarWrapper}><div className={styles.statInnerBarWrapper} style={{ width: `${parseInt(character.stats.attack)}%` }}></div></div></div>
                            <div><b>Defense:</b><div className={styles.statBarWrapper}><div className={styles.statInnerBarWrapper} style={{ width: `${parseInt(character.stats.defense)}%` }}></div></div></div>
                            <div><b>Utility:</b><div className={styles.statBarWrapper}><div className={styles.statInnerBarWrapper} style={{ width: `${parseInt(character.stats.utility)}%` }}></div></div></div>
                            <div className={styles.rankTag}><b>Power Level: {character.powerLevel} / 100</b></div>
                        </div>
                    </div>


                    <div className={styles.adSpot}></div>

                </div>


            </div >
            <Footer />
        </>
    );
}





{/* <div className={styles.charactersExpanded}>
    <p>{character.name}</p>
    <p>{character.village}</p>
    <p>{character.clan}</p>
    <p>{character.powerLevel}</p>
    <p>{character.description}</p>
    <p>{character.chakraType}</p>
    <img src={character.images.profile} alt={character.name} />            </div> */}