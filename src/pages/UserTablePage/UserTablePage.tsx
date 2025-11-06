import { useEffect, useState } from "react";

import { observer } from "mobx-react-lite";

import { useGetSpreadsheetByUrl } from "../TablePage/useGetSpreadsheetByUrl";
import UserTable from "../../comps/UserTable/UserTable";
import InfoModal from "../../comps/modals/InfoModal/InfoModal";
import type { SpreadsheetCellEntity } from "../../store/SpreadsheetCellEntity";
import { spreadsheetManager } from "../../store/root";
import OverlayLoader from "../../comps/OverlayLoader/OverlayLoader";
import { PathlinkStore } from "../../store/PathLink";
import { linkStore } from "../../store/LinkHref";
import { OpenPopupId } from "../../store/OpenPopupId";
import { Header1 } from "../shared/Header1";
// import { useSearchParams } from "react-router-dom";

type TitleWithPos = [string, [number, number], string, any];

const UserTablePage = () => {
  const PopupShow = linkStore.link.showHeader;
  const OpenPopup = OpenPopupId.link.isOpen
  const [infoModalCell, setInfoModalCell] =
    useState<SpreadsheetCellEntity | null>(null);
  const { data, searchParamsSpreadsheetId } = useGetSpreadsheetByUrl();
  PathlinkStore.setArrElement(data);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setInfoModalCell(null);
    setIsLoading(true);
    spreadsheetManager
      .getOneSpreadSheetHandler(searchParamsSpreadsheetId)
      .finally(() => setIsLoading(false));
  }, [searchParamsSpreadsheetId]);


  const pageTitle = data ? data.title : "";

  useEffect(() => {
    if (!data) return;

    const idNum = Number(searchParamsSpreadsheetId); // привели к числу

    // защита от дублей
    const alreadyAdded = PathlinkStore.link.arrLinks.some(
      ([id]) => id === idNum,
    );
    if (alreadyAdded) return;

    console.log("Добавляем в PathLinkStore");

    PathlinkStore.addArrLink([
      idNum,
      data.rows.flatMap((row, rIdx) =>
        row.cells.map(
          (cell, cIdx): TitleWithPos => [
            cell.raw.title || "",
            [rIdx, cIdx],
            cell.raw.type,
            cell.raw.children?.id,
          ],
        ),
      ),
      data.title,
    ]);
  }, [data, searchParamsSpreadsheetId]);

  // console.log("infoModalCell !== null && OpenPopupId.link.isOpen", infoModalCell !== null && OpenPopupId.link.isOpen);
    // console.log("infoModalCell !== null && OpenPopupId.link.isOpen", infoModalCell !== null, "OPEN", OpenPopupId.link.isOpen);
  

  return (
    <div
      className={`w-full h-full p-[32px] flex flex-col ${PopupShow && "pt-[80px]"}`}
      key={searchParamsSpreadsheetId}
    >
      <Header1
        title={pageTitle}
        searchParamsSpreadsheetId={searchParamsSpreadsheetId}
      />
      <OverlayLoader isLoading={isLoading} />
      <div
        hidden={isLoading}
        className="max-w-[1856px] w-min overflow-scroll hide-scroll"
      >
        {data && (
          <UserTable
            content={data}
            onCellInfoOpen={(cell) => setInfoModalCell(cell)}
          />
        )}
      </div>
      {infoModalCell !== null && OpenPopup &&  (
        <InfoModal
          cell={infoModalCell}
          onClose={() => setInfoModalCell(null)}
        />
      )}
    </div>
  );
};

export default observer(UserTablePage);
