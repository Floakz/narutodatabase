import { useState } from "react";
import Menu from "../../components/menu/menu";
import PageHeader from "../../components/pageHeader/pageHeader";
import charactersData from '../../data/characters'
import jutsuData from '../../data/jutsus'
import itemsData from '../../data/items'
import clanData from '../../data/clans'
import CharacterCard from "../../components/characterCard/characterCard";
import ItemsCard from "../../components/itemCard/itemCard";
import JutsusCard from "../../components/jutsusCard/jutsusCard";
import ClanCard from "../../components/clanCard/clanCard";
import styles from './homepage.module.css'
import Footer from "../../components/footer/footer";
import SectionHeader from "../../components/sectionHeader/sectionHeader";
import { Link } from "react-router-dom";

const PAGE_SIZE_1 = 10;
const PAGE_SIZE_2 = 6;
const PAGE_SIZE_3 = 4;

export default function Homepage() {

    const clanCoverHomepage = [
        'assets/homeCover/uchia-clan-home-cover.webp',
        'assets/homeCover/senju-clan-home-cover.webp',
        'assets/homeCover/uzumaki-clan-home-cover.webp',
        'assets/homeCover/hyuga-clan-home-cover.webp',
    ]

    const characters = charactersData.characters
    const justsus = jutsuData.jutsus
    const clans = clanData.clans
    const items = itemsData.items

    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE_1);

    const visibleCharacters = characters.slice(0, visibleCount);
    const visibleJutsus = justsus.slice(0, PAGE_SIZE_2);
    const visibleClans = clans.slice(0, PAGE_SIZE_3);
    const visibleItems = items.slice(0, PAGE_SIZE_2);

    return (
        <>

            <div className="container">
                <Menu />

                <PageHeader title={`ALL THINGS NARUTO`} subtitle={true} />

                <SectionHeader title="Most Popular Characters" link="/characters" cta="View All" />
                <div className={styles['characters-grid']}>
                    {visibleCharacters.map((character) => (
                        <Link to={`/characters/${character.id}`} style={{ textDecoration: 'none' }}>
                            <CharacterCard
                                key={character.id}
                                name={character.name}
                                image={character.images.profile}
                                village={character.village}
                                powerLevel={character.powerLevel}
                            />
                        </Link>))}
                </div>


                <SectionHeader title="Most known Jutsus" link="/jutsus" cta="View All" />
                <div className={styles['jutsus-grid']}>
                    {visibleJutsus.map((jutsu) => (
                        <Link to={`/jutsus/${jutsu.id}`} style={{ textDecoration: 'none' }}>
                            <JutsusCard
                                key={jutsu.id}
                                name={jutsu.name}
                                image={jutsu.images.profile}
                                type={jutsu.type}
                                rank={jutsu.rank}
                            />
                        </Link>))}
                </div>


                <div className={styles.splitGrid}>

                    <div>
                        <SectionHeader title="World Clans" link="/clans" cta="View All" />
                        <div className={styles['clans-grid']}>
                            {visibleClans.map((clan) => (
                                <Link to={`/clans/${clan.id}`} key={clan.id} style={{ textDecoration: 'none' }}>
                                    <ClanCard
                                        name={clan.name}
                                        image={clanCoverHomepage[clan.id - 1]}
                                        village={clan.village}
                                    />
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className={styles.addPlacement}>

                    </div>




                </div>

                <SectionHeader title="Other Interesting Things" link="/others" cta="View All" />
                <div className={styles['items-grid']}>
                    {visibleItems.map((item) => (
                        <Link to={`/others/${item.id}`} key={item.id} style={{ textDecoration: 'none' }}>
                            <ItemsCard
                                name={item.name}
                                image={item.images.profile}
                                category={item.category}
                            />
                        </Link>
                    ))}
                </div>



            </div>
            <Footer />
        </>
    )
}