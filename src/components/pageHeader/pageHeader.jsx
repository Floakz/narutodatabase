import styles from './pageHeader.module.css';

export default function PageHeader({ title, subtitle }) {

    return (
        <div className={styles.pageHeader}>
            <h1>{title ? title : 'ALL THINGS NARUTO'}</h1>
            {subtitle && <span className={styles.underline}>Discover naruto related lists</span>}

        </div>
    )
}