// import { useState } from "react";
// import { observer } from "mobx-react-lite";
// import { useLocation, useNavigate } from "react-router-dom"; // ⬅️ добавили

// import { PathlinkStore } from "../../../../../store/PathLink";
// import PahtSvg from "../../../../../assets/icons/Path.svg";
// import PathWhiteSvg from "../../../../../assets/icons/PathWhite.svg";
// import PahtLinkWhiteSvg from "../../../../../assets/icons/PahtLinkWhite.svg";
// import PahtLinkSvg from "../../../../../assets/icons/PathLink.svg";
// import { spreadsheetManager } from "../../../../../store/root";

// export const ArrowSelectLink = observer(() => {
//   const [openSelect, setOpenSelect] = useState(false);
//   const [openSelectTab, setOpenSelectTab] = useState(false);
//   const [activeElement, setActiveElement] = useState(0);
//   const { mainLink } = PathlinkStore.link;

//   const location = useLocation(); // ⬅️
//   const navigate = useNavigate(); // ⬅️

//   const arrLinks: [string, "nature" | "society"][] = [
//     ["Природа", "nature"],
//     ["Социум", "society"],
//   ];

//   const data = spreadsheetManager.currentMainSpreadsheet;
//   const arrgg = data?.rows.flatMap((item) =>
//     item.cells.map((cell) => cell.raw.title),
//   );

//   return (
//     <div className="flex items-center">
//       <div
//         className={`p-[6px] ${openSelect ? "rounded-l-[12px] bg-[#00466280]" : ""}`}
//       >
//         <img src={openSelect ? PathWhiteSvg : PahtSvg} alt="" />
//       </div>
//       <div
//         tabIndex={0}
//         onBlur={() => setOpenSelect(false)}
//         className="relative"
//       >
//         <div
//           className={`p-[6px] ${openSelect ? "rounded-r-[12px] bg-[#004662]" : ""}`}
//         >
//           <img
//             onClick={() => setOpenSelect(!openSelect)}
//             className={`transition-transform ${openSelect ? "rotate-0" : ""}`}
//             src={!openSelect ? PahtLinkSvg : PahtLinkWhiteSvg}
//             alt=""
//           />
//         </div>
//         {openSelect && (
//           <div className="flex flex-col bg-[#FFFFFFCC] rounded-[24px] p-[12px] min-w-[296px] max-h-[420px] absolute right-[-260px] top-[65px] overflow-auto">
//             {arrLinks.map(([label, key], index) => (
//               <div
//                 key={key}
//                 onClick={() => {
//                   if (location.pathname !== "/") {
//                     PathlinkStore.clearLink();
//                     navigate("/", { replace: true });
//                   }
//                   PathlinkStore.setMainLink(key);
//                   spreadsheetManager.setCurrentTabId(index + 1);
//                 }}
//                 className={`p-[12px] rounded-[12px] cursor-pointer transition ${
//                   key === mainLink
//                     ? "bg-[#004662] text-[#FFFFFF]"
//                     : "hover:bg-[#0046627e] hover:text-[#FFFFFF]"
//                 }`}
//               >
//                 {label}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//       <div
//         className={`p-[12px] ${openSelectTab ? "rounded-l-[12px] bg-[#00466280] text-[#FFFFFF]" : ""}`}
//       >
//         {mainLink === "nature" ? "Природа" : "Социум"}
//       </div>
//       <div
//         tabIndex={1}
//         onBlur={() => setOpenSelectTab(false)}
//         className="relative"
//       >
//         <div
//           className={`p-[6px] ${openSelectTab ? "rounded-r-[12px] bg-[#004662]" : ""}`}
//         >
//           <img
//             onClick={() => setOpenSelectTab(!openSelectTab)}
//             className={`transition-transform ${openSelectTab ? "rotate-0" : ""}`}
//             src={!openSelectTab ? PahtLinkSvg : PahtLinkWhiteSvg}
//             alt=""
//           />
//         </div>
//         {openSelectTab && (
//           <div className="flex flex-col bg-[#FFFFFFCC] rounded-[24px] p-[12px] min-w-[296px] max-h-[420px] absolute right-[-260px] top-[65px] overflow-auto">
//             {arrgg?.map((label, index) => (
//               <div
//                 key={index}
//                 onClick={() => setActiveElement(index)}
//                 className={`p-[12px] rounded-[12px] cursor-pointer transition ${
//                   index === activeElement
//                     ? "bg-[#004662] text-[#FFFFFF]"
//                     : "hover:bg-[#0046627e] hover:text-[#FFFFFF]"
//                 }`}
//               >
//                 {label === "" ? "Нет названия" : label}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// });

import { useState } from "react";
import { observer } from "mobx-react-lite";
import { useLocation, useNavigate } from "react-router-dom"; // ⬅️ добавили

import { PathlinkStore } from "../../../../../store/PathLink";
import PahtSvg from "../../../../../assets/icons/Path.svg";
import PathWhiteSvg from "../../../../../assets/icons/PathWhite.svg";
import PahtLinkWhiteSvg from "../../../../../assets/icons/PahtLinkWhite.svg";
import PahtLinkSvg from "../../../../../assets/icons/PathLink.svg";
import { spreadsheetManager } from "../../../../../store/root";

