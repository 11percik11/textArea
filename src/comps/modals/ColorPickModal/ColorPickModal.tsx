import { useEffect, useState } from "react";
import style from "./ColorPickModal.module.scss";
import clsx from "clsx";
import type { SpreadsheetRowEntity } from "../../../store/SpreadsheetRowEntity";

const palette = [
  { color: "rgba(255, 255, 255, 1)" },
  { color: "rgba(249, 249, 249, 1)" },
  { color: "rgba(199, 222, 230, 1)" },
  { color: "rgba(232, 246, 255, 1)" },
  { color: "rgba(250, 255, 215, 1)" },
  { color: "rgba(255, 231, 211, 1)" },
  { color: "rgba(216, 255, 197, 1)" },
  { color: "rgba(212, 237, 218, 1)" },
];
type Props = {
  row: SpreadsheetRowEntity | null;
  onClose: VoidFunction;
};
const ColorPickModal = ({ row, onClose }: Props) => {

  const onNo = () => {
    onClose();
  };
  const onYes = async () => {
    row?.updateColor(currentColor);
    onClose();
  };

  const [currentColor, setCurrentColor] = useState(row?.color || "");

  useEffect(() => {
    if (!row) return;
    setCurrentColor(row?.color);
  }, [row]);

  return (
    <div
      hidden={!row}
      className="z-100 animate-appear w-full h-full fixed bg-[#00000099] top-0 left-0 flex items-center justify-center"
    >
      <div className="bg-white rounded-[32px] p-[32px]">
        <div className="text-[32px] text-accent font-bold leading-[120%] text-center">
          Выбор цвета строки
        </div>
        <div className={style["ColorPickModal__choice"]}>
          {palette.map(({ color }) => (
            <div
              key={color}
              onClick={() => setCurrentColor(color)}
              className={clsx([
                style["ColorPickModal__choice-item"],
                color === currentColor &&
                  style["ColorPickModal__choice-item_active"],
              ])}
              style={{
                backgroundColor: color,
              }}
            ></div>
          ))}
        </div>
        <div className="flex mt-[32px] gap-[16px]">
          <button
            onClick={onNo}
            className="w-[342px] h-[72px] rounded-[24px] border-[2px] border-accent bg-white text-accent text-[24px] font-semibold"
          >
            Закрыть
          </button>
          <button
            onClick={onYes}
            className="w-[342px] h-[72px] rounded-[24px] bg-accent text-white text-[24px] font-semibold"
          >
            Применить
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColorPickModal;
