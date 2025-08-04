import { useEffect, useState } from "react";
import type { Cell, Spreadsheet } from "../types";
import MainCell from "./MainCell";

type Props = {
  content: Spreadsheet | null;
  onCellInfoOpen: (cell: Cell) => void;
};

const MainTable = ({ onCellInfoOpen, content }: Props) => {
  const testTitles = [
    "",
    "Происхождение горных пород из окрестности Афимьина",
    "Расположение окрестности Афимьина во времена образования горных пород",
    "Лента времени (лет назад)",
  ];
  return (
    <div className="w-[1856px] border-[2px] border-stroke rounded-[24px] overflow-auto">
      {content?.rows.map((row, index: number) => (
        <div
          key={index}
          style={{ backgroundColor: row.color }}
          className={`flex`}
        >
          <div
            className={`bg-[#0000001A] border-[1px] border-stroke min-w-[232px] max-w-[232px] px-[24px] py-[40px] text-[20px] text-text font-bold leading-[100%] text-center`}
          >
            {testTitles[index]}
          </div>
          {row.cells.map((cell: Cell, cellIndex: number) => (
            <div
              style={{ backgroundColor: row.color }}
              key={cellIndex}
              className={`border-[1px] border-stroke p-[24px] w-[406px] flex justify-center items-center`}
            >
              {!!cell && (
                <MainCell onOpen={(openedCell) => onCellInfoOpen(openedCell)} data={cell} />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MainTable;
