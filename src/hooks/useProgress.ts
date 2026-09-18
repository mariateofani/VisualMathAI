import { useState } from "react";
import type { Progress } from "@/schemas/progressSchema";
import { fetchProgressApi } from "@/services/api";

export function useProgress() {
  const [progress, setProgress] = useState<Progress[]>([]);

  const loadProgress = async () => {
    const data = await fetchProgressApi();
    setProgress(data);
  };

  return {
    progress,
    loadProgress,
  };
}
