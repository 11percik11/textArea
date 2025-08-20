import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import PasswordModal from "./comps/modals/PasswordModal";
import { useEffect, useState } from "react";
import AdminPage from "./pages/AdminPage/AdminPage";
import CellEditPage from "./pages/CellEditPage";
import type { Cell } from "./types";
import { TablePage } from "./pages/TablePage/TablePage";
import { LvlSelectModal } from "./comps/modals/LvlSelectModal/LvlSelectModal";
import { cellStore } from "./store/root";
import { observer } from "mobx-react-lite";

const App = () => {
  const [isPasswordModalOpen, setPasswordOpen] = useState(false);

  useEffect(() => {
    console.log("wtf APP", cellStore.currentCell);
  }, [cellStore.currentCell]);

  useEffect(() => {
    console.log("wtf APP", cellStore.currentCellId);
  }, [cellStore.currentCellId]);

  return (
    <div className="w-[1920px] h-[1080px] top-0 left-0">
      <button
        hidden={false} //чета придумать, чтобы не было кнопки в админке
        onClick={() => setPasswordOpen(true)}
        className="fixed z-100 size-[25px] top-0 right-0 w-[50px] h-[50px]"
      />
      <Router>
        {/* <LvlSelectModal /> */}
        {isPasswordModalOpen && (
          <PasswordModal onBack={() => setPasswordOpen(false)} />
        )}
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/table" element={<MainPage />} />
          <Route path="/admin/table" element={<TablePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route
            path="/celledit"
            element={<CellEditPage data={cellStore.currentCell} />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default observer(App);
