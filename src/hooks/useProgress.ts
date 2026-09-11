import { useState } from "react";

import { fetchProgressApi } from "@/services/api";

import type { Progress } from "@/schemas/progressSchema";

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