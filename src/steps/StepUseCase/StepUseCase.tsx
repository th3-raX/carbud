import React from "react";
import { OptionCard } from "../../components/OptionCard";
import type { UseCaseOption } from "../../types";
import styles from "../shared/Step.module.css";

type StepUseCaseProps = {
  useCase?: UseCaseOption;
  setUseCase: (val: UseCaseOption) => void;
  onNext: () => void;
};

const OPTIONS: {
  id: UseCaseOption;
  title: string;
  desc: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "city",
    title: "City commute",
    desc: "Traffic and tight spots",
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
        <path d="M14 16H9m10 0h3v-3.15a1 1 0 00-.84-.99L16 11l-2.7-3.6a1 1 0 00-.8-.4H8.5a1 1 0 00-.8.4L5 11l-5.16.86a1 1 0 00-.84.99V16h3m12 0a2.5 2.5 0 11-5 0m5 0a2.5 2.5 0 10-5 0m-7 0a2.5 2.5 0 11-5 0m5 0a2.5 2.5 0 10-5 0" />
      </svg>
    ),
  },
  {
    id: "highway",
    title: "Highway drives",
    desc: "Long distance comfort",
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
        <path d="M4 22L12 2L20 22" />
        <path d="M12 2v20" />
        <path d="M8 12h8" />
      </svg>
    ),
  },
  {
    id: "family",
    title: "Family use",
    desc: "Space for everyone",
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
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: "mixed",
    title: "Mixed use",
    desc: "A bit of everything",
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
        <polyline points="16 3 21 3 21 8" />
        <line x1="4" y1="20" x2="21" y2="3" />
        <polyline points="21 16 21 21 16 21" />
        <line x1="15" y1="15" x2="21" y2="21" />
        <line x1="4" y1="4" x2="9" y2="9" />
      </svg>
    ),
  },
];

export const StepUseCase: React.FC<StepUseCaseProps> = ({
  useCase,
  setUseCase,
  onNext,
}) => {
  return (
    <div className={`fade-in ${styles.container}`}>
      <h2 className={styles.titleSpaced}>
        How will you mostly use it?
      </h2>

      <div className={styles.grid}>
        {OPTIONS.map((opt) => (
          <OptionCard
            key={opt.id}
            title={opt.title}
            description={opt.desc}
            icon={opt.icon}
            selected={useCase === opt.id}
            onClick={() => setUseCase(opt.id)}
          />
        ))}
      </div>

      <div className={styles.footer}>
        <button className="btn-primary" onClick={onNext} disabled={!useCase}>
          Continue
        </button>
      </div>
    </div>
  );
};

