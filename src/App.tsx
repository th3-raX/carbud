import { useWizard } from "./hooks/useWizard";
import { ProgressBar } from "./components/ProgressBar";
import { LoadingState } from "./components/LoadingState";
import { ResultCard } from "./components/ResultCard";

import { StepBudget } from "./steps/StepBudget";
import { StepUseCase } from "./steps/StepUseCase";
import { StepPriority } from "./steps/StepPriority";
import { StepBodyType } from "./steps/StepBodyType";

import "./styles/global.css";
import styles from "./App.module.css";

export default function App() {
  const {
    step,
    profile,
    loading,
    error,
    results,
    setBudget,
    setUseCase,
    setPriority,
    setBodyType,
    next,
    restart,
  } = useWizard();

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <StepBudget
            budget={profile.budgetLakh || 15}
            setBudget={setBudget}
            onNext={next}
          />
        );
      case 1:
        return (
          <StepUseCase
            useCase={profile.useCase}
            setUseCase={setUseCase}
            onNext={next}
          />
        );
      case 2:
        return (
          <StepPriority
            priority={profile.priority}
            setPriority={setPriority}
            onNext={next}
          />
        );
      case 3:
        return (
          <StepBodyType
            bodyType={profile.bodyType}
            setBodyType={setBodyType}
            onNext={next}
          />
        );
      default:
        return null;
    }
  };

  if (step === 4) {
    if (loading) {
      return (
        <div className={styles.loadingWrapper}>
          <header className={styles.resultsHeader}>
            <h1 className={styles.headerTitle}>Advisor</h1>
            <button onClick={restart}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </header>
          <LoadingState />
        </div>
      );
    }

    if (error) {
      return (
        <div className={styles.errorWrapper}>
          <h2 className={styles.errorTitle}>Error</h2>
          <p className={styles.errorDesc}>{error}</p>
          <button className="btn-primary" onClick={restart}>
            Try Again
          </button>
        </div>
      );
    }

    if (results) {
      return (
        <div className={`fade-in ${styles.resultsWrapper}`}>
          <header className={styles.resultsHeader}>
            <h1 className={styles.headerTitle}>Advisor</h1>
            <button onClick={restart}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </header>

          <h2 className={styles.resultsTitle}>Your shortlist.</h2>
          <p className={styles.resultsIntro}>{results.intro}</p>

          <div className={styles.resultsList}>
            {results.cars.map((car, idx) => (
              <ResultCard key={idx} car={car} isTopPick={idx === 0} />
            ))}
          </div>

          <div className={styles.resultsFooter}>
            <button className="btn-secondary" onClick={restart}>
              Start over
            </button>
          </div>
        </div>
      );
    }
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>Advisor</h1>
        <button onClick={restart} className={styles.headerBtn}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </header>

      <div className={styles.progressWrapper}>
        <ProgressBar total={4} current={step + 1} />
        {step === 3 && (
          <p className={styles.stepText}>Step 4/4</p>
        )}
      </div>

      <div className={styles.stepWrapper}>
        {renderStep()}
      </div>
    </div>
  );
}