export const ArrowSelectLink = observer(() => {
  const [openSelect, setOpenSelect] = useState(false);
  const [openSelectTab, setOpenSelectTab] = useState(false);
  const [activeElement, setActiveElement] = useState(0);
  const { mainLink } = PathlinkStore.link;

  const location = useLocation(); // ⬅️
  const navigate = useNavigate(); // ⬅️

  // ⬇️ если мы не на главной — перекидываем на главную (без добавления в историю)
  // useEffect(() => {
  //   if (location.pathname !== "/") {
  //     navigate("/", { replace: true });
  //   }
  // }, [location.pathname, navigate]);

  const arrLinks: [string, "nature" | "society"][] = [
    ["Природа", "nature"],
    ["Социум", "society"],
  ];

  const data = spreadsheetManager.currentMainSpreadsheet;

  // const allTitles = data?.rows[0].cells[0].raw.title;
  // const arrgg0 = data?.rows.flatMap((item) => item);

  // console.log(arrgg0);

  type TitleWithPos = [string, [number, number], string, any];

  const arrgg: TitleWithPos[] =
    data?.rows.flatMap((row, rIdx) =>
      row.cells.map(
        (cell, cIdx): TitleWithPos => [
          cell.raw.title || "Нет названия",
          [rIdx, cIdx],
          cell.raw.type,
          cell.raw.children?.id,
        ],
      ),
    ) ?? [];

  // console.log(allTitles);
  // console.log(arrgg);

  return (
    <div className="flex items-center">
      <div
        className={`p-[6px] ${openSelect ? "rounded-l-[12px] bg-[#00466280]" : ""}`}
      >
        <img src={openSelect ? PathWhiteSvg : PahtSvg} alt="" />
      </div>

      <div
        tabIndex={0}
        onBlur={() => setOpenSelect(false)}
        className="relative"
      >
        <div
          className={`p-[6px] ${openSelect ? "rounded-r-[12px] bg-[#004662]" : ""}`}
        >
          <img
            onClick={() => setOpenSelect(!openSelect)}
            className={`transition-transform ${openSelect ? "rotate-0" : ""}`}
            src={!openSelect ? PahtLinkSvg : PahtLinkWhiteSvg}
            alt=""
          />
        </div>

        {openSelect && (
          <div className="flex flex-col bg-[#FFFFFFCC] rounded-[24px] p-[12px] min-w-[296px] max-h-[420px] absolute right-[-260px] top-[65px] overflow-auto">
            {arrLinks.map(([label, key], index) => (
              <div
                key={key}
                // onClick={() => {
                //   if (location.pathname !== "/") {
                //     navigate("/", {
                //       replace: true,
                //       state: { mainLink: key, tabId: index + 1 },
                //     });
                //   }
                //   PathlinkStore.clearLink();
                //   PathlinkStore.setMainLink(key);
                //   spreadsheetManager.setCurrentTabId(index + 1);
                // }}
                onClick={() => {
                  const needClean =
                    location.pathname !== "/" ||
                    location.search ||
                    location.hash;

                  if (needClean) {
                    navigate(
                      { pathname: "/", search: "", hash: "" }, // очищаем ?... и #...
                      {
                        replace: true,
                        state: { mainLink: key, tabId: index + 1 },
                      },
                    );
                  }

                  PathlinkStore.clearLink();
                  PathlinkStore.setMainLink(key);
                  spreadsheetManager.setCurrentTabId(index + 1);
                }}
                className={`p-[12px] rounded-[12px] cursor-pointer transition ${
                  key === mainLink
                    ? "bg-[#004662] text-[#FFFFFF]"
                    : "hover:bg-[#0046627e] hover:text-[#FFFFFF]"
                }`}
              >
                {label}
              </div>
            ))}
          </div>
        )}
      </div>

      <div
        className={`p-[12px] ${openSelectTab ? "rounded-l-[12px] bg-[#00466280] text-[#FFFFFF]" : ""}`}
      >
        {mainLink === "nature" ? "Природа" : "Социум"}
      </div>

      <div
        tabIndex={1}
        onBlur={() => setOpenSelectTab(false)}
        className="relative"
      >
        <div
          className={`p-[6px] ${openSelectTab ? "rounded-r-[12px] bg-[#004662]" : ""}`}
        >
          <img
            onClick={() => setOpenSelectTab(!openSelectTab)}
            className={`transition-transform ${openSelectTab ? "rotate-0" : ""}`}
            src={!openSelectTab ? PahtLinkSvg : PahtLinkWhiteSvg}
            alt=""
          />
        </div>

        {openSelectTab && (
          <div className="flex flex-col bg-[#FFFFFFCC] rounded-[24px] p-[12px] min-w-[296px] max-h-[420px] absolute right-[-260px] top-[65px] overflow-auto">
            {arrgg?.map(([title, [r, c], type, idTable], i) => (
              <div
                key={`${r}-${c}`}
                onClick={() => {
                  if (type == "table") {
                    navigate(
                      {
                        pathname: "/user-inner-table",
                        search: `?id=${idTable}`, // можно и без "?", Router сам добавит
                      } // поставь false, если «Назад» должен закрывать выбор
                    );
                  } else {
                    setActiveElement(i); // как просил

                    const params = new URLSearchParams(location.search);
                    // при необходимости: params.set("id", String(newId));
                    params.set("rowIndex", String(r));
                    params.set("cellIndex", String(c));

                    navigate(
                      {
                        pathname: "/",
                        search: `?${params.toString()}`,
                      },
                      { replace: true }, // поставь false, если «Назад» должен закрывать выбор
                    );
                  }
                }}
                className={`p-[12px] rounded-[12px] cursor-pointer transition ${
                  i === activeElement
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
    </div>
  );
});
