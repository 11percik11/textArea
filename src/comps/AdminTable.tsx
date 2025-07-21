import dragIcon from "../assets/icons/dragIcon.svg";
import deleteIcon from "../assets/icons/deleteIcon.svg";
import type { Cell, Table } from "../types";
import AdminCell from "./AdminCell";
import { ReactSortable } from "react-sortablejs";
import { useEffect, useRef, useState } from "react";

type Props = {
  content: Table["rows"];
  onEdit: (table: Table["rows"]) => void;
};

const AdminTable = ({ content, onEdit }: Props) => {
  const [changableRows, setChangableRows] = useState(content);
  const [changableTitles, setChangableTitles] = useState(content[0].content);
  const finishedTable = useRef(content);
  useEffect(() => {
    setChangableRows(content);
    setChangableTitles(content[0].content);
    finishedTable.current = content;
  }, [content]);

  useEffect(() => {
    onEdit(finishedTable.current);
  }, [finishedTable]);

  const makeMagic = (firstRowNewContent: Cell[]) => {
    const resultData: Table["rows"] = JSON.parse(
      JSON.stringify(finishedTable.current),
    );

    // Установка нового порядка первой строки
    resultData[0].content = firstRowNewContent;

    // Определение схемы переупорядочивания
    const reorderMapping: Record<number, number> = {};
    finishedTable.current[0].content.forEach((item, oldIndex) => {
      const newItem = firstRowNewContent.find(
        (newItem) => newItem.id === item.id,
      );
      if (!newItem) throw new Error("ID not found in the new order" + item.id);
      reorderMapping[oldIndex] = firstRowNewContent.indexOf(newItem);
    });

    // Применение перестроения к остальным строкам
    for (let j = 1; j < resultData.length; j++) {
      const currentRow = resultData[j].content.slice(); // Копия текущего ряда
      const rearrangedCells: Cell[] = new Array(currentRow.length);

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
      resultData[j].content = rearrangedCells.filter((cell) => cell != null);
    }
    finishedTable.current = resultData;
    setChangableTitles(firstRowNewContent);
    setChangableRows(resultData);
  };

  const updateRows = (table: Table["rows"]) => {
    setChangableRows(table);
    setChangableTitles(table[0].content);
    finishedTable.current = table;
  };
  return (
    <div className="w-[1856px] h-[720px] bg-white rounded-[24px] border-[1px] border-stroke overflow-auto">
      <div className="h-[40px] pl-[40px] flex">
        <div className="min-w-[232px] h-[40px] bg-[#0000000D] border-[1px] border-stroke" />
        <ReactSortable
          className="flex"
          handle=".dragHandleVert"
          list={changableTitles}
          setList={makeMagic}
          animation={200}
          easing="ease-out"
          direction={"horizontal"}
          fallbackTolerance={5}
        >
          {changableTitles.map((col) => (
            <div
              key={col.id}
              className="dragHandleVert bg-[#F6F6F6] px-[8px] min-w-[424px] h-[40px] border-[1px] border-stroke flex justify-between items-center"
            >
              <img src={dragIcon} alt="" className=" size-[24px]" />
              <img src={deleteIcon} alt="" className="size-[24px]" />
            </div>
          ))}
        </ReactSortable>
      </div>
      <div className="w-full h-full">
        <ReactSortable
          list={changableRows}
          setList={updateRows}
          animation={200}
          easing="ease-out"
          direction={"vertical"}
          handle=".dragHandle"
          fallbackTolerance={5}
        >
          {changableRows.map((row) => (
            <div
              style={{ backgroundColor: row.color }}
              key={row.id}
              className={`flex h-[152px]`}
            >
              <div className="dragHandle min-w-[40px] h-[152px] bg-[#F6F6F6] border-[1px] border-stroke">
                <img
                  src={dragIcon}
                  alt=""
                  className="size-[24px] mx-auto mt-[8px]"
                />
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
              {row.content.map((cell, colIndex) => (
                <AdminCell color={row.color} key={colIndex} data={cell} />
              ))}
            </div>
          ))}
        </ReactSortable>
      </div>
    </div>
  );
};

export default AdminTable;
