import { MessageType, ActionType } from "@/types/chrome";

const actionRuntimeContent = (
  message: MessageType.OPEN_POPUP | MessageType.CLOSE_POPUP
) => chrome.runtime.sendMessage({ type: message });

const actionTabsContent = async (
  message: MessageType.OPEN_POPUP | MessageType.CLOSE_POPUP
) => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const tabId = tabs[0].id;
    if (tabId) {
      chrome.tabs.sendMessage(tabId, { type: message });
    }
  });
};

const closeContent = (type: ActionType) => {
  if (type === ActionType.runtime) {
    return actionRuntimeContent(MessageType.CLOSE_POPUP);
  }

  if (type === ActionType.tabs) {
    return actionTabsContent(MessageType.CLOSE_POPUP);
  }
};

const openContent = async (type: ActionType) => {
  if (type === ActionType.runtime) {
    return actionRuntimeContent(MessageType.OPEN_POPUP);
  }

  if (type === ActionType.tabs) {
    return actionTabsContent(MessageType.OPEN_POPUP);
  }
};

export { closeContent, openContent };
