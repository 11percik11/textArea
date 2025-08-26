import type { CellEntity } from "../../../../store/CellEntity";
import type { Cell, FileType } from "../../../../types";
import { getServerMediaUrl } from "../../../../utils/getServerMediaUrl";
import PdfReader from "../../PdfReader";
import { ModalGallery } from "../ModalGallery/ModalGallery";
import { ModalImage } from "../ModalImage/ModalImage";
type Props = {
  cell: CellEntity;
  selectedDocument: FileType | null;
};
export const ModalMediaContent = ({ cell, selectedDocument }: Props) => {
  const testImages = [...cell.images].map((data) =>
    getServerMediaUrl(data.image),
  );

  if (selectedDocument) {
    const url = getServerMediaUrl(selectedDocument.file);
    return <PdfReader src={url} />;
  }

  return (
    <>
      {cell.type === "text" && (
        <div className="text-text font-normal text-[24px] leading-[120%] mt-[32px] w-[1324px] h-[770px] text-wrap">
          {cell.description}
        </div>
      )}
      {cell.type === "media" && cell.images.length === 1 ? (
        <ModalImage
          height="830px"
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
