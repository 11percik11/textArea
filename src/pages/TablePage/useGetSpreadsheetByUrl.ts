import { useSearchParams } from "react-router-dom";
import { spreadsheetManager } from "../../store/root";

export const useGetSpreadsheetByUrl = () => {
  const [searchParams] = useSearchParams();
  const searchParamsSpreadsheetId = Number(searchParams.get("id"));

  const getSpreadsheetLocal = () => {
    const spreadsheet = spreadsheetManager.spreadsheets.find(
      (s) => s.id === searchParamsSpreadsheetId,
    );
    if (!spreadsheet) return null;
    return spreadsheet;
  };

  const data = getSpreadsheetLocal();

  return {
    data,
    searchParamsSpreadsheetId,
  };
};
