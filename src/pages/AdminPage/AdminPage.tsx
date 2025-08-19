import AdminTable from "../../comps/AdminTable";
import MenuSwipe from "../../comps/MenuSwipe";
import exitIcon from "../../assets/icons/exitIcon.svg";
import { useEffect, useRef, useState } from "react";
import ExitModal from "../../comps/modals/ExitModal";
import { useNavigate } from "react-router-dom";
import type { Cell, Spreadsheet } from "../../types";
import axios from "axios";
import { AdminTableControls } from "../../comps/AdminTableControls";
import { tableStore } from "./SpreadsheetStore";
import { observer } from "mobx-react-lite";

type Props = {
  onSelectCell: (data: Cell) => void;
};

const AdminPage = observer(({ onSelectCell }: Props) => {
  const [isExitModalOpen, setExitModalOpen] = useState(false);

  //@ts-ignore
  const apiUrl = window.__API_CONFIG__.apiUrl;
  const { getSpreadSheetsHandler } = tableStore;

  useEffect(() => {
    getSpreadSheetsHandler();
  }, []);

  const navigate = useNavigate();
  return (
    <div className="animate-appear w-full h-full p-[32px]">
      <div className="flex justify-between items-center gap-[16px]">
        <button
          onClick={() => setExitModalOpen(true)}
          className="size-[72px] rounded-[24px] bg-white flex justify-center items-center"
        >
          <img src={exitIcon} alt="exit" className="size-[32px]" />
        </button>
        <div className="w-[1456px] h-[32px] text-accent text-[32px] font-bold">
          Главные таблицы
        </div>
      </div>

      <AdminTableControls
        onAddRow={() => {
          // onAddRow(table);
        }}
        onAddColumn={() => {}}
        current={tableStore.rows}
      />

      <AdminTable
        spreadsheetId={tableStore.table?.id || -1}
        onSelectCell={(data) => onSelectCell(data)}
        onEdit={(editedRows) => {
          console.log("editedRows", editedRows);
          // setRows(editedRows);
        }}
        content={tableStore.rows}
      />
      <MenuSwipe onSelect={() => {}} />
      {isExitModalOpen && (
        <ExitModal
          onNo={() => setExitModalOpen(false)}
          onYes={() => {
            setExitModalOpen(false);
            navigate("/");
          }}
        />
      )}
    </div>
  );
});

export default AdminPage;
