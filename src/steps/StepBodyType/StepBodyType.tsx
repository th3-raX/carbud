import React from "react";
import { OptionCard } from "../../components/OptionCard";
import type { BodyTypeOption } from "../../types";
import styles from "../shared/Step.module.css";

type StepBodyTypeProps = {
  bodyType?: BodyTypeOption;
  setBodyType: (val: BodyTypeOption) => void;
  onNext: () => void;
};

const OPTIONS: {
  id: BodyTypeOption;
  title: string;
  desc: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "hatchback",
    title: "Hatchback",
    desc: "Compact & practical",
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
    id: "sedan",
    title: "Sedan",
    desc: "Comfort & style",
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
    id: "suv",
    title: "SUV",
    desc: "Spacious & capable",
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
    id: "muv",
    title: "MUV/MPV",
    desc: "Family mover",
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
    id: "any",
    title: "No preference",
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
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
];

export const StepBodyType: React.FC<StepBodyTypeProps> = ({
  bodyType,
  setBodyType,
  onNext,
}) => {
  return (
    <div className={`fade-in ${styles.container}`}>
      <h2 className={styles.titleSpaced}>
        Any preference on body type?
      </h2>

      <div className={styles.gridScroll}>
        {OPTIONS.map((opt) => (
          <div
            key={opt.id}
            style={{ gridColumn: opt.id === "any" ? "1 / -1" : "auto" }}
          >
            <OptionCard
              title={opt.title}
              description={opt.desc}
              icon={opt.icon}
              selected={bodyType === opt.id}
              onClick={() => setBodyType(opt.id)}
            />
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <button className="btn-primary" onClick={onNext} disabled={!bodyType}>
          Find my shortlist &rarr;
        </button>
      </div>
    </div>
  );
};

