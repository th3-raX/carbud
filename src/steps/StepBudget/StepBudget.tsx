import React from "react";
import { BudgetSlider } from "../../components/BudgetSlider";
import styles from "../shared/Step.module.css";

type StepBudgetProps = {
  budget: number;
  setBudget: (val: number) => void;
  onNext: () => void;
};

export const StepBudget: React.FC<StepBudgetProps> = ({
  budget,
  setBudget,
  onNext,
}) => {
  return (
    <div className={`fade-in ${styles.container}`}>
      <h2 className={styles.title}>
        What's your budget?
      </h2>
      <p className={styles.subtitle}>
        We'll find the best options within your range.
      </p>

      <div className={styles.content}>
        <BudgetSlider value={budget} onChange={setBudget} />
      </div>

      <div className={styles.footer}>
        <button className="btn-primary" onClick={onNext}>
          Continue
        </button>
      </div>
    </div>
  );
};

