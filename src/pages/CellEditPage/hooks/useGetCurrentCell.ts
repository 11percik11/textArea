import { useSearchParams } from "react-router-dom";

import { spreadsheetManager } from "../../../store/root";

export const useGetCurrentCell = () => {
  const [searchParams] = useSearchParams();
  const searchParamsCellId = Number(searchParams.get("id"));
  const searchParamsSpreadsheetId = Number(searchParams.get("spreadsheetId"));

  const getCell = () => {
    const spreadsheet = spreadsheetManager.spreadsheets.find(
      (s) => s.id === searchParamsSpreadsheetId,
    );
    if (!spreadsheet) return null;

    for (const row of spreadsheet.rows) {
      const cell = row.cells.find((c) => c.id === searchParamsCellId);
      if (cell) return cell;
    }

    return null;
  };

  const data = getCell();

  return {
    data,
    searchParamsCellId,
  };
};
