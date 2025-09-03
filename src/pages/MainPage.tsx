import { useState } from "react";
import MenuSwipe from "../comps/MenuSwipe";
import UserTable from "../comps/UserTable/UserTable";
//import PdfReader from "../comps/modals/PdfReader";
//import axios from "axios";
//import type { Cell, Spreadsheet } from "../types";
import InfoModal from "../comps/modals/InfoModal/InfoModal";
//import { getSpreadsheets } from "../api/spreadsheet";
//import { API_CONFIG } from "../assets/config";
import { spreadsheetManager } from "../store/root";
import { observer } from "mobx-react-lite";
import type { SpreadsheetCellEntity } from "../store/SpreadsheetCellEntity";
import OverlayLoader from "../comps/OverlayLoader/OverlayLoader";
import style from "./MainPage.module.scss";

const MainPage = () => {
  const current = spreadsheetManager.currentMainSpreadsheet;
  const [infoModalCell, setInfoModalCell] =
    useState<SpreadsheetCellEntity | null>(null);
  const isLoading = false;

  return (
    <div className={style.UserPage}>
      <OverlayLoader isLoading={spreadsheetManager.isLoading} />
      {infoModalCell !== null && (
        <InfoModal
          cell={infoModalCell}
          onClose={() => setInfoModalCell(null)}
        />
      )}
      {isLoading && (
        <div className="fixed mx-auto left-0 right-0 \my-auto top-0 bottom-0 size-[100px] rounded-full border-[17px] border-dotted border-accent animate-spin" />
      )}
      <div hidden={isLoading} className="h-full overflow-scroll hide-scroll">
        {current && (
          <UserTable
            key={current.id}
            content={current}
            onCellInfoOpen={(cell) => setInfoModalCell(cell)}
          />
        )}
      </div>
      <MenuSwipe />
    </div>
  );
};

export default observer(MainPage);
