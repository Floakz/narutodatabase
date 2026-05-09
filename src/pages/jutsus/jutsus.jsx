import { useState, useEffect, useRef } from "react";
import Menu from "../../components/menu/menu";
import jutsusData from '../../data/jutsus'
import JutsusCard from "../../components/jutsusCard/jutsusCard";
import styles from './jutsus.module.css'
import Footer from "../../components/footer/footer";
import AdCard from "../../components/ads/adCard/adCard";
import { Link } from "react-router-dom";

const PAGE_SIZE = 25;
const AD_EVERY = 8;

const JUTSU_TYPES = [
    { value: "Ninjutsu", label: "Ninjutsu" },
    { value: "Genjutsu", label: "Genjutsu" },
    { value: "Taijutsu", label: "Taijutsu" },
    { value: "Dojutsu", label: "Dojutsu" },
    { value: "Fuinjutsu", label: "Fuinjutsu" },
];

const RANKS = [
    { value: "S", label: "S" },
    { value: "A", label: "A" },
    { value: "B", label: "B" },
    { value: "C", label: "C" },
    { value: "D", label: "D" },
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
                            {label === "Rank" ? (
                                <span className={`${styles.badge} ${styles[`badge_${opt.value}`]}`}>{opt.label}</span>
                            ) : (
                                opt.label
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function Jutsus() {
    const jutsus = jutsusData.jutsus;

    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

    const [filter, setFilter] = useState({
        type: '',
        rank: '',
    });

    const filteredJutsus = jutsus.filter((j) => {
        if (filter.type && j.type !== filter.type) return false;
        if (filter.rank && j.rank !== filter.rank) return false;
        return true;
    });

    const visibleJutsus = filteredJutsus.slice(0, visibleCount);

    const hasFilters = filter.type || filter.rank;

    const removePill = (key) => setFilter((f) => ({ ...f, [key]: "" }));
    const reset = () => { setFilter({ type: "", rank: "" }); setVisibleCount(PAGE_SIZE); };

    const typeName = JUTSU_TYPES.find((t) => t.value === filter.type)?.label;
    const rankName = RANKS.find((r) => r.value === filter.rank)?.label;

    return (
        <>
            <div className="container">
                <Menu />

                <div className="topPageSpace"></div>

                <div className={styles.adSpace}>AD SPACE</div>

                <div className={styles.filterSection}>
                    <div className={styles.filterRow}>
                        <Dropdown
                            label="Type"
                            options={JUTSU_TYPES}
                            value={filter.type}
                            onChange={(v) => { setFilter((f) => ({ ...f, type: v })); setVisibleCount(PAGE_SIZE); }}
                            allLabel="All types"
                        />
                        <Dropdown
                            label="Rank"
                            options={RANKS}
                            value={filter.rank}
                            onChange={(v) => { setFilter((f) => ({ ...f, rank: v })); setVisibleCount(PAGE_SIZE); }}
                            allLabel="All ranks"
                        />
                        {hasFilters && (
                            <button className={styles.resetBtn} onClick={reset} type="button">
                                Reset
                            </button>
                        )}
                    </div>

                    {hasFilters && (
                        <div className={styles.pills} aria-live="polite">
                            {typeName && (
                                <span className={styles.pill}>
                                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                                        <path d="M6 1l1.5 3h3l-2.5 2 1 3L6 7.5 3 9l1-3L1.5 4h3z" fill="currentColor" />
                                    </svg>
                                    {typeName}
                                    <button className={styles.pillX} onClick={() => removePill("type")} aria-label="Remove type filter">×</button>
                                </span>
                            )}
                            {rankName && (
                                <span className={styles.pill}>
                                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                                        <path d="M7 1L3 7h4l-2 4 6-6H7L9 1z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" fill="none" />
                                    </svg>
                                    Rank {rankName}
                                    <button className={styles.pillX} onClick={() => removePill("rank")} aria-label="Remove rank filter">×</button>
                                </span>
                            )}
                        </div>
                    )}
                </div>

                <div className={styles['jutsus-grid']}>
                    {visibleJutsus.map((jutsu, index) => (
                        <>
                            <Link to={`/jutsus/${jutsu.id}`}>
                                <JutsusCard
                                    key={jutsu.id}
                                    name={jutsu.name}
                                    image={jutsu.images.profile}
                                    rank={jutsu.rank}
                                    type={jutsu.type}
                                /> </Link>
                            {(index + 1) % AD_EVERY === 0 && (
                                <AdCard key={`ad-${index}`} />
                            )}
                        </>
                    ))}
                </div>

                {visibleCount < filteredJutsus.length && (
                    <button className='load-more-btn' onClick={() => setVisibleCount(visibleCount + PAGE_SIZE)}>
                        Load More
                    </button>
                )}
            </div>
            <Footer />
        </>
    );
}
