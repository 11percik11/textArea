import UserTableCell from "./UserTableCell/UserTableCell";
import type { SpreadsheetEntity } from "../../store/SpreadsheetEntity";
import type { SpreadsheetCellEntity } from "../../store/SpreadsheetCellEntity";

type Props = {
  content: SpreadsheetEntity | null;
  onCellInfoOpen: (cell: SpreadsheetCellEntity) => void;
};

const UserTable = ({ onCellInfoOpen, content }: Props) => {
  return (
    <div className="w-[1856px] border-[2px] border-stroke rounded-[24px] overflow-auto">
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
              className={`border-[1px] border-stroke p-[24px] w-[406px] flex justify-center items-center`}
            >
              {!!cell && (
                <UserTableCell
                  isTimeline={row.isTimeline}
                  onOpen={(openedCell) => onCellInfoOpen(openedCell)}
                  data={cell}
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
