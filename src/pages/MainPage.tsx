import { useState } from "react";
import MenuSwipe from "../comps/MenuSwipe";
import UserTable from "../comps/UserTable/UserTable";
import InfoModal from "../comps/modals/InfoModal/InfoModal";
import { spreadsheetManager } from "../store/root";
import { observer } from "mobx-react-lite";
import type { SpreadsheetCellEntity } from "../store/SpreadsheetCellEntity";
import OverlayLoader from "../comps/OverlayLoader/OverlayLoader";
import style from "./MainPage.module.scss";
import { linkStore } from "../store/LinkHref";
import { OpenPopupId } from "../store/OpenPopupId";

const MainPage = () => {
  const current = spreadsheetManager.currentMainSpreadsheet;
  const [infoModalCell, setInfoModalCell] =
    useState<SpreadsheetCellEntity | null>(null);
  const isLoading = false;
  const PopupShow = linkStore.link.showHeader; 
  const OpenPopup = OpenPopupId.link.isOpen

  // console.log("infoModalCell !== null && OpenPopupId.link.isOpen", infoModalCell !== null, "OPEN", OpenPopupId.link.isOpen);

  return (
    <div
      className={style.UserPage}
      style={{ paddingTop: PopupShow ? "100px" : undefined }}
    >
      <OverlayLoader isLoading={spreadsheetManager.isLoading} />
      {isLoading && (
        <div className="fixed mx-auto left-0 right-0 \my-auto top-0 bottom-0 size-[100px] rounded-full border-[17px] border-dotted border-accent animate-spin" />
      )}
      <div hidden={isLoading} className="overflow-scroll hide-scroll">
        {current && (
          <UserTable
            key={current.id}
            content={current}
            onCellInfoOpen={(cell) => setInfoModalCell(cell)}
          />
        )}
      </div>
      <MenuSwipe />
      {infoModalCell !== null && OpenPopup && (
        <InfoModal
          cell={infoModalCell}
          onClose={() => setInfoModalCell(null)}
        />
      )}
    </div>
  );
};

export default observer(MainPage);
