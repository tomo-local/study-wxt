import { useState, useEffect } from "react";
import "@/assets/global.css";
import SearchBar from "@/components/SearchBar";
export default function App() {
  const [open, setOpen] = useState(false);

  const sendMessage = () => {
    chrome.runtime.sendMessage({ type: "CLOSE_POPUP" }).then(e => {
      console.log("sendMessage", e);
    }).catch((err) => {
      console.error("open popup", err)
    });
  };

  const onClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("popup close");

    sendMessage();
  };

  return (
    <div
      className={`"relative z-10"`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div className="fixed inset-0 transition-opacity" aria-hidden="true" />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex items-center justify-center min-h-full p-4 text-center">
          <div className="relative w-full max-w-3xl overflow-hidden text-left transition-all transform">
            <div
              className="px-4 px-6 py-3 bg-gray-800 border border-gray-600 border-solid rounded-lg shadow-xl"
              onClick={(e) => {
                e.stopPropagation();
                console.log("clicked");
              }}
            >
              Hello World
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
