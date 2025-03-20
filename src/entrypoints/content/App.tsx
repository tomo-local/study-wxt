import "@/assets/global.css";
import { useState, useRef, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

import useTabSearch from "@/hooks/useTabSearch";

import SearchInput from "@/components/common/SearchInput";
import { ModalOverlay, ModalContainer } from "@/components/content/Modal";
import ResultLine from "@/components/common/ResultLine";

import { closeContent, ActionType } from "@/function/chrome";

export default function App() {
  const [query, setQuery] = useState("");
  const tabs = useTabSearch(query);

  const handleClose = () => closeContent(ActionType.runtime);

  // TODO： arrow keyのhookを作成する
  const [selectedIndex, setSelectedIndex] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);
  useEffect(() => {
    if (listRef.current && selectedIndex >= 0) {
      const selectedItem = listRef.current.children[selectedIndex];
      selectedItem.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedIndex]);

  const handleArrowUpDownKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : tabs.length - 1));
    } else if (e.key === "ArrowDown") {
      setSelectedIndex((prev) => (prev < tabs.length - 1 ? prev + 1 : 0));
    }
  };
  // TODO： tab keyのhookを作成する

  const handleEnterKey = () => {
    if (tabs[selectedIndex]) {
      closeContent(ActionType.runtime);
      chrome.runtime.sendMessage({
        type: "UPDATE_TAB",
        tabId: tabs[selectedIndex].id,
      });
    }
  };

  return (
    <ModalOverlay onClose={handleClose}>
      <ModalContainer className="w-full max-w-3xl min-h-48">
        <div className="px-6 py-2 text-gray-200 bg-gray-800 border-2 border-solid rounded-lg shadow-xl border-sky-500">
          <SearchInput
            className="text-gray-200 bg-gray-800 focus:ring-sky-500"
            leftContent={
              <MagnifyingGlassIcon className="text-gray-400 size-6" />
            }
            onChange={(e) => setQuery(e.target.value)}
            onArrowUpDownKeyDown={handleArrowUpDownKey}
            onEnterKeyDown={handleEnterKey}
            onEscapeKeyDown={handleClose}
          />
          <div className="pt-3 pb-2 mt-2 border-t border-gray-700 border-solid">
            {tabs?.length ? (
              <ul
                className="overflow-y-auto hidden-scrollbar max-h-48"
                ref={listRef}
              >
                {tabs.map((item, index) => (
                  <ResultLine
                    key={item.id}
                    item={item}
                    isSelected={index === selectedIndex}
                  />
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-400">No results found</p>
            )}
          </div>
        </div>
      </ModalContainer>
    </ModalOverlay>
  );
}
