import { useState, useEffect, useRef } from "react";
import Menu from "../../components/menu/menu";
import clansData from '../../data/clans.json';
import ClanCard from "../../components/clanCard/clanCard";
import styles from './clans.module.css';
import Footer from "../../components/footer/footer";
import AdCard from "../../components/ads/adCard/adCard";
import { Link } from "react-router-dom";

const PAGE_SIZE = 25;
const AD_EVERY = 8;

const VILLAGES = [
    { value: "Hidden Leaf Village", label: "Hidden Leaf" },
    { value: "Hidden Rain Village", label: "Hidden Rain" },
    { value: "Hidden Mist Village", label: "Hidden Mist" },
    { value: "Hidden Stone Village", label: "Hidden Stone" },
    { value: "Hidden Sand Village", label: "Hidden Sand" },
    { value: "Hidden Hot Water Village", label: "Hidden Hot Water" },
    { value: "Hidden Waterfall Village", label: "Hidden Waterfall" },
    { value: "Hidden Sound Village", label: "Hidden Sound" },
    { value: "Hidden Cloud Village", label: "Hidden Cloud" },
    { value: "Land of Iron", label: "Land of Iron" },
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

export default function Clans() {
    const clans = clansData.clans;

    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
    const [filter, setFilter] = useState({ village: '' });

    const filteredClans = clans.filter((c) => {
        if (filter.village && c.village !== filter.village) return false;
        return true;
    });

    const visibleClans = filteredClans.slice(0, visibleCount);
    const hasFilters = !!filter.village;

    const reset = () => { setFilter({ village: "" }); setVisibleCount(PAGE_SIZE); };
    const villageName = VILLAGES.find((v) => v.value === filter.village)?.label;

    return (
        <>
            <div className="container">
                <Menu />

                <div className="topPageSpace"></div>

                <div className={styles.adSpace}></div>

                <div className={styles.filterSection}>
                    <div className={styles.filterRow}>
                        <Dropdown
                            label="Village"
                            options={VILLAGES}
                            value={filter.village}
                            onChange={(v) => { setFilter({ village: v }); setVisibleCount(PAGE_SIZE); }}
                            allLabel="All villages"
                        />
                        {hasFilters && (
                            <button className={styles.resetBtn} onClick={reset} type="button">
                                Reset
                            </button>
                        )}
                    </div>

                    {hasFilters && (
                        <div className={styles.pills} aria-live="polite">
                            {villageName && (
                                <span className={styles.pill}>
                                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                                        <path d="M6 1C4.067 1 2.5 2.567 2.5 4.5c0 2.706 3.5 6.5 3.5 6.5s3.5-3.794 3.5-6.5C9.5 2.567 7.933 1 6 1zm0 4.75a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" fill="currentColor" />
                                    </svg>
                                    {villageName}
                                    <button className={styles.pillX} onClick={() => { setFilter({ village: "" }); setVisibleCount(PAGE_SIZE); }} aria-label="Remove village filter">×</button>
                                </span>
                            )}
                        </div>
                    )}
                </div>

                <div className={styles['clans-grid']}>
                    {visibleClans.map((clan, index) => (
                        <>
                            <Link to={`/clans/${clan.id}`} key={clan.id}>
                                <ClanCard
                                    name={clan.name}
                                    image={clan.images.profile}
                                    village={clan.village}
                                />
                            </Link>
                            {(index + 1) % AD_EVERY === 0 && (
                                <AdCard key={`ad-${index}`} />
                            )}
                        </>
                    ))}
                </div>

                {visibleCount < filteredClans.length && (
                    <button className='load-more-btn' onClick={() => setVisibleCount(visibleCount + PAGE_SIZE)}>
                        Load More
                    </button>
                )}
            </div>
            <Footer />
        </>
    );
}
