import { useState } from "react";
import PahtLinkWhiteSvg from "../../../../../assets/icons/PahtLinkWhite.svg";
import PahtLinkSvg from "../../../../../assets/icons/PathLink.svg";

export type TitleWithPos = [string, [number, number], string, any];

interface SelectProps {
  name: string;
  arrMap: TitleWithPos[];
  columnIndex: number;
  onPick: (colIndex: number, pos: [number, number], type?: string, idTable?: any) => void;
}

export const Select = ({ name, arrMap, columnIndex, onPick }: SelectProps) => {
  const [openSelect, setOpenSelect] = useState(false);
  const [activeElement, setActiveElement] = useState(0);

  console.log("arrMapa", arrMap);
  

  const handleClickElement = (index: number, pos: [number, number], type?: string, idTable?: any) => {
    setActiveElement(index);
    onPick(columnIndex, pos, type, idTable);
    setOpenSelect(false);
  };

  return (
    <div tabIndex={1} onBlur={() => setOpenSelect(false)} className="relative flex">
      <div className={`p-[12px] max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap ${
        openSelect ? "rounded-l-[12px] bg-[#00466280] text-[#FFFFFF]" : ""
      }`}>
        {name}
      </div>

      <div className={`p-[6px] ${openSelect ? "rounded-r-[12px] bg-[#004662]" : ""}`}>
        <img
          onClick={() => setOpenSelect(!openSelect)}
          className={`transition-transform ${openSelect ? "rotate-0" : ""}`}
          src={!openSelect ? PahtLinkSvg : PahtLinkWhiteSvg}
          alt=""
        />
      </div>

      {openSelect && (
        <div className="flex flex-col bg-[#FFFFFFCC] rounded-[24px] p-[12px] min-w-[296px] max-h-[420px] absolute right-[-260px] top-[65px] overflow-auto">
          {arrMap.map(([title, pos, type, idTable], index) => (
            <div
              key={`${title}-${index}`}
              onMouseDown={() => handleClickElement(index, pos, type, idTable)}
              className={`p-[12px] rounded-[12px] cursor-pointer transition ${
                index === activeElement
                  ? "bg-[#004662] text-[#FFFFFF]"
                  : "hover:bg-[#0046627e] hover:text-[#FFFFFF]"
              }`}
            >
              {title || "Нет названия"}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
