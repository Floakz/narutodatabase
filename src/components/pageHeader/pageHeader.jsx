import styles from './pageHeader.module.css';

export default function PageHeader({ title, subtitle, option }) {

    return (
        <div className={styles.pageHeader}>
            <img src="/assets/banner-naruto copy.webp" alt="banner image" />
        </div>
    )


}   