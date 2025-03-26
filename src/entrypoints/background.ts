import {
  QueryMessage,
  UpdateMessage,
  ActionType,
  MessageType,
} from "@/types/chrome";

import { openContent } from "@/function/chrome/open";
import { queryTabs, updateTab, removeTab } from "@/function/chrome/tab";

const { OPEN_POPUP, CLOSE_POPUP, QUERY_TAB, UPDATE_TAB, REMOVE_TAB } =
  MessageType;

export default defineBackground(() => {
  chrome.commands.onCommand.addListener((command) => {
    if (command === OPEN_POPUP) {
      openContent(ActionType.tabs);
      return true;
    }
  });

  chrome.runtime.onMessage.addListener((message, _, response) => {
    if ([OPEN_POPUP, CLOSE_POPUP].includes(message.type)) {
      openContent(ActionType.tabs);
      return true;
    }

    if (message.type === QUERY_TAB) {
      const { query, count } = message as QueryMessage;

      queryTabs(query, { count }).then((tabs) => {
        response({
          type: QUERY_TAB,
          result: tabs,
        });
      });
      return true;
    }

    if (message.type === UPDATE_TAB) {
      const { tabId, windowId } = message as UpdateMessage;
      updateTab({
        tabId,
        windowId,
      });

      response({
        type: "UPDATE_TAB",
        result: true,
      });
      return true;
    }

    if (message.type === REMOVE_TAB) {
      removeTab(message.tabId);

      response({
        type: "REMOVE_TAB",
        result: true,
      });
      return true;
    }
  });
});
