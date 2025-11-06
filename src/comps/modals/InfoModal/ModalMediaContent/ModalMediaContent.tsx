

import type { SpreadsheetCellEntity } from "../../../../store/SpreadsheetCellEntity";
import type { FileType } from "../../../../types";
import { getServerMediaUrl } from "../../../../utils/getServerMediaUrl";
import { ModalGallery } from "../ModalGallery/ModalGallery";
import PdfViewer from "../../PdfViewer/PdfViewer";
import { linkStore } from "../../../../store/LinkHref";
import './ModalMediaContent.scss';

type Props = {
  cell: SpreadsheetCellEntity;
  selectedDocument: FileType | null;
};


import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export const ModalMediaContent = ({ cell, selectedDocument }: Props) => {
  const navigate = useNavigate();
  const htmlRef = useRef<HTMLDivElement>(null);
  const PopupShow = linkStore.link.showHeader;
  const testImages = [...cell.images].map((data) => getServerMediaUrl(data.image));

  useEffect(() => {
    const el = htmlRef.current;
    if (!el) return;

    const onClick = (e: MouseEvent) => {

      if (el.classList.contains("no-links")) return;

      // ЛКМ без модификаторов
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const target = e.target as Element | null;
      const a = target?.closest<HTMLAnchorElement>("a[href]");
      if (!a || !el.contains(a)) return;

      // внешний переход/скачивание/новая вкладка — не трогаем
      const href = a.getAttribute("href") || "";
      if (a.target === "_blank" || a.hasAttribute("download")) return;
      const isExternal = /^(?:[a-z][a-z0-9+.-]*:)?\/\//i.test(href);
      if (isExternal) return;

      e.preventDefault();
      navigate(href);
    };

    el.addEventListener("click", onClick, true);
    return () => el.removeEventListener("click", onClick, true);
  }, [navigate]);

  if (selectedDocument) {
    const url = getServerMediaUrl(selectedDocument.file);
    return <PdfViewer url={`http://table-of-time.test.itlabs.top/api/${selectedDocument.file}`} key={url} />;
  }

  return (
    <div className="flex-1 overflow-auto flex flex-col gap-[16px]">
      {testImages.length > 0 && (
        <ModalGallery images={testImages} description={cell?.description} />
      )}
      <div
        ref={htmlRef}
        className={`${PopupShow && "no-links"} text-text font-normal text-[24px] leading-[120%] text-wrap`}
        dangerouslySetInnerHTML={{ __html: cell?.description }}
      />
    </div>
  );
};

