import { useEffect, useRef, useState } from "react";

import SearchBar from "@/components/SearchBar";
import ResultLine from "@/components/ResultLine";

import { ListContext } from "@/machine/searchList";
import {
  searchHistorySearch,
  searchSuggestions,
  searchTabSearch,
  searchBookmarkSearch,
} from "@/function/search";

const Popup = () => {
  const [list, setList] = useState<ListContext[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isComposing, setIsComposing] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const newList = await searchTabSearch({
      query: "",
      option: { count: 4 },
    });

    const listContext = newList.map((tab) => ({
      type: "tab",
      title: tab?.title || "",
      icon: tab?.favIconUrl,
      id: tab.id,
    })) as ListContext[];

    setList(listContext);
    setSelectedIndex(0);
  };

  useEffect(() => {
    if (listRef.current && selectedIndex >= 0) {
      const selectedItem = listRef.current.children[selectedIndex];
      selectedItem.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedIndex]);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchTerm(query);

    const newList = await searchList(query, {
      suggestionCount: 5,
      historyCount: 10,
      tabCount: 10,
    });

    setList(newList);
  };

  const searchList = async (
    query: string,
    option: {
      historyCount?: number;
      tabCount?: number;
      suggestionCount?: number;
    }
  ) => {
    const suggestionResult = await searchSuggestions({
      query,
      option: { count: option.suggestionCount || 5 },
    });

    const tabResult = await searchTabSearch({
      query,
      option: { count: option.tabCount || 10 },
    });

    const historyResult = await searchHistorySearch({
      query,
      option: {
        count: option.historyCount || 10,
        term: {
          start: new Date().getTime() - 1000 * 60 * 60 * 24 * 30, // 30日前から
          end: new Date().getTime(), // 現在まで
        },
      },
    });

    const bookmarkResult = await searchBookmarkSearch({
      query,
      option: { count: 5 },
    });

    const list = [
      ...suggestionResult.map((item) => ({
        type: "search",
        title: item,
        url: `https://www.google.com/search?q=${item}`,
      })),
      ...tabResult.map((tab) => ({
        type: "tab",
        title: tab?.title || "",
        icon: tab?.favIconUrl,
        id: tab.id,
      })),
      ...historyResult.map((history) => ({
        type: "history",
        title: history.title || "",
        url: history.url,
      })),
      ...bookmarkResult.map((bookmark) => ({
        type: "bookmark",
        title: bookmark.title,
        url: bookmark.url,
      })),
    ] as ListContext[];

    return rankResults(list);
  };

  const rankResults = (result: ListContext[]) => {
    const ranked = result.sort((a, b) => {
      //完全一致を最優先
      const aTitle = a.title?.toLowerCase() || "";
      const bTitle = b.title?.toLowerCase() || "";

      const aExactMatch = aTitle === searchTerm.toLowerCase();
      const bExactMatch = bTitle === searchTerm.toLowerCase();
      if (aExactMatch && !bExactMatch) return -1;
      if (!aExactMatch && bExactMatch) return 1;

      // 次に部分一致
      const aPartialMatch = aTitle.includes(searchTerm.toLowerCase());
      const bPartialMatch = bTitle.includes(searchTerm.toLowerCase());

      if (aPartialMatch && !bPartialMatch) return -1;
      if (!aPartialMatch && bPartialMatch) return 1;

      // タブ、履歴、検索候補の優先順位
      const typeOrder = {
        tab: 0,
        history: 1,
        search: 2,
        bookmark: 3,
      };

      if (a.type === b.type) {
        return 0;
      }

      return typeOrder[a.type] - typeOrder[b.type];
    });

    return ranked;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && selectedIndex >= 0 && !isComposing) {
      const item = list[selectedIndex];
      if (item.type === "tab") {
        chrome.tabs.update(item.id as number, { active: true });
        window.close();
      } else {
        window.open(item.url, "_blank");
      }
      setSelectedIndex(-1); // 選択後、選択状態をリセット
    }

    if ((e.metaKey || e.ctrlKey) && e.key === "t") {
      e.preventDefault();
      window.close();
    }

    if (e.key === "ArrowDown") {
      setSelectedIndex((prevIndex) => Math.min(prevIndex + 1, list.length - 1));
    }
    if (e.key === "ArrowUp") {
      setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    }
  };

  const handleMouseEnter = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <div className="px-4 pt-2 pb-3 font-sans text-white bg-gray-800 w-[700px]">
      <div className="sticky top-0 border-b border-gray-700 ">
        <SearchBar
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
        />
      </div>
      <div className="mt-4 bg-gray-800 rounded">
        <ul
          ref={listRef}
          className="overflow-y-scroll max-h-[400px] hidden-scrollbar"
        >
          {list.map((item, index) => (
            <ResultLine
              key={`${index.toString()}`}
              item={item}
              index={index}
              selectedIndex={selectedIndex}
              onMouseEnter={handleMouseEnter}
              onClick={() => {
                if (item.type === "tab") {
                  chrome.tabs.update(item.id as number, {
                    active: true,
                  });
                  window.close();
                } else {
                  window.open(item.url, "_blank");
                }
              }}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Popup;
