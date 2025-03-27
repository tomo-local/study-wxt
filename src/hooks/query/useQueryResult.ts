import { useEffect, useState } from "react";
import useQueryTabs from "@/hooks/query/useQueryTabs";
import useQuerySuggestions from "@/hooks/query/useQuerySuggestions";
import useQueryHistories from "./useQueryHistories";

import { ResultType, Result } from "@/types/result";

export default function useResult(query: string, type: ResultType) {
  const [result, setResult] = useState<Result[]>([]);
  const { tabs } = useQueryTabs(query, type);
  const { suggestions } = useQuerySuggestions(query, type, tabs.length);
  const { histories } = useQueryHistories(query, type, tabs.length);

  const sortResult = (a: Result, b: Result) => {
    if (a.title.includes(query) && !b.title.includes(query)) {
      return -1;
    }
    if (!a.title.includes(query) && b.title.includes(query)) {
      return 1;
    }
    return 0;
  };

  useEffect(() => {
    const result = [...tabs, ...suggestions, ...histories].sort(sortResult);
    setResult(result);
  }, [tabs, suggestions, histories]);

  return {
    result,
  };
}
