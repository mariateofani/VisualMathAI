import { useState } from "react";
import {
  analyzeFormulaApi,
} from "@/services/api";

import type {
  FormulaInput,
  AnalysisResponse,
} from "@/schemas/formulaSchema";

export function useFormulaAnalysis() {
  const [state, setState] = useState<{
    status: "idle" | "loading" | "success" | "error";
    data?: AnalysisResponse;
    message?: string;
  }>({
    status: "idle",
  });

  const analyze = async (input: FormulaInput) => {
    setState({ status: "loading" });

    try {
      const data = await analyzeFormulaApi(input);

      setState({
        status: "success",
        data,
      });
    } catch (error) {
      setState({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Terjadi kesalahan saat menganalisis rumus.",
      });
    }
  };

  return {
    state,
    analyze,
  };
}