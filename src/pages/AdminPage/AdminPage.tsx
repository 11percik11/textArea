import AdminTable from "../../comps/AdminTable/AdminTable";
import MenuSwipe from "../../comps/MenuSwipe";
import exitIcon from "../../assets/icons/exitIcon.svg";
import { useEffect, useRef, useState } from "react";
import ExitModal from "../../comps/modals/ExitModal";
import { useNavigate } from "react-router-dom";
//import type { Cell, Spreadsheet } from "../../types";
//import axios from "axios";
import { AdminTableControls } from "../../comps/AdminTable/AdminTableControls";
//import { tableStore } from "./SpreadsheetStore";
import { observer } from "mobx-react-lite";
//import { API_CONFIG } from "../../assets/config";
import { cancelRequest } from "../../api/shared/requestCancel";
import { spreadsheetManager } from "../../store/root";
//import { toJS } from "mobx";
import OverlayLoader from "../../comps/OverlayLoader/OverlayLoader";
import { useReactToPrint } from "react-to-print";

type Props = {};

const AdminPage = observer(({}: Props) => {
  const [isExitModalOpen, setExitModalOpen] = useState(false);
  const current = spreadsheetManager.currentMainSpreadsheet;

  useEffect(() => {
    return () => {
      cancelRequest("getSpreadsheets");
    };
  }, []);

  const tableRef = useRef(null);
  const onPrint = useReactToPrint({
    contentRef: tableRef,
    documentTitle: "Главная таблица",
    //onAfterPrint: handleAfterPrint,
    //onBeforePrint: handleBeforePrint,
    pageStyle: "{ size: 0 }"
  });
  const navigate = useNavigate();
  return (
    <div className="animate-appear w-full h-full p-[32px]">
      <OverlayLoader isLoading={spreadsheetManager.isLoading} />
      <div className="flex items-center gap-[16px] relative">
        <button
          onClick={() => setExitModalOpen(true)}
          className="size-[72px] rounded-[24px] bg-white flex justify-center items-center"
        >
          <img src={exitIcon} alt="exit" className="size-[32px]" />
        </button>
        <div className="w-[1456px] h-[32px] text-accent text-[32px] font-bold">
          Главные таблицы
        </div>
        <button 
          onClick={onPrint}
          className="size-[72px] rounded-[24px] bg-white absolute right-0">

        </button>
      </div>

      {current && (
        <>
          <AdminTableControls spreadsheet={current} />
          <AdminTable
            ref={tableRef}
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
