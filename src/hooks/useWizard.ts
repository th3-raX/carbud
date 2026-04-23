import { useState } from "react";
import type {
  BuyerProfile,
  UseCaseOption,
  PriorityOption,
  BodyTypeOption,
  RecommendResponse,
} from "../types";

export function useWizard() {
  const [step, setStep] = useState<number>(0);
  const [profile, setProfile] = useState<Partial<BuyerProfile>>({
    budgetLakh: 15,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<RecommendResponse | null>(null);

  const setBudget = (val: number) =>
    setProfile((prev) => ({ ...prev, budgetLakh: val }));
  const setUseCase = (val: UseCaseOption) =>
    setProfile((prev) => ({ ...prev, useCase: val }));
  const setPriority = (val: PriorityOption) =>
    setProfile((prev) => ({ ...prev, priority: val }));
  const setBodyType = (val: BodyTypeOption) =>
    setProfile((prev) => ({ ...prev, bodyType: val }));

  const fetchRecommendations = async (finalProfile: BuyerProfile) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalProfile),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch recommendations");
      }

      const data = await response.json();
      setResults(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const next = () => {
    if (step === 3) {
      if (
        profile.budgetLakh &&
        profile.useCase &&
        profile.priority &&
        profile.bodyType
      ) {
        setStep(4);
        fetchRecommendations(profile as BuyerProfile);
      }
    } else {
      setStep((s) => s + 1);
    }
  };

  const restart = () => {
    setStep(0);
    setProfile({ budgetLakh: 15 });
    setResults(null);
    setError(null);
  };

  return {
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
  };
}
