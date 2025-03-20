import { useEffect, useState } from "react";
import useQueryTabs from "@/hooks/useQueryTabs";
import useQuerySuggestions from "@/hooks/useQuerySuggestions";

import { Tab } from "@/types/chrome";
import { Suggestion } from "@/types/google";

export default function useResult(query: string) {
  const [result, setResult] = useState<(Tab | Suggestion)[]>([]);
  const { tabs } = useQueryTabs(query);
  const { suggestions } = useQuerySuggestions(query, tabs.length);

  // 文字マッチング率が高い順に並び替える関数を作成
  const sortResult = (a: Tab | Suggestion, b: Tab | Suggestion) => {
    if (a.title.includes(query) && !b.title.includes(query)) {
      return -1;
    }
    if (!a.title.includes(query) && b.title.includes(query)) {
      return 1;
    }
    return 0;
  };

  useEffect(() => {
    const result = [...tabs, ...suggestions].sort(sortResult);
    setResult(result);
  }, [tabs, suggestions]);

  return {
    result,
  };
}
