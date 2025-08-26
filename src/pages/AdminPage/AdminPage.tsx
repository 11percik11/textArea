import AdminTable from "../../comps/AdminTable/AdminTable";
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
import { API_CONFIG } from "../../assets/config";
import { cancelRequest } from "../../api/shared/requestCancel";
import { spreadsheetManager } from "../../store/root";
import { toJS } from "mobx";

type Props = {};

const AdminPage = observer(({}: Props) => {
  const [isExitModalOpen, setExitModalOpen] = useState(false);
  const current = spreadsheetManager.currentMainSpreadsheet;

  useEffect(() => {
    return () => {
      cancelRequest("getSpreadsheets");
    };
  }, []);

  const navigate = useNavigate();
  return (
    <div className="animate-appear w-full h-full p-[32px]">
      <div className="flex items-center gap-[16px]">
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

      {current && (
        <>
          <AdminTableControls spreadsheet={current} />
          <AdminTable
            spreadsheet={current}
            onEdit={(editedRows) => {
              console.log("editedRows", editedRows);
              // setRows(editedRows);
            }}
          />
          <MenuSwipe />
        </>
      )}
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
