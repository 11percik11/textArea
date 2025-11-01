import { useEffect, useState } from "react";

import { observer } from "mobx-react-lite";

import { useGetSpreadsheetByUrl } from "../TablePage/useGetSpreadsheetByUrl";
import UserTable from "../../comps/UserTable/UserTable";
import InfoModal from "../../comps/modals/InfoModal/InfoModal";
import type { SpreadsheetCellEntity } from "../../store/SpreadsheetCellEntity";
import { spreadsheetManager } from "../../store/root";
import { Header } from "../shared/Header";
import OverlayLoader from "../../comps/OverlayLoader/OverlayLoader";
import { PathlinkStore } from "../../store/PathLink";
// import { useSearchParams } from "react-router-dom";

type TitleWithPos = [string, [number, number]];

const UserTablePage = () => {
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

  const [infoModalCell, setInfoModalCell] =
    useState<SpreadsheetCellEntity | null>(null);

  const pageTitle = data ? data.title : "";

  // console.log(data);
  // console.log(
  //   data?.rows.flatMap((item) => item.cells.map((cell) => cell.raw.title)),
  // );

  // useEffect(() => {
  //   if (data && data != null) {
  //     console.log("UPDATETABLE");

  //     PathlinkStore.addArrLink([searchParamsSpreadsheetId, [data.rows.flatMap((item: any) => item.cells.map((cell: any) => cell.raw.title))]]);
  //   }
  // }, [data])

  // useEffect(() => {
  //   if (!data) return;

  //   // чтобы не добавлять дважды
  //   const alreadyAdded = PathlinkStore.link.arrLinks.some(
  //     ([id]) => id === searchParamsSpreadsheetId,
  //   );
  //   if (!alreadyAdded) {
  //     console.log("Добавляем в PathLinkStore");
  //     PathlinkStore.addArrLink([
  //       searchParamsSpreadsheetId,
  //       // data.rows.flatMap((item: any) =>
  //       //   item.cells.map((cell: any) => cell.raw.title),
  //       // ),
  //       data.rows.flatMap((row, rIdx) =>
  //   row.cells.map((cell, cIdx): TitleWithPos => [cell.raw.title, [rIdx, cIdx]])
  // );
  //       data.title,
  //     ]);
  //   }
  // }, [data]);

  useEffect(() => {
  if (!data) return;

  const idNum = Number(searchParamsSpreadsheetId); // привели к числу

  // защита от дублей
  const alreadyAdded = PathlinkStore.link.arrLinks.some(
    ([id]) => id === idNum
  );
  if (alreadyAdded) return;

  console.log("Добавляем в PathLinkStore");

  PathlinkStore.addArrLink([
    idNum,
    data.rows.flatMap((row, rIdx) =>
      row.cells.map(
        (cell, cIdx): TitleWithPos => [cell.raw.title || "", [rIdx, cIdx]]
      )
    ),
    data.title,
  ]);
}, [data, searchParamsSpreadsheetId]);

  return (
    <div className="w-full h-full p-[32px]" key={searchParamsSpreadsheetId}>
      <Header
        title={pageTitle}
        searchParamsSpreadsheetId={searchParamsSpreadsheetId}
      />
      <OverlayLoader isLoading={isLoading} />
      {infoModalCell !== null && (
        <InfoModal
          cell={infoModalCell}
          onClose={() => setInfoModalCell(null)}
        />
      )}
      <div
        hidden={isLoading}
        className="max-w-[1856px] w-min h-full overflow-scroll hide-scroll"
      >
        {data && (
          <UserTable
            content={data}
            onCellInfoOpen={(cell) => setInfoModalCell(cell)}
          />
        )}
      </div>
    </div>
  );
};

export default observer(UserTablePage);
