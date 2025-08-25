import { useState } from "react";
import AdminTable from "../../comps/AdminTable/AdminTable";
import { AdminTableControls } from "../../comps/AdminTableControls";

export const TablePage = () => {
  const [currTable, setCurrTable] = useState();


  

  if (!currTable) return null;

  return (
    <div>
      <AdminTableControls
        onAddRow={() => {}}
        onAddColumn={() => {}}
        current={currTable}
      />

      <AdminTable
        onSelectCell={(data) => {}}
        onEdit={(editedTable) => {
          //   setCurrTable(editedTable);
        }}
        content={currTable}
      />
    </div>
  );
};
