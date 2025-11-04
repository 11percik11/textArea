import UserTableCell from "./UserTableCell/UserTableCell";
import type { SpreadsheetEntity } from "../../store/SpreadsheetEntity";
import type { SpreadsheetCellEntity } from "../../store/SpreadsheetCellEntity";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

type Props = {
  content: SpreadsheetEntity | null;
  onCellInfoOpen: (cell: SpreadsheetCellEntity) => void;
};

const UserTable = ({ onCellInfoOpen, content }: Props) => {
  const [params] = useSearchParams();
  const rowIndex = params.get("rowIndex");
  const cellIndex = params.get("cellIndex");

  useEffect(() => {
    if (!content) return; // ждём загрузку
    if (rowIndex == null || cellIndex == null) return;

    const row = content.rows[Number(rowIndex)];
    const cell = row?.cells?.[Number(cellIndex)];

    if (cell) onCellInfoOpen(cell);
  }, [content, rowIndex, cellIndex, onCellInfoOpen]);

  return (
    <div className="border-[2px] h-[100%] border-stroke rounded-[24px] overflow-auto">
      {content?.rows.map((row, index: number) => (
        <div
          key={index}
          style={{ backgroundColor: row.color }}
          className={`flex`}
        >
          <div
            style={{ backgroundColor: row.isTimeline ? "#C7DEE6" : row.color }}
            className={`justify-center items-center flex bg-[#0000001A] border-[1px] border-stroke min-w-[232px] max-w-[232px] px-[24px] py-[40px] text-[20px] text-text font-bold leading-[100%] text-center`}
          >
            {row.title}
          </div>
          {row.cells.map((cell, cellIndex: number) => (
            <div
              style={{
                backgroundColor: row.isTimeline ? "#C7DEE6" : row.color,
              }}
              key={cellIndex}
              className={`border-[1px] border-stroke p-[18px] w-[406px] flex justify-center items-center`}
            >
              {!!cell && (
                <UserTableCell
                  ссindex={index}
                  cellIndex={cellIndex}
                  isTimeline={row.isTimeline}
                  onOpen={(openedCell) => onCellInfoOpen(openedCell)}
                  data={cell}
                  color={row.color}
                />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default UserTable;
