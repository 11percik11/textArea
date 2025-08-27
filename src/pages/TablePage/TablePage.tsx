import { useEffect, useState } from "react";
import AdminTable from "../../comps/AdminTable/AdminTable";
import { AdminTableControls } from "../../comps/AdminTable/AdminTableControls";
import { useGetCurrentCell } from "../CellEditPage/hooks/useGetCurrentCell";
import { spreadsheetManager } from "../../store/root";
import { CellEditTable } from "../CellEditPage/CellEditTable/CellEditTable";
import { observer } from "mobx-react-lite";
import { useGetSpreadsheetByUrl } from "./useGetSpreadsheetByUrl";

export const TablePage = observer(() => {
  const { data, searchParamsSpreadsheetId } = useGetSpreadsheetByUrl();

  useEffect(() => {
    spreadsheetManager.getOneSpreadSheetHandler(searchParamsSpreadsheetId);
  }, [data]);

  return data && <CellEditTable data={data} key={searchParamsSpreadsheetId} />;
});
