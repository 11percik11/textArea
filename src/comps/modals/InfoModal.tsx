import { useState } from "react";
import closeIcon from "../../assets/icons/closeIcon.svg";

type Props = {
  id: number;
  onClose: () => void;
};

const InfoModal = ({ onClose, id }: Props) => {
  const [preClosed, setPreClosed] = useState(false);
  const test = {
    title: id,
    type: "text", //text, media, media&text, table
  };
  return (
    <div
      className={`${preClosed && "opacity-0"} duration-200 transition animate-appear w-full h-full bg-[#00000099] fixed top-0 left-0 z-10`}
    >
      <div className="mt-[32px] max-w-[1544px] min-w-[920px] max-h-[1016px] p-[32px] rounded-[32px] bg-white mx-auto my-auto">
        <div className="w-full h-[56px] flex justify-between items-center text-[32px] text-accent font-bold leading-[120%]">
          {test.title}
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
      </div>
    </div>
  );
};

export default InfoModal;
