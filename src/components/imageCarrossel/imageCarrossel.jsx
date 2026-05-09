import { useState } from "react";
import styles from "./imageCarrossel.module.css";

export default function ImageCarrossel({ images }) {

    const [current, setCurrent] = useState(0);

    const prevSlide = () => {
        setCurrent((prev) =>
            prev === 0 ? images.length - 1 : prev - 1
        );
    };

    const nextSlide = () => {
        setCurrent((prev) =>
            prev === images.length - 1 ? 0 : prev + 1
        );
    };

    return (
        <div className={styles.carousel}>
            <img
                src={images[current]}
                alt={`Slide ${current}`}
                className={styles.carouselImage}
            />

            <button
                className={`${styles.carouselBtn} ${styles.left}`}
                onClick={prevSlide}
            >
                <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </button>

            <button
                className={`${styles.carouselBtn} ${styles.right}`}
                onClick={nextSlide}
            >
                <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </button>
        </div>
    );
}