import AdminTable from "../../../comps/AdminTable/AdminTable";
import { AdminTableControls } from "../../../comps/AdminTable/AdminTableControls";

import { observer } from "mobx-react-lite";
import { spreadsheetManager } from "../../../store/root";
import { SpreadsheetEntity } from "../../../store/SpreadsheetEntity";
import { SpreadsheetCellEntity } from "../../../store/SpreadsheetCellEntity";

// const baseSpreadshit: Spreadsheet = MOCK_SPREADSHEET;

type Props = {
  data: SpreadsheetCellEntity | SpreadsheetEntity;
};

export const CellEditTable = observer(({ data }: Props) => {
  const getTable = () => {
    let table: SpreadsheetEntity | undefined;

    if (data instanceof SpreadsheetCellEntity) {
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
          onEdit={() => { } }
          spreadsheet={table} ref={undefined}        />
      </div>
    )
  );
});
