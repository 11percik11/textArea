import type { Cell, Spreadsheet } from "../../types";
import imageIcon from "../../assets/icons/imageIcon.svg";
import videoIcon from "../../assets/icons/videoIcon.svg";

import documentIcon from "../../assets/icons/Document Text.svg";
import imagesIcon from "../../assets/icons/AlbumIcon.svg";
import tableIcon from "../../assets/icons/tableIcon.svg";
import textIcon from "../../assets/icons/textIcon.svg";
import { useNavigate } from "react-router-dom";
import { cellStore, spreadsheetStore } from "../../store/root";
import { TableLinkButton } from "./TableLinkButton/TableLinkButton";
import type { SpreadsheetCellEntity } from "../../store/SpreadsheetCellEntity";

type Props = {
  data: SpreadsheetCellEntity;
  color: string;
  onClick: (cellId: number) => void;
};
const AdminCell = ({ data, color, onClick }: Props) => {
  const onClickHandler = () => onClick(data.id);
  return (
    <div
      onClick={onClickHandler}
      style={{ backgroundColor: color }}
      className={`border-[1px] border-stroke  min-w-[424px] h-[152px] p-[24px] relative`}
    >
      <div
        hidden={!data.id}
        className="w-[376px] h-[56px] flex gap-[8px] justify-left items-center"
      >
        {data.images && data.images.length <= 5 ? (
          data.images?.map((media: any, index: number) => (
            <div
              key={index}
              className="size-[44px] bg-[#0046621A] rounded-full flex justify-center items-center"
            >
              <img src={imageIcon} alt="image" className="size-[24px]" />
            </div>
          ))
        ) : (
          <div className="size-[44px] bg-[#0046621A] rounded-full flex justify-center items-center">
            <img src={imagesIcon} alt="image" className="size-[24px]" />
          </div>
        )}
        {//@ts-ignore
        data.files?.map((file, index: number) => (
          <div
            key={index}
            className="size-[44px] bg-[#0046621A] rounded-full flex justify-center items-center"
          >
            <img src={documentIcon} alt="document" className="size-[24px]" />
          </div>
        ))}

        {data.type === "table" && (
          <div className="flex justify-between w-full">
            <div className="size-[44px] bg-[#0046621A] rounded-full flex justify-center items-center">
              <img src={tableIcon} alt="table" className="size-[24px]" />
            </div>
            <TableLinkButton spreadsheetId={data.spreadsheetParentId || null} />
          </div>
        )}

        {data.title && (
          <div className="size-[44px] bg-[#0046621A] rounded-full flex justify-center items-center">
            <img src={textIcon} alt="table" className="size-[24px]" />
          </div>
        )}
      </div>
      <div
        hidden={!data.id}
        className="absolute bottom-[24px] text-[24px] text-accent font-semibold"
      >
        {data.title || (
          <span className="text-text opacity-[60%]">Без названия</span>
        )}
      </div>
    </div>
  );
};

export default AdminCell;
