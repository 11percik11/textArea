import { useState } from "react";

type Props = {
  onSelect: (option: number) => void;
};
const MenuSwipe = ({ onSelect }: Props) => {
  const [currOption, setCurrOption] = useState(0);
  return (
    <div className="z-1 fixed mx-auto left-0 right-0 bottom-[32px] w-[608px] h-[88px] bg-white rounded-[32px] flex p-[8px] gap-[8px]">
      <div
        className={`w-[292px] h-[72px] rounded-[24px] bg-accent absolute z-0 transition duration-300 ${currOption === 1 && "translate-x-[300px]"}`}
      />
      <div
        onClick={() => {
          setCurrOption(0);
          onSelect(0);
        }}
        className={`z-10 w-[292px] h-[72px] flex items-center justify-center text-[24px] font-semibold leading-[100%] ${currOption === 0 ? "text-white" : "text-accent"}`}
      >
        Природа
      </div>
      <div
        onClick={() => {
          setCurrOption(1);
          onSelect(1);
        }}
        className={`z-10 w-[292px] h-[72px] flex items-center justify-center text-[24px] font-semibold leading-[100%] ${currOption === 1 ? "text-white" : "text-accent"}`}
      >
        Социум
      </div>
    </div>
  );
};

export default MenuSwipe;
