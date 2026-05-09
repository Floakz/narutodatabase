import { useState, useEffect, useRef } from "react";
import Menu from "../../components/menu/menu";
import itemsData from '../../data/items.json';
import ItemCard from "../../components/itemCard/itemCard";
import styles from './others.module.css';
import Footer from "../../components/footer/footer";
import AdCard from "../../components/ads/adCard/adCard";
import { Link, useSearchParams } from "react-router-dom";

const PAGE_SIZE = 25;
const AD_EVERY = 8;

const CATEGORIES = [
    { value: "Weapon", label: "Weapon" },
    { value: "Item", label: "Item" },
    { value: "Scroll", label: "Scroll" },
    { value: "Building", label: "Building" },
    { value: "Clothing", label: "Clothing" },
    { value: "Artifact", label: "Artifact" },
];

function Dropdown({ label, options, value, onChange, allLabel }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const selected = options.find((o) => o.value === value);

    return (
        <div className={styles.dropdownField}>
            <span className={styles.dropdownLabel}>{label}</span>
            <div className={styles.dropdownWrap} ref={ref}>
                <button
                    className={`${styles.trigger} ${open ? styles.triggerActive : ""} ${value ? styles.triggerHasValue : ""}`}
                    onClick={() => setOpen((v) => !v)}
                    aria-haspopup="listbox"
                    aria-expanded={open}
                    type="button"
                >
                    <span className={styles.triggerInner}>
                        {value && <span className={styles.dot} aria-hidden="true" />}
                        <span>{selected ? selected.label : allLabel}</span>
                    </span>
                    <svg
                        className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`}
                        width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"
                    >
                        <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                <div className={`${styles.panel} ${open ? styles.panelOpen : ""}`} role="listbox">
                    <div
                        className={`${styles.opt} ${!value ? styles.optSelected : ""}`}
                        role="option"
                        aria-selected={!value}
                        onClick={() => { onChange(""); setOpen(false); }}
                    >
                        <span className={styles.optCheck}>✓</span>
                        {allLabel}
                    </div>
                    {options.map((opt) => (
                        <div
                            key={opt.value}
                            className={`${styles.opt} ${value === opt.value ? styles.optSelected : ""}`}
                            role="option"
                            aria-selected={value === opt.value}
                            onClick={() => { onChange(opt.value); setOpen(false); }}
                        >
                            <span className={styles.optCheck}>✓</span>
                            {opt.label}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function Others() {
    const items = itemsData.items;
    const [searchParams] = useSearchParams();

    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
    const [filter, setFilter] = useState({ category: searchParams.get('category') || '' });

    useEffect(() => {
        setFilter({ category: searchParams.get('category') || '' });
        setVisibleCount(PAGE_SIZE);
    }, [searchParams]);

    const filteredItems = items.filter((i) => {
        if (filter.category && i.category !== filter.category) return false;
        return true;
    });

    const visibleItems = filteredItems.slice(0, visibleCount);
    const hasFilters = !!filter.category;

    const reset = () => { setFilter({ category: "" }); setVisibleCount(PAGE_SIZE); };
    const categoryName = CATEGORIES.find((c) => c.value === filter.category)?.label;

    return (
        <>
            <div className="container">
                <Menu />

                <div className="topPageSpace"></div>

                <div className={styles.adSpace}>AD SPACE</div>

                <div className={styles.filterSection}>
                    <div className={styles.filterRow}>
                        <Dropdown
                            label="Category"
                            options={CATEGORIES}
                            value={filter.category}
                            onChange={(v) => { setFilter({ category: v }); setVisibleCount(PAGE_SIZE); }}
                            allLabel="All categories"
                        />
                        {hasFilters && (
                            <button className={styles.resetBtn} onClick={reset} type="button">
                                Reset
                            </button>
                        )}
                    </div>

                    {hasFilters && (
                        <div className={styles.pills} aria-live="polite">
                            {categoryName && (
                                <span className={styles.pill}>
                                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                                        <path d="M2 2h3.5v3.5H2zm4.5 0H10v3.5H6.5zm-4.5 4.5H5.5V10H2zm4.5 0H10V10H6.5z" fill="currentColor" />
                                    </svg>
                                    {categoryName}
                                    <button className={styles.pillX} onClick={() => { setFilter({ category: "" }); setVisibleCount(PAGE_SIZE); }} aria-label="Remove category filter">×</button>
                                </span>
                            )}
                        </div>
                    )}
                </div>

                <div className={styles['items-grid']}>
                    {visibleItems.map((item, index) => (
                        <>
                            <Link to={`/others/${item.id}`} key={item.id}>
                                <ItemCard
                                    name={item.name}
                                    image={item.images.profile}
                                    category={item.category}
                                />
                            </Link>
                            {(index + 1) % AD_EVERY === 0 && (
                                <AdCard key={`ad-${index}`} />
                            )}
                        </>
                    ))}
                </div>

                {visibleCount < filteredItems.length && (
                    <button className='load-more-btn' onClick={() => setVisibleCount(visibleCount + PAGE_SIZE)}>
                        Load More
                    </button>
                )}
            </div>
            <Footer />
        </>
    );
}
