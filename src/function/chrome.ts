import { MessageType, ActionType } from "@/types/message";

const actionRunContent = (message: MessageType) => {
  chrome.runtime.sendMessage({ type: message }).catch((err) => {
    // TODO: エラー時に通知を出して、拡張機能を再度インストールするように促す
  });
};

const actionTabsContent = async (message: MessageType) => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const tabId = tabs[0].id;
    if (tabId) {
      chrome.tabs.sendMessage(tabId, { type: message }).catch((err) => {
        // TODO: エラー時に通知を出して、拡張機能を再度インストールするように促す
      });
    }
  });
};

const closeContent = (type: ActionType) => {
  if (type === ActionType.runtime) {
    return actionRunContent(MessageType.CLOSE_POPUP);
  }

  if (type === ActionType.tabs) {
    return actionTabsContent(MessageType.CLOSE_POPUP);
  }
};

const openContent = async (type: ActionType) => {
  if (type === ActionType.runtime) {
    return actionRunContent(MessageType.OPEN_POPUP);
  }

  if (type === ActionType.tabs) {
    return actionTabsContent(MessageType.OPEN_POPUP);
  }
};

export { closeContent, openContent, actionRunContent, ActionType, MessageType };
