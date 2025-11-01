import { Route, Routes, useNavigate } from "react-router-dom";
import MainPage from "./pages/MainPage";
import UserTablePage from "./pages/UserTablePage/UserTablePage";
import { TablePage } from "./pages/TablePage/TablePage";
import AdminPage from "./pages/AdminPage/AdminPage";
import { CellEditPageWrapper } from "./pages/CellEditPage/CellEditPageWrapper";
import { useEffect } from "react";

export const RouterPath = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      const isExternal =
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("//");

      if (isExternal) return;

      e.preventDefault();
      navigate(href);
    };

    document.addEventListener("click", handleLinkClick);
    return () => document.removeEventListener("click", handleLinkClick);
  }, [navigate]);
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/table" element={<UserTablePage />} />
      <Route path="/admin/table" element={<TablePage />} />
      <Route path="/user-inner-table" element={<UserTablePage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/celledit" element={<CellEditPageWrapper />} />
    </Routes>
  );
};
