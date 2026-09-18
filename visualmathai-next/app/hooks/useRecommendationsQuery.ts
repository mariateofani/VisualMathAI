"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchRecommendations } from "../services/recommendationApi";

export const RECOMMENDATION_QUERY_KEY = [
  "recommendations",
];

export function useRecommendationsQuery() {
  return useQuery({
    queryKey: RECOMMENDATION_QUERY_KEY,
    queryFn: fetchRecommendations,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 15,
  });
}