import { MessageType } from "@/types/chrome";

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

const actionQuery = async (
  query: string,
  option: chrome.tabs.QueryInfo
): Promise<chrome.tabs.Tab[]> => {
  const response = await chrome.tabs.query(option);

  if (!query) {
    return response;
  }

  return response.filter((tab) => {
    const title = tab.title || "";
    const url = tab.url ? new URL(tab.url).hostname : "";

    const isTitleMatch = title.toLowerCase().includes(query.toLowerCase());
    const isUrlMatch = url.toLowerCase().includes(query.toLowerCase());

    return isTitleMatch || isUrlMatch;
  }) as chrome.tabs.Tab[];
};

export { actionQuery, actionRuntimeContent, actionTabsContent };
