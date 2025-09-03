import { useNavigate } from "react-router-dom";

import exitIcon from "../../assets/icons/exitIcon.svg";
import arrIcon from "../../assets/icons/arrSimple.svg";

export const Header = ({ title }: {title: string}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
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
