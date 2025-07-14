import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import PasswordModal from "./comps/modals/PasswordModal";
import { useState } from "react";
import AdminPage from "./pages/AdminPage";
import CellEditPage from "./pages/CellEditPage";

const App = () => {
  const [isPasswordModalOpen, setPasswordOpen] = useState(false);
  return (
    <div className="w-[1920px] h-[1080px] top-0 left-0">
      <button onClick={() => setPasswordOpen(true)} className="fixed z-100 size-[25px] top-0 right-0"/>
    <Router>
      {isPasswordModalOpen && <PasswordModal onBack={() => setPasswordOpen(false)}/>}
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/table" element={<MainPage/>}/>
        <Route path="/admin" element={<AdminPage/>}/>
        <Route path="/celledit" element={<CellEditPage/>}/>
      </Routes>
    </Router>
    </div>
  )
}

export default App;