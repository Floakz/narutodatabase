import styles from './footer.module.css'

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.innerFooter}>
                <a href="/"><img src="src\assets\logo-narutoDB-white.webp" alt="naruto db logo" /></a>
                <p>&copy; 2026 Naruto Database. All rights reserved.</p>
            </div>

        </footer>
    )
}