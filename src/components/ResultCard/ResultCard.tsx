import React from 'react';
import type { CarRecommendation } from '../../types';
import styles from './ResultCard.module.css';

type ResultCardProps = {
  car: CarRecommendation;
  isTopPick: boolean;
};

export const ResultCard: React.FC<ResultCardProps> = ({ car, isTopPick }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imagePlaceholder}>
        <span className={styles.badge}>
          {isTopPick ? 'Top Pick' : `Option ${car.rank}`}
        </span>
        {/* Mock image placeholder */}
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-tertiary)" strokeWidth="1.5">
          <path d="M14 16H9m10 0h3v-3.15a1 1 0 00-.84-.99L16 11l-2.7-3.6a1 1 0 00-.8-.4H8.5a1 1 0 00-.8.4L5 11l-5.16.86a1 1 0 00-.84.99V16h3m12 0a2.5 2.5 0 11-5 0m5 0a2.5 2.5 0 10-5 0m-7 0a2.5 2.5 0 11-5 0m5 0a2.5 2.5 0 10-5 0" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{car.name}</h3>
        <p className={styles.price}>{car.price}</p>
        <p className={styles.why}>
          {car.why}
        </p>
        <div className={styles.specs}>
          {car.specs.map((spec, idx) => (
            <span key={idx} className="pill">{spec}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

