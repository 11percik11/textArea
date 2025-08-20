import type { Spreadsheet } from "../types";
import arrIcon from "../assets/icons/grayArrIcon.svg";
import addIcon from "../assets/icons/addIcon.svg";

type Props = {
  current: { columns: number; rows: number };
  addContent: (isRow: boolean) => void;
  onTimelineAdd?: () => void;
};

export const AdminTableControls = ({
  current,
  addContent,
  onTimelineAdd,
}: Props) => {
  return (
    <div className="flex w-full h-[88px] my-[16px] gap-[16px]">
      <button
        onClick={() => {
          addContent(false);
        }}
        className="w-[218px] h-[88px] bg-white rounded-[24px] px-[24px] py-[16px] flex gap-[16px]"
      >
        <div className="w-[98px] h-[56px] text-[16px] text-accent font-bold text-left">
          Колонки
          <div className="mt-[8px] gap-[8px] w-[59px] h-[32px] text-[32px] text-[#C9C9C9] font-bold flex justify-left items-center">
            {current.columns}
            <img src={arrIcon} alt="cols" className="size-[32px]" />
          </div>
        </div>
        <div className="size-[56px] bg-accent rounded-[16px] p-[12px]">
          <img src={addIcon} alt="add" className="" />
        </div>
      </button>
      <button
        onClick={() => {
          addContent(true);
        }}
        className="w-[218px] h-[88px] bg-white rounded-[24px] px-[24px] py-[16px] flex gap-[16px]"
      >
        <div className="w-[98px] h-[56px] text-[16px] text-accent font-bold text-left">
          Строки
          <div className="mt-[8px] gap-[8px] w-[59px] h-[32px] text-[32px] text-[#C9C9C9] font-bold flex justify-left items-center">
            {current.rows}
            <img src={arrIcon} alt="rows" className="size-[32px] rotate-270" />
          </div>
        </div>
        <div className="size-[56px] bg-accent rounded-[16px] p-[12px]">
          <img src={addIcon} alt="add" className="" />
        </div>
      </button>
      {onTimelineAdd && (
        <button
          onClick={() => {
            onTimelineAdd();
          }}
          className="w-[374px] h-[88px] bg-white rounded-[24px] px-[24px] py-[16px] flex items-center justify-center gap-[16px]"
        >
          <div className="flex gap-[11px]">
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 10.9993C16 10.4471 15.5523 9.99935 15 9.99935C14.4477 9.99935 14 10.4471 14 10.9993L14 13.9994H11C10.4477 13.9994 10 14.4471 10 14.9994C10 15.5517 10.4477 15.9994 11 15.9994H14V18.9993C14 19.5516 14.4477 19.9993 15 19.9993C15.5523 19.9993 16 19.5516 16 18.9993L16 15.9994H19C19.5523 15.9994 20 15.5517 20 14.9994C20 14.4471 19.5523 13.9994 19 13.9994H16V10.9993Z"
                fill="#004662"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M15 0.666016C7.08394 0.666016 0.666687 7.08327 0.666687 14.9993C0.666687 22.9154 7.08394 29.3327 15 29.3327C22.9161 29.3327 29.3334 22.9154 29.3334 14.9993C29.3334 7.08327 22.9161 0.666016 15 0.666016ZM2.66669 14.9993C2.66669 8.18784 8.18851 2.66602 15 2.66602C21.8115 2.66602 27.3334 8.18784 27.3334 14.9993C27.3334 21.8109 21.8115 27.3327 15 27.3327C8.18851 27.3327 2.66669 21.8109 2.66669 14.9993Z"
                fill="#004662"
              />
            </svg>{" "}
            <div className="text-[24px] text-accent font-semibold text-center">
              Временная линия
            </div>
          </div>
        </button>
      )}
    </div>
  );
};
