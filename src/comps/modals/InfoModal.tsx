import { useState } from "react";
import closeIcon from "../../assets/icons/closeIcon.svg";
import type { Cell } from "../../types";

type Props = {
  cell: Cell;
  onClose: () => void;
};

const InfoModal = ({ onClose, cell }: Props) => {
  const [preClosed, setPreClosed] = useState(false);
  return (
    <div
      className={`${preClosed && "opacity-0"} duration-200 transition animate-appear w-full h-full bg-[#00000099] fixed top-0 left-0 z-10`}
    >
      <div className="mt-[32px] max-w-[1544px] min-w-[920px] max-h-[1016px] p-[32px] rounded-[32px] bg-white mx-auto my-auto">
        <div className="w-full h-[56px] flex justify-between items-center text-[32px] text-accent font-bold leading-[120%]">
          {cell.title}
          <div
            onClick={() => {
              setPreClosed(true);
              setTimeout(onClose, 200);
            }}
            className="size-[56px] rounded-[12px] bg-accent flex items-center justify-center"
          >
            <img src={closeIcon} alt="close" className="size-[32px]" />
          </div>
        </div>
        {cell.type==="text" && 
             <div className="text-text font-normal text-[24px] leading-[120%] mt-[32px] w-[1324px] h-[770px] text-wrap">
              {cell.description}
             </div>
            }
      </div>
    </div>
  );
};

export default InfoModal;
