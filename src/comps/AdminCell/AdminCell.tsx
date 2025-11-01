import imageIcon from "../../assets/icons/imageIcon.svg";

import documentIcon from "../../assets/icons/Document Text.svg";
import imagesIcon from "../../assets/icons/AlbumIcon.svg";
import tableIcon from "../../assets/icons/tableIcon.svg";
import textIcon from "../../assets/icons/textIcon.svg";

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
      className={`border-[1px] border-stroke  w-[424px] min-h-[152px] p-[24px] relative`}
    >
      <div
        hidden={!data.id}
        className="w-[376px] h-[56px] flex gap-[8px] justify-left items-center"
      >
        {/* {data.images && data.images.length <= 5 ? (
          data.images?.map((_: any, index: number) => (
            <div
              key={index}
              className="size-[44px] bg-[#0046621A] rounded-full flex justify-center items-center"
            >
              <img src={imageIcon} alt="image" className="size-[24px]" />
            </div>
          ))
        ) : ( */}
        {data.images.length > 0 && 
          // <div className="size-[44px] bg-[#0046621A] rounded-full flex justify-center items-center">
          //   <img src={imagesIcon} alt="image" className="size-[24px]" />
          // </div>
          <div className={`${data.images.length > 1 && "p-[10px]"} h-[44px] min-w-[44px] bg-[#0046621A] rounded-full flex justify-center items-center text-[#004662]`}>
            <img src={imagesIcon} alt="document" className="size-[24px]" />
            {data.images.length > 1 && (<div className="ml-[14px] text-[20px]">{data.images.length}</div>)}
          </div>
        }  

        {data.files.length > 0 && (
          <div className={`${data.files.length > 1 && "p-[10px]"} h-[44px] min-w-[44px] bg-[#0046621A] rounded-full flex justify-center items-center text-[#004662]`}>
            <img src={documentIcon} alt="document" className="size-[24px]" />
            {data.files.length > 1 && (<div className="ml-[14px] text-[20px]">{data.files.length}</div>)}
          </div>
        )}

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
      {
        <div
          hidden={!data.id}
          className="text-[24px] text-accent font-semibold"
        >
          {data.title || (
            <span className="text-text opacity-[60%]">Без названия</span>
          )}
        </div>
      }
    </div>
  );
};

export default AdminCell;
