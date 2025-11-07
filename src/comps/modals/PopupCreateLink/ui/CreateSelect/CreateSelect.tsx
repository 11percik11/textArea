import { observer } from "mobx-react-lite";
import { PathlinkStore } from "../../../../../store/PathLink";
import { Select } from "../Select/Select";
import { useLocation, useNavigate } from "react-router-dom";
import { OpenPopupId } from "../../../../../store/OpenPopupId";
import PointsLinkBlueIcon from "../../../../../assets/icons/PointsLinkBlue.svg";
import PointsLinkWhiteIcon from "../../../../../assets/icons/PointsLinkWhite.svg";
import { useState } from "react";

export const CreateSelect = observer(() => {
  const arrTT = PathlinkStore.link.arrLinks;

  const [activeSelectPointsLinks, setActiveSelectPointsLinks] = useState(false);
    const ArrLinkIDTable = PathlinkStore.link.arrLinks.map(
    (idTable) => idTable[0],
  );

    const transitionPageById = (idTable: number) => {
      setActiveSelectPointsLinks(false);
    navigate({
      pathname: "/user-inner-table",
      search: `?id=${ArrLinkIDTable[ArrLinkIDTable.length - (arrTT.length - idTable)]}`,
    });
    PathlinkStore.trimFrom(idTable);
  };

  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const IdTable = params.get("id");

  const handlePick = (
    colIndex: number,
    pos: [number, number],
    type?: string,
    idTable?: any,
    idTable1?: any,
  ) => {
    const newId = arrTT[colIndex]?.[0];
    if (newId == null) return;

    if (type == "table") {
      if (IdTable != idTable) {
        PathlinkStore.trimFrom?.(colIndex);
        navigate({
          pathname: "/user-inner-table",
          search: `?id=${idTable}`,
        });
      }
    } else {
      PathlinkStore.trimFrom?.(colIndex);
      OpenPopupId.setOpenIndexPopup(true, [pos[0], pos[1]]);
      navigate({
        pathname: "/user-inner-table",
        search: `?id=${idTable1}`,
      });
    }
  };

  const arrTableCount5 = arrTT.slice(-5);

  return (
    <div className="flex">
      {arrTT.length > 5 && (
        <div
          tabIndex={1}
          onBlur={() => setActiveSelectPointsLinks(false)}
          onMouseDown={() =>
            setActiveSelectPointsLinks(!activeSelectPointsLinks)
          }
          className={`flex items-center ${
            activeSelectPointsLinks ? "bg-accent" : "bg-[#d7d7d7]"
          } justify-center w-[44px] mr-[5px] rounded-[12px] relative`}
        >
          <img
            className="w-[34px] h-[34px]"
            src={
              activeSelectPointsLinks ? PointsLinkWhiteIcon : PointsLinkBlueIcon
            }
            alt=""
          />

          {activeSelectPointsLinks && (
            <div
              className="w-[296px] h-[308px] rounded-[25px] p-[12px] absolute top-[70px] left-[30px] bg-[#FFFFFFCC] z-1"
              onMouseDown={(e) => e.stopPropagation()}
            >
              <div className="overflow-auto max-h-[100%] pr-[5px]">

              {arrTT.map((row, idx) => (
                <div className="flex items-center gap-[12px]" key={idx}>
                  <div
                    onClick={() => transitionPageById(idx)}
                    className="w-[100%] p-[12px] text-[#004662] text-[20px] font-semibold text-ellipsis truncate whitespace-nowrap rounded-[12px] hover:text-white hover:bg-accent"
                    >
                    {row[2]}
                  </div>
                </div>
              ))}
              </div>
            </div>
          )}
        </div>
      )}

      {arrTableCount5.map((row, idx) => (
        <div key={idx}>
          <Select
            idTable1={row[0]}
            name={row[2]}
            arrMap={row[1]}
            columnIndex={idx}
            onPick={handlePick}
          />
        </div>
      ))}
    </div>
  );
});
