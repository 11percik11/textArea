import { useState } from "react";
//import closeIcon from "../../../assets/icons/closeIcon.svg";
import type { FileType } from "../../../types";
//import { ModalImage } from "./ModalImage/ModalImage";
//import { getServerMediaUrl } from "../../../utils/getServerMediaUrl";
//import { ModalGallery } from "./ModalGallery/ModalGallery";
import { ModalFiles } from "./ModalFiles/ModalFiles";
import { ModalMediaContent } from "./ModalMediaContent/ModalMediaContent";
import { Icons } from "../../icons";
import type { SpreadsheetCellEntity } from "../../../store/SpreadsheetCellEntity";
import style from "./InfoModal.module.scss";
import { useNavigate } from "react-router-dom";
import { linkStore } from "../../../store/LinkHref";

//@ts-ignore
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
  [ContentVariant.OneVideoOnly]: "1076",
  [ContentVariant.OneImageOnly]: "1076",
  [ContentVariant.TextOnly]: "1232",
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
  // console.log("cell", cell);
  const navigate = useNavigate();
  const [selectedDocument, setSelectedDocument] = useState<FileType | null>(
    null,
  );
  const PopupShow = linkStore.link.showHeader;

  const currentLayoutVariant = getLayoutVariant(cell, !!selectedDocument);

  const toTable = () => {
    navigate(`/user-inner-table?id=${cell.children?.id}`);
  };
  return (
    <div
      className={`${preClosed && "opacity-0"} ${PopupShow ? "pt-[100px]" : "pt-[32px]"} duration-200 transition animate-appear w-full h-full bg-[#00000099] fixed top-0 left-0 z-10 flex justify-center`}
    >
      <ModalFiles
        documents={cell.files}
        selected={selectedDocument}
        setSelected={setSelectedDocument}
      />
      <div
        className={`${cell.description ? "max-h-[1016px]" : cell.images.length > 1 ? "max-h-[1016px]" : "max-h-[931px]"} h-fit p-[32px] rounded-[32px] bg-white flex flex-col`}
        style={{ width: ContainerPxSize[currentLayoutVariant] + "px" }}
      >
        <div className="w-full mb-[32px] min-h-[56px] flex justify-between items-center text-[32px] text-accent font-bold leading-[120%]">
          <div>{cell.title}</div>
          <div className="flex justify-between items-center gap-[12px] mb-auto">
            {cell.children?.id && (
              <button className={style.toTableButton} onClick={toTable}>
                Перейти к таблице
                <Icons.TableLinkIcon color="#004662" className="size-[28px]" />
              </button>
            )}
            <button
              onClick={() => {
                setPreClosed(true);
                setTimeout(() => {
                  onClose();
                }, 200);

                const params = new URLSearchParams(location.search);
                // удаляем параметры (не важно, были 4/1 или любые другие)
                params.delete("rowIndex");
                params.delete("cellIndex");

                navigate(
                  {
                    pathname: location.pathname,
                    search: params.toString() ? `?${params.toString()}` : "",
                  },
                  { replace: true }, // не сохранять этот шаг в истории
                );
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
