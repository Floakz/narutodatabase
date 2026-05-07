import styles from './menu.module.css';
import logo from '../../assets/NarutoDataBase.logo.webp';
import SiteSmallHeader from '../siteSmallHeader/siteSmallHeader';

export default function Menu() {

    const menuItems = [
        {
            name: 'Characters',
            link: '/characters',
        },
        {
            name: 'Justsus',
            link: '/jutsus',
        },
        {
            name: 'Clans',
            link: '/clans',
        },
        {
            name: 'Others',
            link: '/others',
        },
    ];


    return (
        <div className={styles.fullmenu}>
            <SiteSmallHeader />
            <div className={styles.menu}>
                <a href="/"><img src={logo} alt="Naruto Database Logo" className={styles.logo} /></a>
                <ul className={styles.menuItemsWrapper}>
                    {menuItems.map((item, index) => (
                        <li key={index} className={styles.menuItem}>
                            <a href={item.link}>{item.name}</a>
                            {item.name === 'Others' && <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
