import { Icons } from "../../icons";
import styles from "./TableLinkButton.module.css";
import { useNavigate } from "react-router-dom";

type Props = {
  cellId: number;
};

export const TableLinkButton = ({ cellId }: Props) => {
  const navigate = useNavigate();

  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    navigate(`/admin/table?cell_id=${cellId}`);
  };

  return (
    <button className={styles.TableLinkButton} onClick={onClick}>
      <Icons.TableLinkIcon />
    </button>
  );
};
