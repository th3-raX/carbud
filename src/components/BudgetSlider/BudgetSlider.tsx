import React from "react";
import styles from "./BudgetSlider.module.css";

type BudgetSliderProps = {
  value: number;
  onChange: (val: number) => void;
};

export const BudgetSlider: React.FC<BudgetSliderProps> = ({
  value,
  onChange,
}) => {
  const displayValue = value >= 50 ? "₹50 lakh+" : `₹${value} lakh`;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.label}>
          Up to
        </span>
        <span className={styles.value}>
          {displayValue}
        </span>
      </div>

      <input
        type="range"
        min="5"
        max="50"
        step="1"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
        className={styles.slider}
      />
      <div className={styles.footer}>
        <span>₹5L</span>
        <span>₹50L+</span>
      </div>
    </div>
  );
};

