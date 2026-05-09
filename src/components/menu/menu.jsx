import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './menu.module.css';

const OTHERS_CATEGORIES = ['Weapon', 'Item', 'Scroll', 'Location', 'Clothing', 'Artifact'];

function OthersDropdown() {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    return (
        <li
            ref={ref}
            className={`${styles.menuItem} ${styles.othersItem}`}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            <a href="/others">Others</a>
            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                className={`${styles.othersChevron} ${open ? styles.othersChevronOpen : ''}`}>
                <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {open && (
                <div className={styles.othersPanel}>
                    <a href="/others" className={styles.othersPanelAll}>All Items</a>
                    <div className={styles.othersDivider} />
                    {OTHERS_CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            className={styles.othersPanelItem}
                            onMouseDown={() => { navigate(`/others?category=${cat}`); setOpen(false); }}
                            type="button"
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            )}
        </li>
    );
}
import SiteSmallHeader from '../siteSmallHeader/siteSmallHeader';

import charactersData from '../../data/characters.json';
import jutsusData from '../../data/jutsus.json';
import clansData from '../../data/clans.json';
import itemsData from '../../data/items.json';

const ALL_ENTRIES = [
    ...charactersData.characters.map((c) => ({ name: c.name, category: 'Character', route: `/characters/${c.id}` })),
    ...jutsusData.jutsus.map((j) => ({ name: j.name, category: 'Jutsu', route: `/jutsus/${j.id}` })),
    ...clansData.clans.map((c) => ({ name: c.name, category: 'Clan', route: `/clans/${c.id}` })),
    ...itemsData.items.map((i) => ({ name: i.name, category: 'Item', route: `/others/${i.id}` })),
];

function SearchBar() {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [open, setOpen] = useState(false);
    const wrapRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handler = (e) => {
            if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const handleChange = (e) => {
        const val = e.target.value;
        setQuery(val);
        if (val.trim().length < 2) {
            setSuggestions([]);
            setOpen(false);
            return;
        }
        const lower = val.toLowerCase();
        const results = ALL_ENTRIES
            .filter((entry) => entry.name.toLowerCase().includes(lower))
            .slice(0, 5);
        setSuggestions(results);
        setOpen(results.length > 0);
    };

    const handleSelect = (entry) => {
        setQuery('');
        setSuggestions([]);
        setOpen(false);
        navigate(entry.route);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            setOpen(false);
            setQuery('');
        }
    };

    return (
        <div className={styles.searchWrap} ref={wrapRef}>
            <div className={styles.searchInputWrap}>
                <svg className={styles.searchIcon} width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                    <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <input
                    className={styles.searchInput}
                    type="text"
                    placeholder="Search characters, jutsus…"
                    value={query}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    autoComplete="off"
                    aria-label="Search"
                    aria-autocomplete="list"
                    aria-expanded={open}
                />
            </div>
            {open && (
                <ul className={styles.suggestions} role="listbox">
                    {suggestions.map((entry, i) => (
                        <li
                            key={i}
                            className={styles.suggestion}
                            role="option"
                            onMouseDown={() => handleSelect(entry)}
                        >
                            <span className={styles.suggestionName}>{entry.name}</span>
                            <span className={`${styles.categoryBadge} ${styles[`cat_${entry.category}`]}`}>
                                {entry.category}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default function Menu() {
    const menuItems = [
        { name: 'Characters', link: '/characters' },
        { name: 'Jutsus', link: '/jutsus' },
        { name: 'Clans', link: '/clans' },
    ];

    return (
        <div className={styles.fullmenu}>
            <SiteSmallHeader />
            <div className={styles.menu}>
                <a href="/"><img src="/assets/NarutoDataBase.logo.webp" alt="Naruto Database Logo" className={styles.logo} /></a>

                <div className={styles.menuItems}>
                    <ul className={styles.menuItemsWrapper}>
                        {menuItems.map((item, index) => (
                            <li key={index} className={styles.menuItem}>
                                <a href={item.link}>{item.name}</a>
                            </li>
                        ))}
                        <OthersDropdown />
                    </ul>
                    <SearchBar />
                </div>
            </div>
        </div>
    );
}
