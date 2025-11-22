import BirthdayCard from "@/components/BirthdayCard";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <header className={styles.headlineBlock}>
          <p className={styles.headline}>Une célébration pour toi</p>
          <h2 className={styles.subline}>
            Taha, que cette nouvelle année te comble de magie et de lumière.
          </h2>
        </header>
        <div className={styles.cardSlot}>
          <div className={styles.nebula} aria-hidden />
          <BirthdayCard />
        </div>
      </div>
    </main>
  );
}
