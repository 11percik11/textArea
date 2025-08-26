import { Icons } from "../../icons";
import styles from "./TableLinkButton.module.css";
import { useNavigate } from "react-router-dom";

type Props = {
  spreadsheetId: number | null;
};

export const TableLinkButton = ({ spreadsheetId }: Props) => {
  const navigate = useNavigate();

  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    navigate(`/admin/table?id=${spreadsheetId}`);
  };

  return (
    <button className={styles.TableLinkButton} onClick={onClick}>
      <Icons.TableLinkIcon />
    </button>
  );
};
