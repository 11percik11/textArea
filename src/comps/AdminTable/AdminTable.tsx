import deleteIcon from "../../assets/icons/deleteIcon.svg";
import type { Spreadsheet } from "../../types";
import { useState } from "react";
import { SortableList } from "../modals/SortableList";
import AdminCell from "../AdminCell/AdminCell";
import { observer } from "mobx-react-lite";
import OverlayLoader from "../OverlayLoader/OverlayLoader";
import type { SpreadsheetEntity } from "../../store/SpreadsheetEntity";
import { useNavigate } from "react-router-dom";
import EditableText from "../EditableText/EditableText";
import { RowColorPicker } from "./RowColorPicker/RowColorPicker";
import { AdminTableRow } from "./AdminTableRow/AdminTableRow";
import type { SpreadsheetRowEntity } from "../../store/SpreadsheetRowEntity";
import ColorPickModal from "../modals/ColorPickModal/ColorPickModal";

type Props = {
  spreadsheet: SpreadsheetEntity;
  onEdit: (table: Spreadsheet["rows"]) => void;
  // onSelectCell: (data: Cell) => void;
  widthPx?: number;
};

const AdminTable = observer(
  ({ spreadsheet, onEdit, widthPx = 1856 }: Props) => {
    const content = spreadsheet.rows;
    // const [changableRows, setChangableRows] = useState(content);

    // const [changableTitles, setChangableTitles] = useState(content[0]?.cells);

    const navigate = useNavigate();
    const onCellClick = (cellId: number) => {
      navigate(`/celledit?id=${cellId}&spreadsheetId=${spreadsheet.id}`);
    };

    // useEffect(() => {
    //   setChangableRows(content);
    //   setChangableTitles(content[0]?.cells || undefined);
    // }, [spreadsheet, content]);

    // useEffect(() => {
    //   onEdit(finishedTable.current);
    // }, [finishedTable.current]);

    const updateRows = async (
      table: Spreadsheet["rows"],
      activeIndex: number,
      overIndex: number,
    ) => {
      const firstSequence = activeIndex + 1;
      const secondsSequence = overIndex + 1;
      await spreadsheet.updateSpreadsheetRows(firstSequence, secondsSequence);
    };

    const updateColumns = async (
      table: Spreadsheet["rows"],
      activeIndex: number,
      overIndex: number,
    ) => {
      const firstSequence = activeIndex + 1;
      const secondsSequence = overIndex + 1;
      await spreadsheet.updateSpreadsheetColumns(
        firstSequence,
        secondsSequence,
      );
    };

    const onRowDelete = async (sequence: number) => {
      await spreadsheet.removeSpreadsheetContentHandler(true, sequence);
    };

    const onColumnDelete = async (sequence: number) => {
      await spreadsheet.removeSpreadsheetContentHandler(false, sequence);
    };

    const [currentRow, setCurrentRow] = useState<SpreadsheetRowEntity | null>(
      null,
    );

    const onColorPickModalClose = () => setCurrentRow(null);

    const rowsWithoutTimeline = spreadsheet.rows.filter(
      (row) => !row.isTimeline,
    );

    const timelineRow = spreadsheet.rows.find((row) => row.isTimeline);

    return (
      <div
        className={`w-[${widthPx}px] h-[720px] bg-white rounded-[24px] border-[1px] border-stroke overflow-auto`}
      >
        <ColorPickModal row={currentRow} onClose={onColorPickModalClose} />
        <OverlayLoader isLoading={spreadsheet.isLoading} />
        <div className="h-[40px] pl-[40px] flex">
          <div className="min-w-[232px] h-[40px] bg-[#0000000D] border-[1px] border-stroke" />
          {
            <SortableList
              className="flex"
              items={spreadsheet.rows[0].cells}
              onChange={updateColumns}
              renderItem={(item) => (
                <div>
                  <SortableList.Item id={item.id}>
                    <div className="dragHandleVert relative bg-[#F6F6F6] px-[8px] w-[424px] h-[40px] border-[1px] border-stroke flex justify-between items-center">
                      <SortableList.DragHandle />
                      <button
                        className="w-[30px] h-[30px] z-[10]"
                        onClick={() => onColumnDelete(item.sequence)}
                      >
                        <img src={deleteIcon} alt="" className="size-[24px]" />
                      </button>
                      {/* <div style={{ color: "red" }}>{item.sequence}</div> */}
                    </div>
                  </SortableList.Item>
                </div>
              )}
            />
          }
        </div>
        {
          <div className="w-full h-full">
            <SortableList
              className=""
              items={rowsWithoutTimeline}
              onChange={updateRows}
              renderItem={(row) => {
                return (
                  <SortableList.Item id={row.id}>
                    <AdminTableRow
                      row={row}
                      onCellClick={onCellClick}
                      onRowDelete={onRowDelete}
                      setCurrentRow={() => setCurrentRow(row)}
                    />
                  </SortableList.Item>
                );
              }}
            />
            {timelineRow && (
              <div
                style={{
                  backgroundColor: timelineRow.color,
                  opacity: 0.3,
                }}
                className={`flex items-stretch`}
              >
                <div className="dragHandle relative min-w-[40px] min-h-[152px] bg-[#F6F6F6] border-[1px] border-stroke p-[7px]">
                  <RowColorPicker
                    row={timelineRow}
                    isLoading={timelineRow.loading.isColorLoading}
                    onClick={() => setCurrentRow(timelineRow)}
                  />
                  <button
                    className="absolute bottom-[0] left-[0] w-[30px] h-[30px] z-[10]"
                    onClick={() => onRowDelete(timelineRow.sequence)}
                  >
                    <img src={deleteIcon} alt="" className="size-[24px]" />
                  </button>
                </div>
                <div className="flex items-center justify-center p-[8px] text-wrap border-[1px] border-stroke w-[232px] min-h-[152px] bg-[#0000000D] text-text text-[20px] font-bold ">
                  <EditableText
                    isLoading={timelineRow.loading.isTitleLoading}
                    value={timelineRow.title}
                    onFinish={timelineRow.updateTitle}
                  />
                </div>
                {timelineRow.cells?.map((cell, colIndex: number) => (
                  <AdminCell
                    color={timelineRow.color || "#FFFFFF"}
                    key={colIndex}
                    data={cell}
                    onClick={onCellClick}
                  />
                ))}
              </div>
            )}
          </div>
        }
      </div>
    );
  },
);

export default AdminTable;
