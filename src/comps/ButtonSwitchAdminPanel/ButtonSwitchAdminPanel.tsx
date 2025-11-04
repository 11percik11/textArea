import { useState } from "react";
import PasswordModal from "../modals/PasswordModal";
import { useLocation } from "react-router-dom";
import { linkStore } from "../../store/LinkHref";

export const ButtonSwitchAdminPanel = () => {
  const location = useLocation();
  const [isPasswordModalOpen, setPasswordOpen] = useState(false);

  return (
    <>
      <button
        hidden={false}
        onMouseDown={() => {
          if (location.pathname != "/admin" && location.pathname != "/celledit" ) {

            const timeout = setTimeout(() => {
              setPasswordOpen(true);
              linkStore.setShowHeader(false);
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
          }
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
      {isPasswordModalOpen && (
        <PasswordModal onBack={() => setPasswordOpen(false)} />
      )}
    </>
  );
};
