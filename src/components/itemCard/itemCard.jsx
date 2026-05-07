import styles from './itemCard.module.css';

export default function ItemCard({ name, image, category }) {

    const unknownImage = 'https://t4.ftcdn.net/jpg/05/04/34/37/360_F_504343758_se6qzK6lJ2FHybEB3f4Ol0ZgIstHeWoR.jpg'

    return (
        <div className={styles.card}>
            <img src={image ? image : unknownImage} alt={name} className={styles.image} />
            <div className={styles.overlay} />
            <div className={styles.info}>
                <h2 className={styles.name}>{name}</h2>
                <p className={styles.category}>{category}</p>
            </div>
        </div>
    )
}