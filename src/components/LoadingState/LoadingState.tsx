import React from "react";
import styles from "./LoadingState.module.css";

export const LoadingState: React.FC = () => {
  return (
    <div className={`fade-in ${styles.container}`}>
      <div className={`spinner ${styles.spinnerWrapper}`}></div>
      <h2 className={styles.title}>
        Matching cars to your needs.
      </h2>
      <p className={styles.desc}>
        Analysing specs, mileage, safety ratings, and real owner reviews...
      </p>
    </div>
  );
};
