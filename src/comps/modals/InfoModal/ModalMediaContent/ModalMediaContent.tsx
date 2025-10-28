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
    return <PdfReader src={url} />;
  }

  useEffect(() => {
    const desc = document.getElementById("desc");
    if (desc) desc.innerHTML = cell.description;
  }, []);

  return (
    <div className="flex-1 overflow-auto flex flex-col gap-[16px]">
      {testImages.length > 0 && <ModalGallery images={testImages} description={cell?.description} />}
      <div
        className="text-text font-normal text-[24px] leading-[120%] text-wrap"
        dangerouslySetInnerHTML={{ __html: cell?.description }}
      />
    </div>
  );
};
