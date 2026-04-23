import React from "react";
import styles from "./OptionCard.module.css";

type OptionCardProps = {
  icon: React.ReactNode;
  title: string;
  description?: string;
  selected: boolean;
  onClick: () => void;
};

export const OptionCard: React.FC<OptionCardProps> = ({
  icon,
  title,
  description,
  selected,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.card} ${selected ? "card-selected" : ""}`}
    >
      {selected && (
        <div className={styles.checkmark}>
          <svg
            width="10"
            height="8"
            viewBox="0 0 10 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 4L3.5 6.5L9 1"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
      <div className={styles.iconWrapper}>
        {icon}
      </div>
      <h3 className={`${styles.title} ${description ? styles.titleWithDesc : ''}`}>
        {title}
      </h3>
      {description && (
        <p className={styles.desc}>
          {description}
        </p>
      )}
    </button>
  );
};
