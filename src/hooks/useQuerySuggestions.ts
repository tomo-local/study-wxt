import { useState, useEffect } from "react";
import { Suggestion } from "@/types/google";
import { querySuggestions } from "@/function/google/query";

const DEFAULT_COUNT = undefined;
const DEFAULT_TAB_COUNT = 5;

export default function useQuerySuggestions(query: string, tabCount: number) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [count, setCount] = useState<number | undefined>(DEFAULT_COUNT);

  useEffect(() => {
    if (tabCount > DEFAULT_TAB_COUNT) {
      return;
    }

    querySuggestions(query, { count }).then((result) => {
      setSuggestions(result);
    });
    setCount(undefined);
  }, [query, tabCount]);

  return {
    suggestions,
  };
}
