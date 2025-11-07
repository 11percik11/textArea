import { useState } from "react";
import { observer } from "mobx-react-lite";
import { useLocation, useNavigate } from "react-router-dom"; // ⬅️ добавили

import { PathlinkStore } from "../../../../../store/PathLink";
import PahtSvg from "../../../../../assets/icons/Path.svg";
import PathWhiteSvg from "../../../../../assets/icons/PathWhite.svg";
import PahtLinkWhiteSvg from "../../../../../assets/icons/PahtLinkWhite.svg";
import PahtLinkSvg from "../../../../../assets/icons/PathLink.svg";
import { spreadsheetManager } from "../../../../../store/root";
import { OpenPopupId } from "../../../../../store/OpenPopupId";

export const ArrowSelectLink = observer(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const IdTable = params.get("id");

  const [openSelect, setOpenSelect] = useState(false);
  const [openSelectTab, setOpenSelectTab] = useState(false);
  const [activeElement, setActiveElement] = useState(0);

  const { mainLink } = PathlinkStore.link;

  const arrLinks: [string, "nature" | "society"][] = [
    ["Природа", "nature"],
    ["Социум", "society"],
  ];

  const data = spreadsheetManager.currentMainSpreadsheet;

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

  const switchingNatureSociety = (key: "nature" | "society", index: number) => {
    const needClean =
      location.pathname !== "/" || location.search || location.hash;

    if (needClean) {
      navigate(
        { pathname: "/", search: "", hash: "" }, // очищаем ?... и #...
        {
          replace: true,
          state: { mainLink: key, tabId: index + 1 },
        },
      );
    }
    OpenPopupId.setOpenPopup(false);
    PathlinkStore.clearLink();
    PathlinkStore.setMainLink(key);
    spreadsheetManager.setCurrentTabId(index + 1);
  };

  const handlePick = (pos: [number, number], type?: string, idTable?: any) => {
    if (type == "table") {
      if (IdTable != idTable) {
        PathlinkStore.setArrLinks([]);
        navigate({
          pathname: "/user-inner-table",
          search: `?id=${idTable}`,
        });
      }
    } else {
      PathlinkStore.setArrLinks([]);
      OpenPopupId.setOpenPopup(false);
      OpenPopupId.setOpenIndexPopup(true, [pos[0], pos[1]]);
      navigate("/");
    }
  };

  const handleClickElement = (
    index: number,
    pos: [number, number],
    type?: string,
    idTable?: any,
  ) => {
    setActiveElement(index);
    handlePick(pos, type, idTable);
    setOpenSelect(false);
  };

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
                onClick={() => switchingNatureSociety(key, index)}
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
            {arrgg?.map(([title, pos, type, idTable], index) => (
              <div
                key={`${pos[0]}-${pos[1]}`}
                onClick={() => handleClickElement(index, pos, type, idTable)}
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
    </div>
  );
});
