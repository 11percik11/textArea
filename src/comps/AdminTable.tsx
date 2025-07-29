import dragIcon from "../assets/icons/dragIcon.svg";
import deleteIcon from "../assets/icons/deleteIcon.svg";
import type { Cell, Spreadsheet } from "../types";
import AdminCell from "./AdminCell";
import { ReactSortable } from "react-sortablejs";
import { useEffect, useRef, useState } from "react";
import { SortableList } from "./modals/SortableList";

type Props = {
  content: Spreadsheet["rows"];
  onEdit: (table: Spreadsheet["rows"]) => void;
  onSelectCell: (data: Cell) => void;
};

const AdminTable = ({ content, onEdit, onSelectCell }: Props) => {
  const [changableRows, setChangableRows] = useState(content);
  const [changableTitles, setChangableTitles] = useState(content[0]?.cells);
  const finishedTable = useRef(content);
  useEffect(() => {
    setChangableRows(content);
    setChangableTitles(content[0]?.cells || undefined);
    finishedTable.current = content;
  }, [content]);

  useEffect(() => {
    onEdit(finishedTable.current);
    console.log(finishedTable.current)
  }, [finishedTable.current]);

  const makeMagic = (firstRowNewContent: any[]) => {
    const resultData: Spreadsheet["rows"] = JSON.parse(
      JSON.stringify(finishedTable.current),
    );

    // Установка нового порядка первой строки
    resultData[0].cells = firstRowNewContent;

    // Определение схемы переупорядочивания
    const reorderMapping: Record<number, number> = {};
    finishedTable.current[0].cells.forEach((item, oldIndex) => {
      const newItem = firstRowNewContent.find(
        (newItem) => newItem.sequence === item.sequence,
      );
      if (!newItem) throw new Error("ID not found in the new order" + item.sequence);
      reorderMapping[oldIndex] = firstRowNewContent.indexOf(newItem);
    });

    // Применение перестроения к остальным строкам
    for (let j = 1; j < resultData.length; j++) {
      const currentRow = resultData[j].cells.slice(); // Копия текущего ряда
      const rearrangedCells: any[] = new Array(currentRow.length);

      // Простановка элементов на новые позиции
      Object.entries(reorderMapping).forEach(([oldIndexStr, newIndex]) => {
        const oldIndex = parseInt(oldIndexStr);
        const cellAtOldPos = currentRow[oldIndex];
        rearrangedCells[newIndex] = cellAtOldPos;
      });

      // Заполняем пропущенные позиции оставшимися элементами
      for (let k = 0; k < currentRow.length; k++) {
        if (!rearrangedCells.includes(currentRow[k])) {
          rearrangedCells.push(currentRow[k]);
        }
      }

      // Замена старого порядка на новый
      resultData[j].cells = rearrangedCells.filter((cell) => cell != null);
    }
    finishedTable.current = resultData;
    setChangableTitles(firstRowNewContent);
    setChangableRows(resultData);
  };

  const updateRows = (table: Spreadsheet["rows"]) => {
    setChangableRows(table);
    setChangableTitles(table[0]?.cells || undefined);
    finishedTable.current = table;
  };
  return (
    <div className="w-[1856px] h-[720px] bg-white rounded-[24px] border-[1px] border-stroke overflow-auto">
      <div className="h-[40px] pl-[40px] flex">
        <div className="min-w-[232px] h-[40px] bg-[#0000000D] border-[1px] border-stroke" />
        {changableTitles!=undefined && 
                <SortableList
                  className="flex"
                  items={changableTitles}
                  onChange={makeMagic}
                  renderItem={(item) => (
                    <SortableList.Item id={item.id}>

                    <div
                    className="dragHandleVert bg-[#F6F6F6] px-[8px] w-[426px] h-[40px] border-[1px] border-stroke flex justify-between items-center"
                  >
                                          <SortableList.DragHandle />
                    <img src={deleteIcon} alt="" className="size-[24px]" />
                  </div>
                    </SortableList.Item>
                  )}
                />
}
      </div>
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
              <div className="border-[1px] border-stroke min-w-[232px] h-[152px] bg-[#0000000D] text-text text-[20px] font-bold ">
                {row.title} + {row.color}
              </div>
              {row.cells?.map((cell: Cell, colIndex: number) => (
                <AdminCell onSelectCell={(data) => onSelectCell(data)} color={row.color || "#FFFFFF"} key={colIndex} data={cell} />
              ))}
            </div>
        </SortableList.Item>
      )}
      />
      </div>
    </div>
  );
};

export default AdminTable;
