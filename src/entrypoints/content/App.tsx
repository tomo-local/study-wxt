import "@/assets/global.css";
import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

import useQueryTabs from "@/hooks/useQueryTabs";
import useArrowKeyControl from "@/hooks/useArrowKeyControl";

import SearchInput from "@/components/common/SearchInput";
import { ModalOverlay, ModalContainer } from "@/components/content/Modal";
import ResultLine from "@/components/common/ResultLine";

import { closeContent } from "@/function/chrome/open";
import { ActionType } from "@/types/chrome";

export default function App() {
  const [query, setQuery] = useState("");
  const { tabs } = useQueryTabs(query);
  const { selectedIndex, listRef, handleArrowUpDownKey } =
    useArrowKeyControl(tabs);

  const handleClose = () => closeContent(ActionType.runtime);

  const handleEnterKey = () => {
    if (tabs[selectedIndex]) {
      closeContent(ActionType.runtime);
      chrome.runtime.sendMessage(
        {
          type: "UPDATE_TAB",
          tabId: tabs[selectedIndex].id,
          windowId: tabs[selectedIndex].windowId,
        },
        (res) => {
          console.log("update tab", res);
        }
      );
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
          {/* TODO:Footerを作る */}
          <div className="flex justify-between mt-2">
            {tabs.length ? (
              <p className="text-gray-400">{tabs.length} results found</p>
            ) : null}
          </div>
        </div>
      </ModalContainer>
    </ModalOverlay>
  );
}
