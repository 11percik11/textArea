import type { Cell } from "../types";
import { getServerMediaUrl } from "../utils/getServerMediaUrl";

type Props = {
  onOpen: (cell: Cell) => void;
  data: Cell;
};

const MainCell = ({ data, onOpen }: Props) => {
  return (
    <div
      onClick={() => onOpen(data)}
      className={`w-[358px] mb-[8px] duration-200 active:min-h-full active:bg-[#004662B2] active:text-white min-h-[74px] max-h-[212px] rounded-[24px] bg-[#FFFFFFB2] p-[12px] flex gap-[8px] ${data.images.length!=0 ? "justify-left text-[16px]" : "justify-center text-[20px]"} items-center text-accent font-semibold`}
    >
      {data.images.length!=0 && (
        <div
          className={`${ false /* data.isTitleHidden тут должен быть флаг проверки того, должно ли отображаться название ячейки*/ ? "w-[334px] h-[188px] relative" : "size-[121px]"} rounded-[12px] overflow-hidden`}
        >
          <img
            src={getServerMediaUrl(data.images[0].image)}
            alt="media"
            className={`object-cover w-full h-full ${data.isTitleHidden && "blur-[26px] absolute"}`}
          />
          <div
            hidden={!data.isTitleHidden}
            className="bg-[#00000066] w-[334px] h-[188px] absolute"
          />
          <img
            hidden={!data.isTitleHidden}
            src={data.images[0].imageFile}
            alt="media"
            className="object-fit h-full mx-auto left-0 right-0 absolute"
          />
        </div>
      )}
      <div className="text-center">
        {!data.isTitleHidden && data.title}
        <div className="text-[24px]">
          {data.type === "timeline" && data.value}
        </div>
      </div>
    </div>
  );
};

export default MainCell;
