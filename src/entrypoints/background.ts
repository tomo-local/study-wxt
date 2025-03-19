export default defineBackground(() => {
  chrome.commands.onCommand.addListener((command) => {
    if (command === "OPEN_POPUP") {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const tabId = tabs[0].id;
        if (tabId) {
          console.log("Sending OPEN_POPUP message to tab:", tabId); // 追加
          chrome.tabs
            .sendMessage(tabId, { type: "OPEN_POPUP" })
            .catch((err) => {
              console.error("open popup", err);
            });
        }
      });
    }
  });

  chrome.runtime.onMessage.addListener((message, _, response) => {
    console.log("message", message);
    if (["OPEN_POPUP", "CLOSE_POPUP"].includes(message.type)) {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const tabId = tabs[0].id;
        if (tabId) {
          console.log("Sending OPEN_POPUP message to tab:", tabId); // 追加
          chrome.tabs
            .sendMessage(tabId, { type: "OPEN_POPUP" })
            .catch((err) => {
              console.error("open popup", err);
            });

          response({ type: "OPEN_POPUP" });
        }

        response({ type: "OPEN_POPUP_2" });
      });
    }
  });
});
