import styles from './othersExpanded.module.css';
import Menu from '../../components/menu/menu';
import Footer from '../../components/footer/footer';
import { useParams, Link } from "react-router-dom";
import itemsData from '../../data/items.json';
import charactersData from '../../data/characters.json';
import clansData from '../../data/clans.json';
import ImageCarrossel from '../../components/imageCarrossel/imageCarrossel';

export default function OthersExpanded() {
    const { id } = useParams();
    const item = itemsData.items.find(i => i.id === Number(id));

    const RELATED_COUNT = 5;
    const sameCategory = itemsData.items
        .filter(i => i.id !== item.id && i.category === item.category)
        .sort(() => Math.random() - 0.5)
        .slice(0, RELATED_COUNT);

    const usedIds = new Set([item.id, ...sameCategory.map(i => i.id)]);
    const fillers = itemsData.items
        .filter(i => !usedIds.has(i.id))
        .sort(() => Math.random() - 0.5)
        .slice(0, RELATED_COUNT - sameCategory.length);

    const relatedItems = [...sameCategory, ...fillers];

    return (
        <>
            <Menu />
            <div className={styles.expandedBG}>
                <div className="container">

                    <div className="topPageSpace"></div>

                    <span className={styles.sectionCookieCrumble}>ITEM</span>

                    <div className={styles.infoContainer}>
                        <h1 className={styles.titleExpanded}>{item.name}</h1>

                        <div className={styles.introInfoWrapper}>
                            <img className={styles.itemMainImage} src={item.images.profile} alt={item.name} />

                            <div className={styles.introInfo}>
                                <span className={styles.quickFacts}>📌 Quick Facts</span>
                                <div className={styles.quickFactsContainer}>
                                    <p><b>Category:</b> {item.category}</p>
                                    <p><b>🗡️ Description:</b><br /><br /><span className={styles.briefDescriptionText}>{item.description}</span></p>
                                </div>
                            </div>
                        </div>

                        <div className={styles.adSpot}>AD SPOT</div>

                        {item.associatedCharacters.length > 0 && (
                            <div className={styles.associatedSection}>
                                <span className={styles.relatedTitle}>👤 Associated Characters</span>
                                <div className={styles.associatedGrid}>
                                    {item.associatedCharacters.map(member => {
                                        const character = charactersData.characters.find(c => c.id === member.id);
                                        return (
                                            <Link to={`/characters/${member.id}`} key={member.id} className={styles.associatedCard}>
                                                {character && (
                                                    <img src={character.images.profile} alt={member.name} className={styles.associatedCardImage} />
                                                )}
                                                <span className={styles.associatedCardName}>{member.name}</span>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {item.associatedClans.length > 0 && (
                            <div className={styles.associatedSection}>
                                <span className={styles.relatedTitle}>🏯 Associated Clans</span>
                                <div className={styles.associatedGrid}>
                                    {item.associatedClans.map(clan => {
                                        const clanData = clansData.clans.find(c => c.id === clan.id);
                                        return (
                                            <Link to={`/clans/${clan.id}`} key={clan.id} className={styles.associatedCard}>
                                                {clanData && (
                                                    <img src={clanData.images.profile} alt={clan.name} className={styles.associatedCardImage} />
                                                )}
                                                <span className={styles.associatedCardName}>{clan.name}</span>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {item.images.others.length > 0 && (
                            <div className={styles.carrosselWrapper}>
                                <ImageCarrossel images={item.images.others} />
                            </div>
                        )}

                        {relatedItems.length > 0 && (
                            <div className={styles.relatedSection}>
                                <span className={styles.relatedTitle}>✨ Related Items</span>
                                <div className={styles.relatedGrid}>
                                    {relatedItems.map(i => (
                                        <Link to={`/others/${i.id}`} key={i.id} className={styles.relatedCard}>
                                            <img src={i.images.profile} alt={i.name} className={styles.relatedCardImage} />
                                            <span className={styles.relatedCardName}>{i.name}</span>
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
