import styles from './clansExpanded.module.css';
import Menu from '../../components/menu/menu';
import Footer from '../../components/footer/footer';
import { useParams, Link } from "react-router-dom";
import clansData from '../../data/clans.json';
import charactersData from '../../data/characters.json';
import jutsusData from '../../data/jutsus.json';
import ImageCarrossel from '../../components/imageCarrossel/imageCarrossel';

export default function ClansExpanded() {
    const { id } = useParams();
    const clan = clansData.clans.find(c => c.id === Number(id));

    const RELATED_COUNT = 5;
    const sameVillage = clansData.clans
        .filter(c => c.id !== clan.id && c.village === clan.village)
        .sort(() => Math.random() - 0.5)
        .slice(0, RELATED_COUNT);

    const usedIds = new Set([clan.id, ...sameVillage.map(c => c.id)]);
    const fillers = clansData.clans
        .filter(c => !usedIds.has(c.id))
        .sort(() => Math.random() - 0.5)
        .slice(0, RELATED_COUNT - sameVillage.length);

    const relatedClans = [...sameVillage, ...fillers];

    return (
        <>
            <Menu />
            <div className={styles.expandedBG}>
                <div className="container">

                    <div className="topPageSpace"></div>

                    <span className={styles.sectionCookieCrumble}>CLAN</span>

                    <div className={styles.infoContainer}>
                        <h1 className={styles.titleExpanded}>{clan.name}</h1>

                        <div className={styles.introInfoWrapper}>
                            <img className={styles.clanMainImage} src={clan.images.profile} alt={clan.name} />

                            <div className={styles.introInfo}>
                                <span className={styles.quickFacts}>📌 Quick Facts</span>
                                <div className={styles.quickFactsContainer}>
                                    <p><b>Village:</b> {clan.village || "Unknown"}</p>
                                    <p><b>Kekkei Genkai:</b> {clan.kekkeiGenkai || "None"}</p>
                                    <p><b>🌿 Brief Description:</b><br /><br /><span className={styles.briefDescriptionText}>{clan.description}</span></p>
                                </div>
                            </div>
                        </div>

                        <div className={styles.adSpot}>AD SPOT</div>

                        {clan.notableMembers.length > 0 && (
                            <div className={styles.membersSection}>
                                <span className={styles.relatedTitle}>👥 Notable Members</span>
                                <div className={styles.membersGrid}>
                                    {clan.notableMembers.map(member => {
                                        const character = charactersData.characters.find(c => c.id === member.id);
                                        return (
                                            <Link to={`/characters/${member.id}`} key={member.id} className={styles.memberCard}>
                                                {character && (
                                                    <img src={character.images.profile} alt={member.name} className={styles.memberCardImage} />
                                                )}
                                                <span className={styles.memberCardName}>{member.name}</span>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {clan.signatureJutsu.length > 0 && (
                            <div className={styles.jutsusSection}>
                                <span className={styles.relatedTitle}>⚡ Signature Jutsus</span>
                                <div className={styles.jutsusGrid}>
                                    {clan.signatureJutsu.map(jutsu => {
                                        const jutsuData = jutsusData.jutsus.find(j => j.id === jutsu.id);
                                        return (
                                            <Link to={`/jutsus/${jutsu.id}`} key={jutsu.id} className={styles.jutsuCard}>
                                                {jutsuData && (
                                                    <img src={jutsuData.images.profile} alt={jutsu.name} className={styles.jutsuCardImage} />
                                                )}
                                                <span className={styles.jutsuCardName}>{jutsu.name}</span>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {clan.images.others.length > 0 && (
                            <div className={styles.carrosselWrapper}>
                                <ImageCarrossel images={clan.images.others} />
                            </div>
                        )}

                        {relatedClans.length > 0 && (
                            <div className={styles.relatedSection}>
                                <span className={styles.relatedTitle}>✨ Other Clans</span>
                                <div className={styles.relatedGrid}>
                                    {relatedClans.map(c => (
                                        <Link to={`/clans/${c.id}`} key={c.id} className={styles.relatedCard}>
                                            <img src={c.images.profile} alt={c.name} className={styles.relatedCardImage} />
                                            <span className={styles.relatedCardName}>{c.name}</span>
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
