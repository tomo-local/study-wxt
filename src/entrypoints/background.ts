import { openContent, ActionType } from "@/function/chrome";

export default defineBackground(() => {
  chrome.commands.onCommand.addListener((command) => {
    if (command === "OPEN_POPUP") {
      openContent(ActionType.tabs);
    }
  });

  chrome.runtime.onMessage.addListener((message) => {
    if (["OPEN_POPUP", "CLOSE_POPUP"].includes(message.type)) {
      openContent(ActionType.tabs);
    }
  });
});
