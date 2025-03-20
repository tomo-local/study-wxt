import {
  Tab,
  QueryOption,
  CreateMessage,
  UpdateMessage,
  RemoveMessage,
} from "@/types/chrome";

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

const queryTabs = async (query: string, option: QueryOption) => {
  const response = await actionQuery(query, {
    currentWindow: option.currentWindow,
  });

  const tabs = response
    .map((tab) => {
      return {
        id: tab.id,
        title: tab.title || "",
        url: tab.url || "",
        icon: tab.favIconUrl || "",
        active: tab.active || false,
        lastAccessed: tab.lastAccessed || 0,
        windowId: tab.windowId || 0,
      } as Tab;
    })
    .sort((a, b) => b.lastAccessed - a.lastAccessed);

  return option.count ? tabs.slice(0, option.count) : tabs;
};

const createTab = async ({ url }: Omit<CreateMessage, "type">) => {
  await chrome.tabs.create({ url });
};

const updateTab = async ({ tabId, windowId }: Omit<UpdateMessage, "type">) => {
  await chrome.tabs.update(tabId, { active: true });

  // Focus on the window
  if (windowId) {
    await chrome.windows.update(windowId, { focused: true });
  }
};

const removeTab = async ({ tabId }: Omit<RemoveMessage, "type">) =>
  await chrome.tabs.remove(tabId);

export { queryTabs, createTab, updateTab, removeTab };
