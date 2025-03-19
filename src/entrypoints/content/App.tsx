import "@/assets/global.css";

import { useState } from "react";
import { ModalOverlay, ModalContainer } from "@/components/content/Modal";
export default function App() {
  const sendMessage = () => {
    chrome.runtime.sendMessage({ type: "CLOSE_POPUP" }).catch((err) => {
      console.error("close popup", {
        error: err,
      });
    });
  };

  const onClose = (e: React.MouseEvent) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <ModalOverlay onClose={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <div className="p-4 text-gray-800 bg-gray-100 rounded-lg shadow-xl">
          Hello World
        </div>
      </ModalContainer>
    </ModalOverlay>
  );
}
