import ReactDOM from "react-dom/client";
import App from "../content/App";
import { MessageType } from "@/types/chrome";

// devの場合は、https://www.google.com/* のみ, それ以外の場合は<all_urls>にする
const matchURL =
  process.env.NODE_ENV === "development"
    ? "https://www.github.com/*"
    : "<all_urls>";

export default defineContentScript({
  matches: [
    "https://zenn.dev/*",
    "https://www.google.com/*",
    "https://www.github.com/*",
  ],
  cssInjectionMode: "ui",
  async main(ctx) {
    let open = false;

    const ui = await createShadowRootUi(ctx, {
      name: "zen-search",
      position: "modal",
      zIndex: 999999999,
      anchor: "body",
      append: "first",
      onMount: (container) => {
        const root = ReactDOM.createRoot(container);

        root.render(<App />);

        return { root, container };
      },
      onRemove: (input) => {
        input?.root.unmount();
      },
    });
    chrome.runtime.onMessage.addListener((message) => {
      if (message.type === MessageType.OPEN_POPUP) {
        open ? ui.remove() : ui.mount();
        open = !open;
      }

      if (message.type === MessageType.CLOSE_POPUP) {
        ui.remove();
        open = false;
      }
    });
  },
});
