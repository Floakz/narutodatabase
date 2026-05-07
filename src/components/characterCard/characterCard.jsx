import styles from './characterCard.module.css';

export default function CharacterCard({ name, image, village, powerLevel }) {

    const unknownImage = 'https://t4.ftcdn.net/jpg/05/04/34/37/360_F_504343758_se6qzK6lJ2FHybEB3f4Ol0ZgIstHeWoR.jpg'

    const getTier = (level) => {
        if (level >= 90) return { label: 'Elite', bg: '#ff7700' }
        if (level >= 80) return { label: 'Strong', bg: '#00bfff' }
        if (level >= 60) return { label: 'Mid', bg: '#7bc752' }
        return { label: 'Weak', bg: '#aaaaaa' }
    }

    const tier = getTier(powerLevel)

    return (
        <div className={styles.card}>
            <img src={image ? image : unknownImage} alt={name} className={styles.image} />
            <div className={styles.overlay} />
            <div className={styles.tier}>
                <span className={styles.tierDot} style={{ background: tier.bg }} />
                {tier.label}
            </div>
            <div className={styles.info}>
                <h2 className={styles.name}>{name}</h2>
                <p className={styles.village}>{village}</p>
                <span className={styles.power}>PL: {powerLevel} / 100</span>
            </div>
        </div>
    )
}