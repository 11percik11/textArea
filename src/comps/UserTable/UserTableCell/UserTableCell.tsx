import { useLocation, useNavigate } from "react-router-dom";
import type { SpreadsheetCellEntity } from "../../../store/SpreadsheetCellEntity";
import { getServerMediaUrl } from "../../../utils/getServerMediaUrl";
import "./UserTableCell.scss";

type Props = {
  onOpen: (cell: SpreadsheetCellEntity) => void;
  data: SpreadsheetCellEntity;
  isTimeline: boolean;
  color: string;
  ссindex: number;
  cellIndex: number;
};

const UserTableCell = ({ data, onOpen, ссindex, cellIndex }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const onCellClick = () => {
    if (data.type === "table") {
      navigate(`/user-inner-table?id=${data.spreadsheetParentId}`);
      return;
    } else {
      if (location.pathname === "/user-inner-table") {
        // navigate(
        //   `${location.pathname}${location.search}&rowIndex=${ссindex}&cellIndex=${cellIndex}`,
        // );
        navigate(
          `${location.pathname}${location.search}&rowIndex=${ссindex}&cellIndex=${cellIndex}`,
          { replace: true },
        );
      } else {
        navigate(
          `${location.pathname}?rowIndex=${ссindex}&cellIndex=${cellIndex}`,
        );
      }
    }
    onOpen(data);
  };

  return (
    <div
      onClick={onCellClick}
      className={`w-[358px] duration-200 active:min-h-full active:bg-[#004662B2] active:text-white min-h-[74px] max-h-[212px] rounded-[24px] bg-[#FFFFFFB2] p-[12px] flex ${data.title && "gap-[8px]"} justify-center items-center text-accent font-semibold`}
    >
      {data.images[0]?.image && (
        <div
          className={`${!data.title ? "w-[334px] h-[188px]" : "w-[121px] h-[121px]"} overflow-hidden flex justify-center rounded-[12px]`}
        >
          <img
            className={`max-w-none w-auto  rounded-[12px]`}
            src={getServerMediaUrl(data.images[0]?.image)}
            alt=""
          />
        </div>
      )}
      <div
        className={`custom-clamp flex-1 text-[16px] font-[700] ${!data.images[0]?.image && "text-center"}`}
      >
        {data.title} {data.type == "table" && "(таблица)"}
      </div>
    </div>
  );
};

export default UserTableCell;
