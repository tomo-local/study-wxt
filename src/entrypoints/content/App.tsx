import "@/assets/global.css";

import { ModalOverlay, ModalContainer } from "@/components/content/Modal";
import { closeContent, ActionType } from "@/function/chrome";

export default function App() {
  const onClose = (e: React.MouseEvent) => {
    e.preventDefault();
    closeContent(ActionType.runtime);
  };

  return (
    <ModalOverlay onClose={onClose}>
      <ModalContainer>
        <div className="p-4 text-gray-800 bg-gray-100 rounded-lg shadow-xl">
          Hello World
        </div>
      </ModalContainer>
    </ModalOverlay>
  );
}
