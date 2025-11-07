import { useNavigate } from "react-router-dom";

import exitIcon from "../../assets/icons/exitIcon.svg";
import arrIcon from "../../assets/icons/arrSimple.svg";
import ListIcon from "../../assets/icons/List.svg";
import MainPageIcon from "../../assets/icons/Main.svg";
import CloseWhiteIcon from "../../assets/icons/CloseIconWhite.svg";
import StarIcon from "../../assets/icons/starIcon.svg";

import { PathlinkStore } from "../../store/PathLink";
import { useState } from "react";

export const Header1 = ({
  title,
  searchParamsSpreadsheetId,
}: {
  title: string;
  searchParamsSpreadsheetId: number;
}) => {
  const navigate = useNavigate();

  const [showList, setShowList] = useState(false);

  const arrTT = PathlinkStore.link.arrLinks;
  const ArrLinkIDTable = PathlinkStore.link.arrLinks.map(
    (idTable) => idTable[0],
  );

  const handleBack = () => {
    if (ArrLinkIDTable.length == 1) {
      navigate("/");
    } else {
      navigate({
        pathname: "/user-inner-table",
        search: `?id=${ArrLinkIDTable[ArrLinkIDTable.length - 2]}`,
      });
    }
    PathlinkStore.removeArrLinkById(searchParamsSpreadsheetId);
  };

  const transitionPageById = (idTable: number) => {
    navigate({
      pathname: "/user-inner-table",
      search: `?id=${ArrLinkIDTable[ArrLinkIDTable.length - (arrTT.length - idTable)]}`,
    });
    PathlinkStore.trimFrom(idTable);
  };

  const admin = false;

  const exitMainPage = () => {
    PathlinkStore.setArrLinks([]);
    navigate("/");
  };

  return (
    <div className="flex items-center gap-[16px] mb-[32px]">
      {admin && (
        <button className="size-[72px] rounded-[24px] bg-white flex justify-center items-center">
          <img src={exitIcon} alt="exit" className="size-[32px]" />
        </button>
      )}
      <button
        onClick={handleBack}
        className="size-[72px] rounded-[24px] bg-white flex justify-center items-center"
      >
        <img src={arrIcon} alt="back" className="size-[32px]" />
      </button>
      <div className="w-[1456px] text-accent text-[32px] font-bold">
        {title}
      </div>
      <div className="flex gap-[16px] ml-[auto]">
        <div
          onClick={() => setShowList(true)}
          className="bg-white size-[72px] flex items-center justify-center rounded-[24px]"
        >
          <img src={ListIcon} alt="" />
        </div>
        <div
          onClick={() => exitMainPage()}
          className="bg-[#004662] size-[72px] flex items-center justify-center rounded-[24px]"
        >
          <img src={MainPageIcon} alt="" />
        </div>
      </div>

      {showList && (
        <div className="w-[100vw] p-[32px] h-[100vh] absolute top-0 left-0 bg-[#4d4d4d8f]  flex items-center justify-center">
          <div className="w-[764px] max-h-[1016px] p-[32px] bg-white rounded-[32px] flex flex-col gap-[32px]">
            <div className="flex items-center justify-between">
              <div className="text-[#004662] font-semibold text-[32px]">
                Вложенность
              </div>
              <div
                onClick={() => setShowList(false)}
                className="bg-[#004662] size-[56px] flex items-center justify-center rounded-[12px]"
              >
                <img src={CloseWhiteIcon} alt="" />
              </div>
            </div>

            <div className="max-h-[100%] pr-[20px] overflow-auto">
              <div
                onClick={() => exitMainPage()}
                className="flex items-center gap-[12px]"
              >
                <div>
                  <img src={StarIcon} alt="" />
                </div>
                <div
                  onClick={exitMainPage}
                  className="w-[100%] p-[24px] text-[#004662] text-[24px] font-semibold rounded-[24px] hover:text-white hover:bg-accent"
                >
                  Главная таблица
                </div>
              </div>

              {arrTT.map((row, idx) => (
                <div className="flex items-center gap-[12px]" key={idx}>
                  <div className="min-w-[24px] text-[#004662] text-[24px] font-semibold text-center">
                    {idx + 1}
                  </div>
                  <div
                    onClick={() => transitionPageById(idx)}
                    className="w-[100%] p-[24px] text-[#004662] text-[24px] font-semibold text-ellipsis truncate whitespace-nowrap rounded-[24px] hover:text-white hover:bg-accent"
                  >
                    {row[2]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
