import { openContent, ActionType, MessageType } from "@/function/chrome";

export default defineBackground(() => {
  const { OPEN_POPUP, CLOSE_POPUP } = MessageType;

  chrome.commands.onCommand.addListener((command) => {
    if (command === OPEN_POPUP) {
      openContent(ActionType.tabs);
    }
  });

  chrome.runtime.onMessage.addListener((message, _, response) => {
    if ([OPEN_POPUP, CLOSE_POPUP].includes(message.type)) {
      openContent(ActionType.tabs);
      return true;
    }

    if (message.type === "SEARCH_TAB") {
      console.log("search tab", message);
      searchTab(message.query, (tabs) => {
        response({
          type: "SEARCH_TAB",
          result: tabs,
        });
      });
      console.log("search end", message);
      return true;
    }

    if (message.type === "UPDATE_TAB") {
      console.log("update tab", message);
      chrome.tabs.update(message.tabId, { active: true });

      response({
        type: "UPDATE_TAB",
        result: true,
      });
      return true;
    }
  });
});

type Tab = {
  id: number;
  title: string;
  url: string;
};

const searchTab = (query: string, callback: (tabs: Tab[]) => void) => {
  chrome.tabs.query({ currentWindow: true }, (tabs) => {
    callback(
      tabs.map((tab) => ({
        id: tab.id,
        title: tab.title || "",
        url: tab.url,
        icon: tab.favIconUrl || "",
      })) as Tab[]
    );
  });
};
