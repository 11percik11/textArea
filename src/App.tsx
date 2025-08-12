import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import PasswordModal from "./comps/modals/PasswordModal";
import { useState } from "react";
import AdminPage from "./pages/AdminPage";
import CellEditPage from "./pages/CellEditPage";
import type { Cell } from "./types";

const App = () => {
  const [currCell, setCurrCell] = useState<Cell | null>(null);
  const [isPasswordModalOpen, setPasswordOpen] = useState(false);
  
  return (
    <div className="w-[1920px] h-[1080px] top-0 left-0">
      <button
        hidden={false} //чета придумать, чтобы не было кнопки в админке
        onClick={() => setPasswordOpen(true)}
        className="fixed z-100 size-[25px] top-0 right-0 w-[50px] h-[50px]"
      />
      <Router>
        {isPasswordModalOpen && (
          <PasswordModal onBack={() => setPasswordOpen(false)} />
        )}
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/table" element={<MainPage />} />
          <Route
            path="/admin"
            element={
              <AdminPage
                onSelectCell={(data) => {
                  setCurrCell(data);
                }}
              />
            }
          />
          <Route path="/celledit" element={<CellEditPage data={currCell} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
