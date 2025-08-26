import type { SpreadsheetRowEntity } from "../../../store/SpreadsheetRowEntity";
import OverlayLoader from "../../OverlayLoader/OverlayLoader";

type Props = {
  row: SpreadsheetRowEntity;
  onClick: VoidFunction;
  isLoading: boolean;
};

export const RowColorPicker = ({ row, onClick, isLoading }: Props) => {
  return (
    <div
      onClick={onClick}
      style={{ backgroundColor: row.color }}
      className={`absolute z-[100] size-[20px] outline-[1px] rounded-[4px] outline-offset-[1px] outline-accent bottom-[70px]`}
    >
      <OverlayLoader
        fullscreen={false}
        isLoading={isLoading}
        spinnerSizePx={20}
      />
    </div>
  );
};
