import styles from './sectionHeader.module.css';

export default function SectionHeader({ title, link, cta }) {
    return (
        <div className={styles.sectionHeader}>
            <h4>{title}</h4>
            <a href={link} className={styles.cta}>
                <span>{cta}</span>
            </a>
        </div>
    );
}