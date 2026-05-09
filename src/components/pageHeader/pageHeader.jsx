import styles from './pageHeader.module.css';

export default function PageHeader({ title, subtitle, option }) {

    return (
        <div className={styles.pageHeader}>
            <img className={styles.bannerLG} src="/assets/banner-naruto.webp" alt="banner image" />
            <img className={styles.bannerMB} src="/assets/banner-mobile.webp" alt="banner image" />
        </div>
    )


}   