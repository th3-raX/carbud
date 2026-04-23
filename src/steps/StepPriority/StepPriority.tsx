import React from "react";
import { OptionCard } from "../../components/OptionCard";
import type { PriorityOption } from "../../types";
import styles from "../shared/Step.module.css";

type StepPriorityProps = {
  priority?: PriorityOption;
  setPriority: (val: PriorityOption) => void;
  onNext: () => void;
};

const OPTIONS: {
  id: PriorityOption;
  title: string;
  desc: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "economy",
    title: "Low running cost",
    desc: "",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 22V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v16" />
        <path d="M11 12h8a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-8" />
        <circle cx="16" cy="16" r="2" />
      </svg>
    ),
  },
  {
    id: "safety",
    title: "Safety first",
    desc: "",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    id: "comfort",
    title: "Comfort & space",
    desc: "",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="6" width="20" height="12" rx="2" ry="2" />
        <path d="M2 12h20" />
        <path d="M12 12v6" />
        <path d="M12 6v6" />
      </svg>
    ),
  },
  {
    id: "resale",
    title: "Resale & reliability",
    desc: "",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
  },
];

export const StepPriority: React.FC<StepPriorityProps> = ({
  priority,
  setPriority,
  onNext,
}) => {
  return (
    <div className={`fade-in ${styles.container}`}>
      <h2 className={styles.titleSpaced}>
        What matters most to you?
      </h2>

      <div className={styles.grid}>
        {OPTIONS.map((opt) => (
          <OptionCard
            key={opt.id}
            title={opt.title}
            description={opt.desc}
            icon={opt.icon}
            selected={priority === opt.id}
            onClick={() => setPriority(opt.id)}
          />
        ))}
      </div>

      <div className={styles.footer}>
        <button className="btn-primary" onClick={onNext} disabled={!priority}>
          Continue
        </button>
      </div>
    </div>
  );
};
