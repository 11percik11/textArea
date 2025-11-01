import { BrowserRouter as Router } from "react-router-dom";
import PasswordModal from "./comps/modals/PasswordModal";
import { useState } from "react";
import { observer } from "mobx-react-lite";
import { VirtualKeyboardProvider } from "./comps/VirtualKeyboard/VirtualKeyboard";
import { linkStore } from "./store/LinkHref";
import { PopupCreateLink } from "./comps/modals/PopupCreateLink/PopupCreateLink";
import { RouterPath } from "./Router";

const App = () => {
  const [isPasswordModalOpen, setPasswordOpen] = useState(false);
  const PopupShow = linkStore.link.showHeader;
  return (
    <div className="w-[1920px] h-[1080px] top-0 left-0">
      <button
        hidden={false}
        onMouseDown={() => {
          const timeout = setTimeout(() => {
            setPasswordOpen(true);
          }, 1);

          const handleEnd = () => {
            clearTimeout(timeout);
            document.removeEventListener("mouseup", handleEnd);
            document.removeEventListener("touchend", handleEnd);
            document.removeEventListener("mouseleave", handleEnd);
          };

          document.addEventListener("mouseup", handleEnd);
          document.addEventListener("touchend", handleEnd);
          document.addEventListener("mouseleave", handleEnd);
        }}
        onTouchStart={() => {
          const timeout = setTimeout(() => {
            setPasswordOpen(true);
          }, 1);

          const handleEnd = () => {
            clearTimeout(timeout);
            document.removeEventListener("touchend", handleEnd);
            document.removeEventListener("mouseup", handleEnd);
          };

          document.addEventListener("touchend", handleEnd);
          document.addEventListener("mouseup", handleEnd);
        }}
        className="fixed z-100 size-[25px] top-0 right-0 w-[50px] h-[50px]"
      />
      <VirtualKeyboardProvider>
        <Router>
          {PopupShow && <PopupCreateLink />}
          {/* <LvlSelectModal /> */}
          {isPasswordModalOpen && (
            <PasswordModal onBack={() => setPasswordOpen(false)} />
          )}
          <RouterPath />
        </Router>
      </VirtualKeyboardProvider>
    </div>
  );
};

export default observer(App);
