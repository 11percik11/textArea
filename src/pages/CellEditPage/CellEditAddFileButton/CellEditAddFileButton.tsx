import React, { type ChangeEvent } from "react";
import addIcon from "../../../assets/icons/addIcon.svg";

interface CellEditAddFileButtonProps {
  onFileLoad: (event: ChangeEvent<HTMLInputElement>) => void;
  accept: string;
}

const CellEditAddFileButton: React.FC<CellEditAddFileButtonProps> = ({
  onFileLoad,
  accept,
}) => {
  return (
    <button className="disabled:opacity-[20%] mt-[8px] w-[264px] h-[56px] rounded-[12px] bg-accent text-[20px] text-white font-semibold flex gap-[12px] items-center justify-center relative">
      <input
        accept={accept}
        hidden={false}
        id="imgInput"
        type="file"
        className="w-full h-full absolute opacity-0"
        onChange={onFileLoad}
      />
      <img src={addIcon} alt="add" className="size-[32px]" />
      Добавить
    </button>
  );
};

export default CellEditAddFileButton;
