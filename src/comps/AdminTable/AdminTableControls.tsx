//import type { Spreadsheet } from "../../types";
import arrIcon from "../../assets/icons/grayArrIcon.svg";
import addIcon from "../../assets/icons/addIcon.svg";
import type { SpreadsheetEntity } from "../../store/SpreadsheetEntity";
import { observer } from "mobx-react-lite";

type Props = {
  onTimelineAdd?: () => void;
  spreadsheet: SpreadsheetEntity;
};

export const AdminTableControls = observer(
  ({ spreadsheet }: Props) => {
    // const timelineButtonShow = !spreadsheet.rows.some((row) => row.isTimeline);
    return (
      <div className="flex w-full h-[88px] my-[16px] gap-[16px]">
        <button
          onClick={() => {
            spreadsheet.addSpreadsheetContentHandler(false);
          }}
          className="w-[218px] h-[88px] bg-white rounded-[24px] px-[24px] py-[16px] flex gap-[16px]"
        >
          <div className="w-[98px] h-[56px] text-[16px] text-accent font-bold text-left">
            Колонки
            <div className="mt-[8px] gap-[8px] w-[59px] h-[32px] text-[32px] text-[#C9C9C9] font-bold flex justify-left items-center">
              {spreadsheet.columnsAndRows.columns}
              <img src={arrIcon} alt="cols" className="size-[32px] rotate-270" />
            </div>
          </div>
          <div className="size-[56px] bg-accent rounded-[16px] p-[12px]">
            <img src={addIcon} alt="add" className="" />
          </div>
        </button>
        <button
          onClick={() => {
            spreadsheet.addSpreadsheetContentHandler(true);
          }}
          className="w-[218px] h-[88px] bg-white rounded-[24px] px-[24px] py-[16px] flex gap-[16px]"
        >
          <div className="w-[98px] h-[56px] text-[16px] text-accent font-bold text-left">
            Строки
            <div className="mt-[8px] gap-[8px] w-[59px] h-[32px] text-[32px] text-[#C9C9C9] font-bold flex justify-left items-center">
              {spreadsheet.columnsAndRows.rows}
              <img
                src={arrIcon}
                alt="rows"
                className="size-[32px]"
              />
            </div>
          </div>
          <div className="size-[56px] bg-accent rounded-[16px] p-[12px]">
            <img src={addIcon} alt="add" className="" />
          </div>
        </button>
      </div>
    );
  },
);
