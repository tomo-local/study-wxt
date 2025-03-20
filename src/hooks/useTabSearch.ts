import { useState, useEffect } from "react";
import { Tab, MessageType } from "@/types/chrome";

const DEFAULT_COUNT = 3;

export default function useTabSearch(query: string) {
  const [filteredTabs, setFilteredTabs] = useState<Tab[]>([]);
  const [count, setCount] = useState<number | undefined>(DEFAULT_COUNT);

  useEffect(() => {
    chrome.runtime.sendMessage(
      { type: MessageType.QUERY_TAB, query, count },
      (response) => {
        setFilteredTabs(response.result);
      }
    );
    setCount(undefined);
  }, [query]);

  return {
    tabs: filteredTabs,
  };
}
