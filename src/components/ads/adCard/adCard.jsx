// components/adCard/adCard.jsx
import { useEffect, useRef } from "react";
import styles from "./adCard.module.css";

export default function AdCard() {
    const ref = useRef(null);

    useEffect(() => {
        try {
            if (window.adsbygoogle) {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            }
        } catch (e) { }
    }, []);

    return (
        <div ref={ref} className={styles.adCard}> AD SPACE
            <ins
                className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"   // your publisher ID
                data-ad-slot="XXXXXXXXXX"                  // your ad slot ID
                data-ad-format="auto"
                data-full-width-responsive="true"
            />
        </div>
    );
}