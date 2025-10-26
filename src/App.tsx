import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import PasswordModal from "./comps/modals/PasswordModal";
import { useState } from "react";
import AdminPage from "./pages/AdminPage/AdminPage";

import { TablePage } from "./pages/TablePage/TablePage";
// import { cellStore } from "./store/root";
import { observer } from "mobx-react-lite";
import { CellEditPageWrapper } from "./pages/CellEditPage/CellEditPageWrapper";

import UserTablePage from "./pages/UserTablePage/UserTablePage";
import { VirtualKeyboardProvider } from "./comps/VirtualKeyboard/VirtualKeyboard";
import { linkStore } from "./store/LinkHref";
import { PopupCreateLink } from "./comps/modals/PopupCreateLink/PopupCreateLink";

const App = () => {
  const [isPasswordModalOpen, setPasswordOpen] = useState(false);
  const PopupShow = linkStore.link.showHeader;
  
  // const navigate = useNavigate()

  // useEffect(() => {
  //   console.log("wtf APP", cellStore.currentCell);
  // }, [cellStore.currentCell]);

  // useEffect(() => {
  //   console.log("wtf APP", cellStore.currentCellId);
  // }, [cellStore.currentCellId]);
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
        {PopupShow && (
          <PopupCreateLink/>
        )}
          {/* <LvlSelectModal /> */}
          {isPasswordModalOpen && (
            <PasswordModal onBack={() => setPasswordOpen(false)} />
          )}
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/table" element={<UserTablePage />} />
            <Route path="/admin/table" element={<TablePage />} />
            <Route path="/user-inner-table" element={<UserTablePage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/celledit" element={<CellEditPageWrapper />} />
          </Routes>
        </Router>
      </VirtualKeyboardProvider>
    </div>
  );
};

export default observer(App);
