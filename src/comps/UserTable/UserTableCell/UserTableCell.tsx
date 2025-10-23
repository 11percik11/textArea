import { useLocation, useNavigate } from "react-router-dom";
import type { SpreadsheetCellEntity } from "../../../store/SpreadsheetCellEntity";
import { getServerMediaUrl } from "../../../utils/getServerMediaUrl";
import { ModalImage } from "../../modals/InfoModal/ModalImage/ModalImage";
import style from "./UserTableCell.module.scss";
import clsx from "clsx";

type Props = {
  onOpen: (cell: SpreadsheetCellEntity) => void;
  data: SpreadsheetCellEntity;
  isTimeline: boolean;
  color: string;
  ссindex: number;
  cellIndex: number;
};

const UserTableCell = ({ data, onOpen, isTimeline, color, ссindex, cellIndex}: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const onCellClick = () => {
    if (data.type === "table") {
      navigate(`/user-inner-table?id=${data.spreadsheetParentId}`);
      return;
    }else{
      if (location.pathname === "/user-inner-table") {
        console.log(location);
        
        navigate(`${location.pathname}${location.search}&rowIndex=${ссindex}&cellIndex=${cellIndex}`);
        console.log("Строка:", ссindex, "Элемент", cellIndex);
      }else {
        navigate(`${location.pathname}?rowIndex=${ссindex}&cellIndex=${cellIndex}`);
        console.log("Строка:", ссindex, "Элемент", cellIndex);
      }
    }
    onOpen(data);
  };

  const isVideo = /\.(mp4|mov|avi|webm|gif)$/i.test(
    getServerMediaUrl(data.images[0]?.image),
  );

  return (
    <div
      onClick={onCellClick}
      className={`w-[358px] duration-200 active:min-h-full active:bg-[#004662B2] active:text-white min-h-[74px] max-h-[212px] rounded-[24px] bg-[#FFFFFFB2] p-[12px] flex gap-[8px] ${data.images.length != 0 ? "justify-left text-[16px]" : "justify-center text-[20px]"} items-center text-accent font-semibold`}
    >
      {data.type === "media" && data.images.length && (
        <ModalImage
          className={style.UserTableCell__singleImage}
          height="175px"
          src={getServerMediaUrl(data.images[0].image)}
          color={color}
        />
      )}

      {data.type === "text-media" && (
        <>
          {data.images[0]?.image && (
            <div
              className={clsx([
                style.wrapper,
                style.UserTableCell__imageWhenText,
              ])}
              style={{ height: "121px" }}
            >
              <div
                className={style.background}
                style={{ backgroundColor: color }}
              ></div>

              {isVideo ? (
                <video
                  className={style.foreground}
                  src={getServerMediaUrl(data.images[0].image)}
                  autoPlay
                  loop
                  playsInline
                  muted
                />
              ) : (
                <img
                  className={style.foreground}
                  src={getServerMediaUrl(data.images[0].image)}
                  alt=""
                />
              )}
            </div>
          )}
          <div className="text-center">{data.title}</div>
        </>
      )}

      {data.type === "text" && !isTimeline && (
        <div className="text-center">{data.title}</div>
      )}

      {isTimeline && (
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="text-center">{data.title}</div>
          <div className="text-center text-[24px]">{data.description}</div>
        </div>
      )}

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
