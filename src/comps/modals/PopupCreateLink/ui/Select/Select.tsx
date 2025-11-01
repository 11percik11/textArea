// import { useState } from "react";
// // import PahtSvg from "../../../../../assets/icons/Path.svg";
// // import PathWhiteSvg from "../../../../../assets/icons/PathWhite.svg";
// import PahtLinkWhiteSvg from "../../../../../assets/icons/PahtLinkWhite.svg";
// import PahtLinkSvg from "../../../../../assets/icons/PathLink.svg";
// import { useLocation, useNavigate } from "react-router-dom";


// type TitleWithPos = [string, [number, number]];
// interface SelectProps {
//   name: string;
//   arrMap: TitleWithPos[];
// }

// export const Select = ({ name, arrMap }: SelectProps) => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [openSelect, setOpenSelect] = useState(false);
//   const [activeElement, setActiveElement] = useState(0);

//   // const handleClickElement = (index: number, IndexNumber) => {
//   //   setActiveElement(index)
//   //   navigate( `${location.pathname}${location.search}&rowIndex=${IndexNumber[0]}&cellIndex=${IndexNumber[1]}`)
//   // }

//   const handleClickElement = (index: number, pos: [number, number]) => {
//   setActiveElement(index);
//   const [rowIndex, cellIndex] = pos;

//   // безопасно обновляем query-параметры
//   const params = new URLSearchParams(location.search);
//   params.set("rowIndex", String(rowIndex));
//   params.set("cellIndex", String(cellIndex));

//   navigate({
//     pathname: location.pathname,
//     search: `?${params.toString()}`,
//   },{ replace: true });
// };

//   return (
//     <div
//       tabIndex={1}
//       onBlur={() => setOpenSelect(false)}
//       className="relative flex"
//     >
//       <div
//         className={`p-[12px] max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap ${
//           openSelect ? "rounded-l-[12px] bg-[#00466280] text-[#FFFFFF]" : ""
//         }`}
//       >
//         {name}
//       </div>

//       <div
//         className={`p-[6px] ${openSelect ? "rounded-r-[12px] bg-[#004662]" : ""}`}
//       >
//         <img
//           onClick={() => setOpenSelect(!openSelect)}
//           className={`transition-transform ${openSelect ? "rotate-0" : ""}`}
//           src={!openSelect ? PahtLinkSvg : PahtLinkWhiteSvg}
//           alt=""
//         />
//       </div>

//       {openSelect && (
//         <div className="flex flex-col bg-[#FFFFFFCC] rounded-[24px] p-[12px] min-w-[296px] max-h-[420px] absolute right-[-260px] top-[65px] overflow-auto">
//           {arrMap.map(([title, pos], index) => (
//             <div
//               key={index}
//               onClick={() => handleClickElement(index, pos)}
//               className={`p-[12px] rounded-[12px] cursor-pointer transition 
//                   ${
//                     index === activeElement
//                       ? "bg-[#004662] text-[#FFFFFF]"
//                       : "hover:bg-[#0046627e] hover:text-[#FFFFFF]"
//                   }`}
//             >
//               {title}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };



// Select.tsx
import { useState } from "react";
import PahtLinkWhiteSvg from "../../../../../assets/icons/PahtLinkWhite.svg";
import PahtLinkSvg from "../../../../../assets/icons/PathLink.svg";

export type TitleWithPos = [string, [number, number]];

interface SelectProps {
  name: string;
  arrMap: TitleWithPos[];
  columnIndex: number;
  onPick: (colIndex: number, pos: [number, number]) => void;
}

export const Select = ({ name, arrMap, columnIndex, onPick }: SelectProps) => {
  const [openSelect, setOpenSelect] = useState(false);
  const [activeElement, setActiveElement] = useState(0);

  const handleClickElement = (index: number, pos: [number, number]) => {
    setActiveElement(index);
    onPick(columnIndex, pos);
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
          {arrMap.map(([title, pos], index) => (
            <div
              key={`${title}-${index}`}
              onMouseDown={() => handleClickElement(index, pos)}
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
