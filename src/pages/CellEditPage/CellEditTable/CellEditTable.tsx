import { useState } from "react";
import AdminTable from "../../../comps/AdminTable";
import { AdminTableControls } from "../../../comps/AdminTableControls";
import type { Cell, Spreadsheet } from "../../../types";
import { MOCK_SPREADSHEET } from "./mocks";

const baseSpreadshit: Spreadsheet = MOCK_SPREADSHEET;

export const CellEditTable = () => {
  const [table, setTable] = useState<Spreadsheet>(baseSpreadshit);

  const onAddRow = () => {};
  const setCurrTable = () => {};
  const onSelectCell = (data: Cell) => {};

  return (
    <div>
      <AdminTableControls
        onTimelineAdd={() => {}}
        onAddRow={() => {
          onAddRow();
        }}
        onAddColumn={() => {}}
        current={table.rows}
      />

      <AdminTable
        widthPx={1544}
        onSelectCell={(data) => onSelectCell(data)}
        onEdit={(editedTable) => {
          setCurrTable(editedTable);
        }}
        content={table.rows}
      />
    </div>
  );
};
