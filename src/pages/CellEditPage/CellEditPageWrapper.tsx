import { observer } from "mobx-react-lite";
import CellEditPage from "./CellEditPage";
import { useGetCurrentCell } from "./hooks/useGetCurrentCell";
import { useEffect } from "react";
import { spreadsheetManager } from "../../store/root";

export const CellEditPageWrapper = observer(() => {
  const { data, searchParamsCellId } = useGetCurrentCell();

  useEffect(() => {
    if (!data || data?.type !== "table") return;

    console.log('data from page',data)
    spreadsheetManager.getOneSpreadSheetHandler(data.spreadsheetParentId);
  }, [data, data?.type]);

  console.log("WTF", data);
  return data && <CellEditPage data={data} key={searchParamsCellId} />;
});
