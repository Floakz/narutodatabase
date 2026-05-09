import styles from './jutsusExpanded.module.css';
import Menu from '../../components/menu/menu';
import Footer from '../../components/footer/footer';
import { useParams, Link } from "react-router-dom";
import jutsusData from '../../data/jutsus.json';
import charactersData from '../../data/characters.json';
import ImageCarrossel from '../../components/imageCarrossel/imageCarrossel';

const RANK_COLORS = {
    S: '#f0c040',
    A: '#f0740e',
    B: '#4e9af0',
    C: '#5fb85a',
    D: '#aaaaaa',
};

const TYPE_COLORS = {
    Ninjutsu: '#f0740e',
    Genjutsu: '#b05af0',
    Taijutsu: '#f04e4e',
    Fuinjutsu: '#4e9af0',
    Dojutsu: '#4ef0d8',
};

export default function JutsusExpanded() {
    const { id } = useParams();
    const jutsu = jutsusData.jutsus.find(j => j.id === Number(id));

    const RELATED_COUNT = 5;
    const sameType = jutsusData.jutsus
        .filter(j => j.id !== jutsu.id && j.type === jutsu.type)
        .sort(() => Math.random() - 0.5)
        .slice(0, RELATED_COUNT);

    const usedIds = new Set([jutsu.id, ...sameType.map(j => j.id)]);
    const fillers = jutsusData.jutsus
        .filter(j => !usedIds.has(j.id))
        .sort(() => Math.random() - 0.5)
        .slice(0, RELATED_COUNT - sameType.length);

    const relatedJutsus = [...sameType, ...fillers];

    const rankColor = RANK_COLORS[jutsu.rank] || '#aaaaaa';
    const typeColor = TYPE_COLORS[jutsu.type] || '#f0740e';

    return (
        <>
            <Menu />
            <div className={styles.expandedBG}>
                <div className="container">

                    <div className="topPageSpace"></div>

                    <span className={styles.sectionCookieCrumble}>JUTSU</span>

                    <div className={styles.infoContainer}>
                        <h1 className={styles.titleExpanded}>{jutsu.name}</h1>

                        <div className={styles.introInfoWrapper}>
                            <img className={styles.jutsuMainImage} src={jutsu.images.profile} alt={jutsu.name} />

                            <div className={styles.introInfo}>
                                <span className={styles.quickFacts}>📌 Quick Facts</span>
                                <div className={styles.quickFactsContainer}>
                                    <p><b>Type:</b> {jutsu.type}</p>
                                    <p><b>Rank:</b> {jutsu.rank}-Rank</p>
                                    <p><b>Clan:</b> {jutsu.clan ? jutsu.clan : "None"}</p>
                                    <p><b>Kekkei Genkai:</b> {jutsu.kekkeiGenkai ? "Yes" : "No"}</p>
                                    <p><b>🌀 Brief Description:</b><br /><br /><span className={styles.briefDescriptionText}>{jutsu.description}</span></p>
                                </div>
                            </div>
                        </div>

                        <div className={styles.adSpot}>AD SPOT</div>




                        {jutsu.images.others.length > 0 && (
                            <div className={styles.carrosselWraper}>
                                <ImageCarrossel images={jutsu.images.others} />
                            </div>
                        )}

                        {jutsu.users.length > 0 && (
                            <div className={styles.usersSection}>
                                <span className={styles.relatedTitle}>⚡ Known Users</span>
                                <div className={styles.usersGrid}>
                                    {jutsu.users.map(user => {
                                        const character = charactersData.characters.find(c => c.id === user.id);
                                        return (
                                            <Link to={`/characters/${user.id}`} key={user.id} className={styles.userCard}>
                                                {character && (
                                                    <img src={character.images.profile} alt={user.name} className={styles.userCardImage} />
                                                )}
                                                <span className={styles.userCardName}>{user.name}</span>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {relatedJutsus.length > 0 && (
                            <div className={styles.relatedSection}>
                                <span className={styles.relatedTitle}>✨ Related Jutsus</span>
                                <div className={styles.relatedGrid}>
                                    {relatedJutsus.map(j => (
                                        <Link to={`/jutsus/${j.id}`} key={j.id} className={styles.relatedCard}>
                                            <img src={j.images.profile} alt={j.name} className={styles.relatedCardImage} />
                                            <span className={styles.relatedCardName}>{j.name}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
