import { observable } from "mobx";
import type { SpreadsheetRowEntity } from "../../../store/SpreadsheetRowEntity";
import { SortableList } from "../../modals/SortableList";
import { RowColorPicker } from "../RowColorPicker/RowColorPicker";
import EditableText from "../../EditableText/EditableText";
import AdminCell from "../../AdminCell/AdminCell";
import deleteIcon from "../../../assets/icons/deleteIcon.svg";
import { observer } from "mobx-react-lite";

type Props = {
  row: SpreadsheetRowEntity;
  onCellClick: (cellId: number) => void;
  onRowDelete: (sequence: number) => Promise<void>;
  setCurrentRow: (row: SpreadsheetRowEntity) => void;
};
export const AdminTableRow = observer(
  ({ row, onCellClick, onRowDelete, setCurrentRow }: Props) => {
    const loadingState = row.loading;
    return (
      <div
        style={{
          backgroundColor: row.color,
        }}
        key={row.sequence}
        className={`flex items-stretch`}
      >
        <div className="dragHandle relative min-w-[40px] min-h-[152px] bg-[#F6F6F6] border-[1px] border-stroke p-[7px]">
          <SortableList.DragHandle />
          <RowColorPicker
            row={row}
            onClick={() => setCurrentRow(row)}
            isLoading={loadingState.isColorLoading}
          />
          <button
            className="absolute bottom-[0] left-[0] w-[30px] h-[30px] z-[10]"
            onClick={() => onRowDelete(row.sequence)}
          >
            <img src={deleteIcon} alt="" className="size-[24px]" />
          </button>
        </div>
        <div className="p-[8px] flex items-center justify-center text-wrap border-[1px] border-stroke w-[232px] min-h-[152px] bg-[#0000000D] text-text text-[20px] font-bold ">
          <EditableText
            isLoading={loadingState.isTitleLoading}
            value={row.title}
            onFinish={row.updateTitle}
          />
        </div>
        {row.cells?.map((cell, colIndex: number) => (
          <AdminCell
            color={row.color || "#FFFFFF"}
            key={colIndex}
            data={cell}
            onClick={onCellClick}
          />
        ))}
      </div>
    );
  },
);
