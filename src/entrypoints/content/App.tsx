import "@/assets/global.css";
import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

import useQueryTabs from "@/hooks/useQueryTabs";
import useControlTab from "@/hooks/useControlTab";
import useArrowKeyControl from "@/hooks/useArrowKeyControl";

import SearchInput from "@/components/common/SearchInput";
import { ModalOverlay, ModalContainer } from "@/components/content/Modal";
import ResultFooter from "@/components/common/result/ResultFooter";
import TabItem from "@/components/common/result/TabItem";

import { closeContent } from "@/function/chrome/open";
import { ActionType } from "@/types/chrome";

export default function App() {
  const [query, setQuery] = useState("");
  const { tabs } = useQueryTabs(query);
  const { updateTab } = useControlTab();
  const { selectedIndex, listRef, handleArrowUpDownKey } =
    useArrowKeyControl(tabs);

  const handleClose = () => closeContent(ActionType.runtime);

  const handleEnterKey = () => {
    if (tabs[selectedIndex]) {
      closeContent(ActionType.runtime);
      const { id, windowId } = tabs[selectedIndex];
      updateTab(id, windowId);
    }
  };

  return (
    <ModalOverlay onClose={handleClose}>
      <ModalContainer className="w-full max-w-3xl min-h-48">
        <div className="px-6 py-2 space-y-2 text-gray-200 bg-gray-800 border-2 border-solid rounded-lg shadow-xl border-sky-500">
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
          {tabs?.length ? (
            <>
              <div className="border-t border-gray-700 border-solid" />
              <div className="pt-3 pb-2">
                <ul
                  className="overflow-x-hidden overflow-y-auto hidden-scrollbar max-h-48"
                  ref={listRef}
                >
                  {tabs.map((item, index) => (
                    <TabItem
                      key={item.id}
                      item={item}
                      isSelected={index === selectedIndex}
                    />
                  ))}
                </ul>
              </div>
            </>
          ) : null}
          <div className="border-t border-gray-700 border-solid" />
          <ResultFooter>
            {tabs.length ? (
              <p className="text-right text-gray-400">
                {tabs.length} results found
              </p>
            ) : (
              <p className="text-right text-gray-400">No results found</p>
            )}
          </ResultFooter>
        </div>
      </ModalContainer>
    </ModalOverlay>
  );
}
