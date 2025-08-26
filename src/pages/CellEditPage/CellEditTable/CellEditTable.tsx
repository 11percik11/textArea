import { useEffect, useLayoutEffect, useState } from "react";
import AdminTable from "../../../comps/AdminTable/AdminTable";
import { AdminTableControls } from "../../../comps/AdminTableControls";
import type { Cell, Spreadsheet } from "../../../types";
import { MOCK_SPREADSHEET } from "./mocks";
import { useNavigate } from "react-router-dom";
import { tableStore } from "../../AdminPage/SpreadsheetStore";
import { observer } from "mobx-react-lite";
import { cellStore, spreadsheetManager } from "../../../store/root";
import {
  getOneSpreadsheet,
  removeSpreadsheetContent,
} from "../../../api/spreadsheet";
import type { SpreadsheetStore } from "../../../store/SpreadsheetStore";
import { SpreadsheetEntity } from "../../../store/SpreadsheetEntity";
import { CellEntity } from "../../../store/CellEntity";

// const baseSpreadshit: Spreadsheet = MOCK_SPREADSHEET;

type Props = {
  data: CellEntity | SpreadsheetEntity;
};

export const CellEditTable = observer(({ data }: Props) => {
  const getTable = () => {
    let table: SpreadsheetEntity | undefined;

    if (data instanceof CellEntity) {
      table = spreadsheetManager.spreadsheets.find(
        (spreadsheet) => spreadsheet.id === data.spreadsheetParentId,
      );
    }

    if (data instanceof SpreadsheetEntity) {
      table = data;
    }

    return table;
  };

  const table = getTable();
  return (
    table && (
      <div>
        <AdminTableControls
          spreadsheet={table}
          onTimelineAdd={table.addSpreadsheetTimelineHandler}
        />

        <AdminTable
          widthPx={1544}
          onEdit={(editedTable) => {}}
          spreadsheet={table}
        />
      </div>
    )
  );
});
