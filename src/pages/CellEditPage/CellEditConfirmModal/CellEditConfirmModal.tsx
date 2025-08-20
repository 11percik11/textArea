import type { Cell } from "../../../types";

type Props = {
  onNo: () => void;
  onYes: (variant: Cell["type"]) => Promise<void>;
  cellVariant: Cell["type"];
  currentCellVariant: Cell["type"] | null;
};

const CellEditConfirmModal = ({
  onNo,
  onYes,
  currentCellVariant,
  cellVariant,
}: Props) => {
  if (currentCellVariant !== cellVariant) return null;
  return (
    <div className="z-100 animate-appear w-full h-full fixed bg-[#00000099] top-0 left-0 flex items-center justify-center">
      <div className="w-[764px] h-[256px] bg-white rounded-[32px] p-[32px]">
        <div className="text-[32px] text-accent leading-[120%] text-center">
          <p>
            Тип ячейки установится на{" "}
            <span className="font-bold">{cellVariant}</span>
          </p>
          <p>данные при наличии будут утеряны</p>
        </div>
        <div className="flex mt-[32px] gap-[16px]">
          <button
            onClick={onNo}
            className="w-[342px] h-[72px] rounded-[24px] border-[2px] border-accent bg-white text-accent text-[24px] font-semibold"
          >
            Отмена
          </button>
          <button
            onClick={() => onYes(currentCellVariant)}
            className="w-[342px] h-[72px] rounded-[24px] bg-accent text-white text-[24px] font-semibold"
          >
            Установить
          </button>
        </div>
      </div>
    </div>
  );
};

export default CellEditConfirmModal;
