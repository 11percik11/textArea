import { useSearchParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { observer } from "mobx-react-lite";
import { tableStore } from "../../AdminPage/SpreadsheetStore";
import { toJS } from "mobx";
import { spreadsheetManager } from "../../../store/root";

export const useGetCurrentCell = () => {
  const [searchParams] = useSearchParams();
  const searchParamsCellId = Number(searchParams.get("id"));
  const searchParamsSpreadsheetId = Number(searchParams.get("spreadsheetId"));

  const getCell = () => {
    const eixstSpreadsheet = spreadsheetManager.spreadsheets.find(
      (spreadsheet) => spreadsheet.id === searchParamsSpreadsheetId,
    );
    if (!eixstSpreadsheet) return null;

    return (
      eixstSpreadsheet.cells.find((cell) => cell.id === searchParamsCellId) ||
      null
    );
  };

  const data = getCell();

  return {
    data,
    searchParamsCellId,
  };
};
