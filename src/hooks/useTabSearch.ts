import { useState, useEffect } from "react";

interface Tab {
  id: number;
  title: string;
  url: string;
  icon: string;
}

export default function useTabSearch(query: string) {
  const [filteredTabs, setFilteredTabs] = useState<Tab[]>([]);

  useEffect(() => {
    chrome.runtime.sendMessage({ type: "SEARCH_TAB", query }, (response) => {
      setFilteredTabs(response.result);
    });
  }, [query]);

  return filteredTabs;
}
