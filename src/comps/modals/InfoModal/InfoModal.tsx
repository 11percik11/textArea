import { useState } from "react";
import closeIcon from "../../../assets/icons/closeIcon.svg";
import type { Cell, FileType } from "../../../types";
import { ModalImage } from "./ModalImage/ModalImage";
import { getServerMediaUrl } from "../../../utils/getServerMediaUrl";
import { ModalGallery } from "./ModalGallery/ModalGallery";
import { ModalFiles } from "./ModalFiles/ModalFiles";
import { ModalMediaContent } from "./ModalMediaContent/ModalMediaContent";
import { Icons } from "../../icons";
import type { SpreadsheetCellEntity } from "../../../store/SpreadsheetCellEntity";
import style from "./InfoModal.module.scss";
import { useNavigate } from "react-router-dom";

enum ContentVariant {
  OneVideoOnly = "VideoOnly",
  OneImageOnly = "ImageOnly",
  TextOnly = "TextOnly",
  TextAndOneImage = "TextAndOneImage",
  TextAndMultipleImage = "TextAndMultipleImage",
  TextAndOneVideo = "TextAndOneVideo",
  MultipleVideo = "MultipleVideo",
  MultipleImage = "MultipleImage",
  Document = "Document",
}

const ContainerPxSize: Record<ContentVariant, string> = {
  [ContentVariant.OneVideoOnly]: "1544",
  [ContentVariant.OneImageOnly]: "1544",
  [ContentVariant.TextOnly]: "1388",
  [ContentVariant.TextAndOneImage]: "920",
  [ContentVariant.TextAndMultipleImage]: "920",
  [ContentVariant.TextAndOneVideo]: "920",
  [ContentVariant.MultipleImage]: "1076",
  [ContentVariant.MultipleVideo]: "1076",
  [ContentVariant.Document]: "1232",
};

const getLayoutVariant = (
  cell: SpreadsheetCellEntity,
  documentSelected: boolean,
): ContentVariant => {
  if (documentSelected) return ContentVariant.Document;
  if (cell.type === "media" && cell.images.length > 1)
    return ContentVariant.MultipleImage;
  if (cell.type === "media" && cell.images.length === 1)
    return ContentVariant.OneImageOnly;
  if (cell.type === "text") return ContentVariant.TextOnly;
  if (cell.type === "text-media" && cell.images.length > 1)
    return ContentVariant.TextAndMultipleImage;
  if (cell.type === "text-media" && cell.images.length === 1)
    return ContentVariant.TextAndOneImage;
  //todo add TextAndOneVideo/VideoOnly
  return ContentVariant.TextOnly;
};

type Props = {
  cell: SpreadsheetCellEntity;
  onClose: () => void;
};

const InfoModal = ({ onClose, cell }: Props) => {
  const [preClosed, setPreClosed] = useState(false);
  console.log("cell", cell);
  const navigate = useNavigate();
  const [selectedDocument, setSelectedDocument] = useState<FileType | null>(
    null,
  );

  console.log("selectedDocument", selectedDocument);

  const documents: FileType[] = [
    {
      file: "/",
      id: 1,
    },
  ];

  const currentLayoutVariant = getLayoutVariant(cell, !!selectedDocument);

  const toTable = () => {
    const cellIdToSpreadsheet: Record<string, number> = {
      ["177"]: -1,
      ["-10"]: -2,
      ["-11"]: -3,
      ["-12"]: -4,
    };
    const spreadsheetId = cellIdToSpreadsheet[cell.id.toString()];
    navigate(`/user-inner-table?id=${spreadsheetId}`);
  };

  console.log('curretn cell modal', cell.id)

  return (
    <div
      className={`${preClosed && "opacity-0"} duration-200 transition animate-appear w-full h-full bg-[#00000099] fixed top-0 left-0 z-10`}
    >
      <ModalFiles
        documents={documents}
        selected={selectedDocument}
        setSelected={setSelectedDocument}
      />
      <div
        className="mt-[32px] max-h-[1016px] p-[32px] rounded-[32px] bg-white mx-auto my-auto"
        style={{ width: ContainerPxSize[currentLayoutVariant] + "px" }}
      >
        <div className="w-full mb-[46px] min-h-[56px] flex justify-between items-center text-[32px] text-accent font-bold leading-[120%]">
          {cell.title}
          <div className="flex justify-between items-center gap-[12px]">
            {["177", "-10", "-11", "-12"].some(
              (value) => value === cell.id.toString(),
            ) && (
              <button className={style.toTableButton} onClick={toTable}>
                Перейти к таблице
                <Icons.TableLinkIcon color="#004662" className="size-[28px]" />
              </button>
            )}
            <button
              onClick={() => {
                setPreClosed(true);
                setTimeout(onClose, 200);
              }}
              className="size-[56px] rounded-[12px] bg-accent flex items-center justify-center"
            >
              <Icons.CloseIcon className="size-[32px]" color="#fff" />
            </button>
          </div>
        </div>
        <ModalMediaContent cell={cell} selectedDocument={selectedDocument} />
      </div>
    </div>
  );
};

export default InfoModal;
