import { useNavigate } from "react-router-dom";

import exitIcon from "../../assets/icons/exitIcon.svg";
import arrIcon from "../../assets/icons/arrSimple.svg";
import { PathlinkStore } from "../../store/PathLink";

export const Header1 = ({
  title,
  searchParamsSpreadsheetId,
}: {
  title: string;
  searchParamsSpreadsheetId: number;
}) => {
  const navigate = useNavigate();
  const ArrLinkIDTable = PathlinkStore.link.arrLinks.map(
    (idTable) => idTable[0],
  );

  const handleBack = () => {
    // navigate(-1);
    if (ArrLinkIDTable.length == 1) {
      navigate("/");
    }else {
        navigate({
            pathname: "/user-inner-table",
            search: `?id=${ArrLinkIDTable[ArrLinkIDTable.length - 2]}`,
        });
    }
    PathlinkStore.removeArrLinkById(searchParamsSpreadsheetId);
    console.log(
      "ArrLinkIDTable",
      ArrLinkIDTable,
      "ArrLinkIDTable[0]",
      ArrLinkIDTable[ArrLinkIDTable.length - 2],
      "searchParamsSpreadsheetId",
      searchParamsSpreadsheetId,
    );
  };

  const admin = false;

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
      <div className="w-[1456px] h-[32px] text-accent text-[32px] font-bold">
        {title}
      </div>
    </div>
  );
};
