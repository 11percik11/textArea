import { useNavigate } from "react-router-dom";
import type { CellEntity } from "../../../store/CellEntity";
import { getServerMediaUrl } from "../../../utils/getServerMediaUrl";
import { ModalImage } from "../../modals/InfoModal/ModalImage/ModalImage";
import style from "./UserTableCell.module.scss";

type Props = {
  onOpen: (cell: CellEntity) => void;
  data: CellEntity;
};

const UserTableCell = ({ data, onOpen }: Props) => {
  const navigate = useNavigate();

  const onCellClick = () => {
    if (data.type === "table") {
      navigate(`/inner-table?id=${data.spreadsheetParentId}`);
      return;
    }
    onOpen(data);
  };

  return (
    <div
      onClick={onCellClick}
      className={`w-[358px] mb-[8px] duration-200 active:min-h-full active:bg-[#004662B2] active:text-white min-h-[74px] max-h-[212px] rounded-[24px] bg-[#FFFFFFB2] p-[12px] flex gap-[8px] ${data.images.length != 0 ? "justify-left text-[16px]" : "justify-center text-[20px]"} items-center text-accent font-semibold`}
    >
      {data.type === "media" && data.images.length && (
        <ModalImage
          className={style.UserTableCell__singleImage}
          height="188px"
          src={getServerMediaUrl(data.images[0].image)}
        />
      )}

      {data.type === "text-media" && (
        <>
          {data.images[0]?.image && (
            <ModalImage
              className={style.UserTableCell__imageWhenText}
              height="121px"
              src={getServerMediaUrl(data.images[0].image)}
            />
          )}
          <div className="text-center">{data.title}</div>
        </>
      )}

      {data.type === "text" && <div className="text-center">{data.title}</div>}
      {data.type === "table" && (
        <div className="text-center" onClick={onCellClick}>
          {data.title} (таблица)
        </div>
      )}

      {/* <img
          src={getServerMediaUrl(data.images[0].image)}
          alt="media"
          className={`object-cover w-full h-full `}
        />
        <div className="bg-[#00000066] w-[334px] h-[188px] absolute" />
        <img
          src={data.images[0].image}
          alt="media"
          className="object-fit h-full mx-auto left-0 right-0 absolute"
        /> */}
    </div>
  );
};

export default UserTableCell;
