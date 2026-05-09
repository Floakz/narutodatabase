import styles from './charactersExpanded.module.css';
import Menu from '../../components/menu/menu';
import Footer from '../../components/footer/footer';
import { useParams, Link } from "react-router-dom";
import charactersData from '../../data/characters.json';
import ImageCarrossel from '../../components/imageCarrossel/imageCarrossel';

export default function CharactersExpanded({ }) {

    const { id } = useParams();
    const character = charactersData.characters.find(c => c.id === Number(id));

    const RELATED_COUNT = 5;
    const sameVillage = charactersData.characters
        .filter(c => c.id !== character.id && c.village === character.village)
        .sort(() => Math.random() - 0.5)
        .slice(0, RELATED_COUNT);

    const usedIds = new Set([character.id, ...sameVillage.map(c => c.id)]);
    const fillers = charactersData.characters
        .filter(c => !usedIds.has(c.id))
        .sort(() => Math.random() - 0.5)
        .slice(0, RELATED_COUNT - sameVillage.length);

    const relatedCharacters = [...sameVillage, ...fillers];

    return (
        <>
            <Menu />
            <div className={styles.expandedBG}>
                <div className="container">

                    <div className="topPageSpace"></div>

                    <span className={styles.sectionCookieCrumble}>CHARACTER</span>

                    <div className={styles.infoContainer}>
                        <h1 className={styles.titleExpanded}>{character.name}</h1>


                        <div className={styles.introInfoWrapper}>
                            <img className={styles.characterMainImage} src={character.images.profile} alt={character.name} />

                            <div className={styles.introInfo}>
                                <span className={styles.quickFacts}>📌 Quick Facts</span>
                                <div className={styles.quickFactsContainer}>
                                    <p><b>Clan:</b> {character.clan ? character.clan : "Unknown"}</p>
                                    <p><b>Village:</b> {character.village ? character.village : "Unknown"}</p>
                                    <p><b>Power Level:</b> {character.powerLevel ? character.powerLevel : "Unknown"}</p>
                                    <p><b>Rank:</b> {character.stats.rank ? character.stats.rank : "Unknown"}</p>
                                    <p><b>🌪️ Brief Description:</b><br /><br /><span className={styles.briefDescriptionText}> {character.description ? character.description : "Unknown"}</span></p>

                                </div>
                            </div>
                        </div>

                        <div className={styles.adSpot}> </div>


                        <div className={styles.statsSectionWrapper}>
                            <div className={styles.statsContainer}>
                                <div><div className={styles.statTitle}><b>Power:</b>{character.stats.power}</div><div className={styles.statBarWrapper}><div className={styles.statInnerBarWrapper} style={{ width: `${parseInt(character.stats.power)}%` }}></div></div></div>
                                <div><div className={styles.statTitle}><b>Chakra:</b>{character.stats.chakra}</div><div className={styles.statBarWrapper}><div className={styles.statInnerBarWrapper} style={{ width: `${parseInt(character.stats.chakra)}%` }}></div></div></div>
                                <div><div className={styles.statTitle}><b>Intelligence:</b>{character.stats.intelligence}</div><div className={styles.statBarWrapper}><div className={styles.statInnerBarWrapper} style={{ width: `${parseInt(character.stats.intelligence)}%` }}></div></div></div>
                                <div className={styles.rankTag}><b>Power Level: {character.powerLevel} / 100</b></div>
                            </div>
                        </div>



                        <div className={styles.extraInfoWrapper}>

                            <div>
                                <span className={styles.quickFacts}>📌 About</span>
                                {character.extendedDescription || character.description}
                            </div>

                            <div>AD SPOT</div>

                        </div>

                        {character.images.others.length > 0 &&
                            <div className={styles.carroselWrapper}>
                                <ImageCarrossel images={character.images.others} />
                            </div>
                        }

                        {relatedCharacters.length > 0 && (
                            <div className={styles.relatedSection}>
                                <span className={styles.relatedTitle}>✨ Other characters</span>
                                <div className={styles.relatedGrid}>
                                    {relatedCharacters.map(c => (
                                        <Link to={`/characters/${c.id}`} key={c.id} className={styles.relatedCard}>
                                            <img src={c.images.profile} alt={c.name} className={styles.relatedCardImage} />
                                            <span className={styles.relatedCardName}>{c.name}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
                </div>

            </div >
            <Footer />
        </>
    );
}





