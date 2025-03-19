import ReactDOM from "react-dom/client";
import App from "../content/App";

export default defineContentScript({
  matches: ["https://www.google.com/*"],
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
      if (message.type === "OPEN_POPUP") {
        open ? ui.remove() : ui.mount();
        open = !open;
      }
    });
  },
});
