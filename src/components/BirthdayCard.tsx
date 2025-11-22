/* eslint-disable react/no-unescaped-entities */
"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import styles from "./BirthdayCard.module.css";

type ConfettiPiece = {
  id: number;
  left: number;
  delay: number;
  duration: number;
  hue: number;
  lightness: number;
  size: number;
  xOffset: number;
};

const createConfetti = (): ConfettiPiece[] => {
  const randomFromSeed = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  return Array.from({ length: 120 }, (_, index) => {
    const base = (index + 1) * 17;

    return {
      id: index,
      left: randomFromSeed(base + 1) * 100,
      delay: randomFromSeed(base + 2) * 0.9,
      duration: 3.6 + randomFromSeed(base + 3) * 1.8,
      hue: 300 + Math.floor(randomFromSeed(base + 4) * 120),
      lightness: 55 + randomFromSeed(base + 5) * 10,
      size: 8 + randomFromSeed(base + 6) * 6,
      xOffset: (randomFromSeed(base + 7) - 0.5) * 55,
    };
  });
};

export default function BirthdayCard() {
  const [isBursting, setIsBursting] = useState(false);

  const confetti = useMemo<ConfettiPiece[]>(() => createConfetti(), []);

  useEffect(() => {
    if (!isBursting) {
      return;
    }

    const timeout = setTimeout(() => setIsBursting(false), 2600);
    return () => clearTimeout(timeout);
  }, [isBursting]);

  const handleSpark = () => {
    setIsBursting(false);
    requestAnimationFrame(() => setIsBursting(true));
  };

  return (
    <article className={styles.card}>
      <div className={styles.floatingOrbs}>
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className={styles.ribbon}>Joyeux anniversaire</div>
      <h1 className={styles.headline}>Taha, aujourd'hui on fête ton éclat!</h1>
      <p className={styles.subtitle}>
        Que cette journée soit un feu d'artifice de surprises, de sourires et de
        douceur.
      </p>
      <div className={styles.message}>
        <p>
          En ce jour spécial, je te souhaite de{" "}
          <strong>rayonner sans retenue</strong>. Que chaque instant t'enveloppe
          de chaleur et que les rêves qui te tiennent à cœur trouvent leur
          chemin vers la réalité.
        </p>
        <p>
          Tu as ce talent unique de transformer le quotidien en souvenirs
          précieux. Puissent les prochains chapitres être remplis de rencontres
          inspirantes, de projets audacieux et d'une sérénité qui te suit partout.
        </p>
        <p>
          Merci d'être toi, Taha. Continue d'étonner le monde avec ton énergie,
          ta générosité et cette lumière qui te rend inoubliable.
        </p>
      </div>
      <ul className={styles.qualities}>
        <li>
          <span>🎈</span>
          Des éclats de rire contagieux et une joie toujours vraie.
        </li>
        <li>
          <span>🎁</span>
          Des projets qui se dessinent exactement comme tu les imagines.
        </li>
        <li>
          <span>🌟</span>
          Une année remplie d'étincelles, de paix et de rencontres magiques.
        </li>
      </ul>
      <div className={styles.actions}>
        <button type="button" className={styles.sparkButton} onClick={handleSpark}>
          <span className={styles.buttonGlow} />
          Libère une pluie d'étoiles
        </button>
      </div>
      <p className={styles.signature}>Avec toute mon affection ✨</p>
      {isBursting && (
        <div className={styles.confetti} aria-hidden>
          {confetti.map((piece) => (
            <span
              key={piece.id}
              className={styles.confettiPiece}
              style={
                {
                  "--x-percent": `${piece.left}%`,
                  "--delay": `${piece.delay}s`,
                  "--duration": `${piece.duration}s`,
                  "--hue": `${piece.hue}`,
                  "--lightness": `${piece.lightness}%`,
                  "--size": `${piece.size}px`,
                  "--x-offset": `${piece.xOffset}vw`,
                } as CSSProperties
              }
            />
          ))}
        </div>
      )}
    </article>
  );
}
