import React from 'react';
import styles from './ProgressBar.module.css';

type ProgressBarProps = {
  total: number;
  current: number; // 0-indexed or 1-indexed? Let's assume 1-indexed here, or pass segments. If steps are 0,1,2,3 out of 4, then current is 1,2,3,4
};

export const ProgressBar: React.FC<ProgressBarProps> = ({ total, current }) => {
  return (
    <div className={styles.container}>
      {Array.from({ length: total }).map((_, idx) => (
        <div
          key={idx}
          className={`${styles.segment} ${idx < current ? styles.active : styles.inactive}`}
        />
      ))}
    </div>
  );
};
