import type { SpreadsheetRowEntity } from "../../../store/SpreadsheetRow";

type Props = {
  row: SpreadsheetRowEntity;
  onClick: VoidFunction;
};

export const RowColorPicker = ({ row, onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      style={{ backgroundColor: row.color }}
      className={`absolute z-[100] size-[20px] outline-[1px] rounded-[4px] outline-offset-[1px] outline-accent bottom-[70px]`}
    />
  );
};
