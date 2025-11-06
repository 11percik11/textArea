import { useEffect, useRef, useState } from "react";

import { spreadsheetManager } from "../../store/root";
import { CellEditTable } from "../CellEditPage/CellEditTable/CellEditTable";
import { observer } from "mobx-react-lite";
import { useGetSpreadsheetByUrl } from "./useGetSpreadsheetByUrl";
import OverlayLoader from "../../comps/OverlayLoader/OverlayLoader";
import { Header } from "../shared/Header";
// import exitIcon from "../../assets/icons/exitIcon.svg";
import printIcon from "../../assets/icons/printIcon.svg";
import { useReactToPrint } from "react-to-print";

export const TablePage = observer(() => {
  const { data, searchParamsSpreadsheetId } = useGetSpreadsheetByUrl();

  const [isLoading, setIsLoading] = useState(false);

  const tableRef1 = useRef(null);
  const onPrint = useReactToPrint({
    contentRef: tableRef1,
    documentTitle: "Главная таблица",
    //onAfterPrint: handleAfterPrint,
    //onBeforePrint: handleBeforePrint,
    pageStyle: "{ size: 0 }",
  });

  useEffect(() => {
    setIsLoading(true);
    spreadsheetManager
      .getOneSpreadSheetHandler(searchParamsSpreadsheetId)
      .finally(() => setIsLoading(false));
  }, [searchParamsSpreadsheetId]);

  return (
    <div className="p-[32px]">
      {<OverlayLoader isLoading={isLoading} />}
      <div className="flex">
        <Header
          title={data?.title || "Новая таблица"}
          searchParamsSpreadsheetId={0}
        />
        <button
          onClick={onPrint}
          className="size-[72px] mr-[32px] rounded-[24px] bg-white absolute right-0 flex items-center justify-center"
        >
          <img src={printIcon} className="size-[32px]" />
        </button>
      </div>
      {data && <CellEditTable ref={tableRef1} data={data} key={searchParamsSpreadsheetId} />}
    </div>
  );
});
