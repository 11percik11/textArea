import { useState } from "react";
import styles from "./ModalFiles.module.css";
import type { Cell, FileType } from "../../../../types";
import { Icons } from "../../../icons";
import clsx from "clsx";
import { getFileExtensionFromPath } from "../../../../utils/getFileExtensionFromPath";
type Props = {
  documents: Cell["files"];
  selected: FileType | null;
  setSelected: (value: FileType | null) => void;
};

export const ModalFiles = ({ documents, selected, setSelected }: Props) => {
  const [open, setOpen] = useState(false);

  if (documents.length === 0) return null;

  const onClose = () => {
    setOpen(false);
    setSelected(null);
  };

  return (
    <div className={styles["modal-files-container"]}>
      <button
        className={styles["modal-files-open-button"]}
        hidden={open}
        onClick={() => setOpen(true)}
      >
        Файлы
      </button>
      <div hidden={!open} className={styles["modal-files-inner"]}>
        <div className={styles["modal-files-header"]}>
          <span>Файлы</span>
          <button className="size-[32px]" onClick={onClose}>
            <Icons.CloseIcon color="blue" />
          </button>
        </div>
        <div className={styles["modal-files-content"]}>
          {documents.map((document) => (
            <div
              onClick={() => setSelected(document)}
              className={clsx(
                styles["modal-files-content-item"],
                document.id === selected?.id && styles.active,
              )}
              key={document.id}
            >
              <div className={styles["modal-files-content-item__format-label"]}>
                .{getFileExtensionFromPath(document.file)}
              </div>
              <p>{document.file}</p>
            </div>
          ))}
        </div>
        <button
          onClick={() => setSelected(null)}
          hidden={!selected}
          className={styles["modal-files-content__cancel-button"]}
        >
          Закрыть файл
        </button>
      </div>
    </div>
  );
};
