import { useEffect, useState } from "react";
import AdminTable from "../../comps/AdminTable/AdminTable";
import { AdminTableControls } from "../../comps/AdminTable/AdminTableControls";
import { useGetCurrentCell } from "../CellEditPage/hooks/useGetCurrentCell";
import { spreadsheetManager } from "../../store/root";
import { CellEditTable } from "../CellEditPage/CellEditTable/CellEditTable";
import { observer } from "mobx-react-lite";
import { useGetSpreadsheetByUrl } from "./useGetSpreadsheetByUrl";
import OverlayLoader from "../../comps/OverlayLoader/OverlayLoader";

export const TablePage = observer(() => {
  const { data, searchParamsSpreadsheetId } = useGetSpreadsheetByUrl();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    spreadsheetManager
      .getOneSpreadSheetHandler(searchParamsSpreadsheetId)
      .finally(() => setIsLoading(false));
  }, [searchParamsSpreadsheetId]);

  return (
    <div className="p-[32px]">
      {<OverlayLoader isLoading={isLoading} />}
      {data && <CellEditTable data={data} key={searchParamsSpreadsheetId} />}
    </div>
  );
});
