import dragIcon from "../assets/icons/dragIcon.svg";
import deleteIcon from "../assets/icons/deleteIcon.svg";
import type { Cell, Spreadsheet } from "../types";
import { ReactSortable } from "react-sortablejs";
import { useEffect, useRef, useState } from "react";
import { SortableList } from "./modals/SortableList";
import AdminCell from "./AdminCell/AdminCell";
import { moveSpreadsheetContentPositions } from "../api/spreadsheet";

type Props = {
  spreadsheetId: number;
  content: Spreadsheet["rows"];
  onEdit: (table: Spreadsheet["rows"]) => void;
  onSelectCell: (data: Cell) => void;
  widthPx?: number;
};

const AdminTable = ({
  spreadsheetId,
  content,
  onEdit,
  onSelectCell,
  widthPx = 1856,
}: Props) => {
  const [changableRows, setChangableRows] = useState(content);
  const [test, setTest] = useState(true);
  const [changableTitles, setChangableTitles] = useState(content[0]?.cells);
  const finishedTable = useRef(content);

  useEffect(() => {
    setChangableRows(content);
    setChangableTitles(content[0]?.cells || undefined);
  }, [content]);

  useEffect(() => {
    onEdit(finishedTable.current);
  }, [finishedTable.current]);

  setChangableRows;

  const updateRows = (
    table: Spreadsheet["rows"],
    activeIndex: number,
    overIndex: number,
  ) => {
    moveSpreadsheetContentPositions({
      first: activeIndex,
      second: overIndex,
      isRow: true,
      spreadsheetId,
    });
    console.log("update rows", activeIndex, overIndex);
    setChangableRows(table);
    setChangableTitles(table[0]?.cells || undefined);

    // finishedTable.current = table;
  };

  const updateColumns = (newlyArrangedContent: Cell) => {
    console.log("update cols");
    return;
    const newTitleCells: Spreadsheet["rows"] = JSON.parse(
      JSON.stringify(newlyArrangedContent),
    );
    console.log("header", newTitleCells);
    console.log(
      "rows",
      changableRows.map((row) => row.cells),
    );

    // const newRowsCells = {}

    setChangableTitles(newTitleCells);
    // setChangableRows(newRowsCells)
    // finishedTable.current = resultData;
  };

  return (
    <div
      className={`w-[${widthPx}px] h-[720px] bg-white rounded-[24px] border-[1px] border-stroke overflow-auto`}
    >
      <div className="h-[40px] pl-[40px] flex">
        <div className="min-w-[232px] h-[40px] bg-[#0000000D] border-[1px] border-stroke" />
        {changableTitles != undefined && test && (
          <SortableList
            className="flex"
            items={changableTitles}
            onChange={updateColumns}
            renderItem={(item) => (
              <SortableList.Item id={item.id}>
                <div className="dragHandleVert bg-[#F6F6F6] px-[8px] w-[426px] h-[40px] border-[1px] border-stroke flex justify-between items-center">
                  <SortableList.DragHandle />
                  <img src={deleteIcon} alt="" className="size-[24px]" />
                  <div style={{ color: "red" }}>{item.sequence}</div>
                </div>
              </SortableList.Item>
            )}
          />
        )}
      </div>
      {test && (
        <div className="w-full h-full">
          <SortableList
            className=""
            items={changableRows}
            onChange={updateRows}
            renderItem={(row: any) => (
              <SortableList.Item id={row.id}>
                <div
                  style={{ backgroundColor: row.color }}
                  key={row.sequence}
                  className={`flex h-[152px]`}
                >
                  <div className="dragHandle min-w-[40px] h-[152px] bg-[#F6F6F6] border-[1px] border-stroke p-[7px]">
                    <SortableList.DragHandle />
                    <div
                      className={`size-[20px] mt-[32px] mx-auto outline-[1px] rounded-[4px] bg-table-yellow outline-offset-[1px] outline-accent`}
                    />
                    <img
                      src={deleteIcon}
                      alt=""
                      className="size-[24px] mx-auto mt-[32px]"
                    />
                  </div>
                  <div className="p-[8px] text-wrap border-[1px] border-stroke w-[232px] h-[152px] bg-[#0000000D] text-text text-[20px] font-bold ">
                    {row.title} + {row.color}
                  </div>
                  {row.cells?.map((cell: Cell, colIndex: number) => (
                    <AdminCell
                      onSelectCell={(data) => onSelectCell(data)}
                      color={row.color || "#FFFFFF"}
                      key={colIndex}
                      data={cell}
                    />
                  ))}
                </div>
              </SortableList.Item>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default AdminTable;
