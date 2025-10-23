import { useEffect } from "react";
import type { SpreadsheetCellEntity } from "../../../../store/SpreadsheetCellEntity";
import type { FileType } from "../../../../types";
import { getServerMediaUrl } from "../../../../utils/getServerMediaUrl";
import PdfReader from "../../PdfReader";
import { ModalGallery } from "../ModalGallery/ModalGallery";
import { ModalImage } from "../ModalImage/ModalImage";
type Props = {
  cell: SpreadsheetCellEntity;
  selectedDocument: FileType | null;
};
export const ModalMediaContent = ({ cell, selectedDocument }: Props) => {
  const testImages = [...cell.images].map((data) =>
    getServerMediaUrl(data.image),
  );

  if (selectedDocument) {
    const url = getServerMediaUrl(selectedDocument.file);
    return <PdfReader src={url}/>;
  }

  useEffect(() => {
    const desc = document.getElementById("desc");
    if(desc)
      desc.innerHTML = cell.description;
  }, []);

  return (
    <>
      {cell.type === "text" && (
        <div id={"desc"} style={{overflow: "auto"}} className="text-text font-normal text-[24px] leading-[120%] w-[1324px] h-[759px] text-wrap">
         {
          //сюда вставляется описание на 25ой строке
         }
        </div>
      )}
      {cell.type === "media" && cell.images.length === 1 ? (
        <ModalImage
          height="700px"
          src={getServerMediaUrl(cell.images[0].image)}
        />
      ) : null}
      {cell.type === "text-media" && cell.images.length === 1 ? (
        <>
          <ModalImage
            height="463px"
            src={getServerMediaUrl(cell.images[0].image)}
          />
          <div className="text-text font-normal text-[24px] leading-[120%] mt-[32px] text-wrap">
            {cell.description}
          </div>
        </>
      ) : null}
      {cell.type === "media" && cell.images.length > 1 ? (
        <ModalGallery
          images={testImages}
          // images={testImages.map((data) => getServerMediaUrl(data.image))}
        />
      ) : null}
    </>
  );
};
