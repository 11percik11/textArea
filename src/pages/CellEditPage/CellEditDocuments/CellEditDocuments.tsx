//import { useEffect, useImperativeHandle, type Ref } from "react";
//import refreshIcon from "../../../assets/icons/Refresh.svg";
import deleteIcon from "../../../assets/icons/deleteIcon.svg";
import { SortableList } from "../../../comps/modals/SortableList";
import { DragHandleContainer } from "../../../comps/modals/SortableList/components/SortableItem/SortableItem";
//import type { FileType } from "../../../types";
import CellEditAddFileButton from "../CellEditAddFileButton/CellEditAddFileButton";
import { /*useAllFiles, useLocalFileLoad,*/ useInitFileLoad } from "../hooks";
//import type { MediaData } from "../types";
import { observer } from "mobx-react-lite";
//import { cellStore } from "../../../store/root";
import type { SpreadsheetCellEntity } from "../../../store/SpreadsheetCellEntity";
//import { toJS } from "mobx";
import printIcon from "../../../assets/icons/printIcon.svg";
import { useState } from "react";
type Props = {
  cell: SpreadsheetCellEntity;
  height: string;
};

export const CellEditDocuments = observer(({ cell, height }: Props) => {
  const { handleInitFileDelete, initFiles, reorderFiles, onLocalFileLoad } =
    useInitFileLoad(
      cell.files,
      cell.addCellDocumentHandler,
      cell.deleteCellDocumentHandler,
    );

  const [isBusy, setIsBusy] = useState(false);

  //@ts-ignore
  const apiUrl = window.__API_CONFIG__.apiUrl;

  const BASE = "http://table-of-time.test.itlabs.top/api/cell";

  // 2) Нормализуем путь: убираем ведущие "cell/", двойные слеши и пробелы по краям
  const normalizePath = (p: string) =>
    (p || "")
      .trim()
      .replace(/^\/?cell\//i, "/") // <-- удаляем "cell/"
      .replace(/\/{2,}/g, "/"); // сжимаем множественные "/"

  // 3) Абсолютный URL
  const absUrl = (p: string) => {
    const np = normalizePath(p);
    return /^https?:\/\//i.test(np)
      ? np
      : `${BASE}${np.startsWith("/") ? "" : "/"}${np}`;
  };

  // 4) Расширение
  const ext = (p: string) => (p.split(".").pop() || "").toLowerCase();

  // 5) Имя файла для отображения

  // 6) Печать PDF/изображений через Blob + iframe
  async function printBlobUrl(url: string) {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const blob = await res.blob();
    const blobUrl = URL.createObjectURL(blob);

    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";
    document.body.appendChild(iframe);

    await new Promise<void>((resolve) => {
      iframe.onload = () => {
        const w = iframe.contentWindow!;
        const mm = w.matchMedia ? w.matchMedia("print") : null;

        const cleanup = () => {
          // снять слушатели
          w.removeEventListener?.("afterprint", onAfterPrint);
          if (mm) {
            if ((mm as any).removeEventListener) {
              mm.removeEventListener("change", onMMChange as any);
            } else {
              mm.removeListener(onMMChange as any);
            }
          }
          window.removeEventListener("focus", onParentFocus);

          // освободить ресурсы
          URL.revokeObjectURL(blobUrl);
          iframe.remove();
          resolve();
        };

        const onAfterPrint = () => cleanup();

        const onMMChange = (e: MediaQueryListEvent | { matches: boolean }) => {
          // событие "print" → "screen"
          if (!("matches" in e) || !e.matches) cleanup();
        };

        const onParentFocus = () => cleanup(); // когда диалог печати закрыт — фокус вернулся

        // слушатели ДО вызова print()
        w.addEventListener?.("afterprint", onAfterPrint, { once: true });
        if (mm) {
          if ((mm as any).addEventListener) {
            mm.addEventListener("change", onMMChange as any);
          } else {
            mm.addListener(onMMChange as any);
          }
        }
        window.addEventListener("focus", onParentFocus, { once: true });

        // печать
        w.focus();
        w.print();
      };

      // назначаем src после onload-колбэка
      iframe.src = blobUrl;
    });
  }

  // 7) Office viewer для doc/xls
  function openOfficeViewer(url: string) {
    const viewer = `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(url)}`;
    window.open(viewer, "_blank");
  }

  // 8) Главный обработчик печати
  async function handlePrint(filePath: string) {
    if (isBusy) return; // уже идёт запрос — выходим
    setIsBusy(true);
    try {
      const url = absUrl(filePath);
      const e = ext(filePath);

      if (["pdf", "png", "jpg", "jpeg", "gif", "svg", "webp"].includes(e)) {
        await printBlobUrl(url);
      } else if (["doc", "docx", "xls", "xlsx"].includes(e)) {
        openOfficeViewer(url);
      } else {
        window.open(url, "_blank");
      }
    } catch (err) {
      console.error("Ошибка печати:", err);
    } finally {
      setIsBusy(false); // снимаем замок
    }
  }

  return (
    <div
      className={`w-[296px] ${height} bg-white rounded-[24px] p-[16px] relative flex-1`}
    >
      <div className="text-[32px] text-accent font-bold text-center">Файлы</div>
      <div className="w-[264px] h-[556px] overflow-y-auto overflow-x-hidden">
        <SortableList
          className="flex gap-[5px] flex-col"
          items={initFiles}
          onChange={reorderFiles}
          renderItem={({ id, file /*format*/ }, index) => (
            <SortableList.Item id={id}>
              <div
                key={id}
                className="relative w-full mt-[16px] max-w-[264px] h-[106px] rounded-[14px] bg-[#0046621A] p-[16px]"
              >
                <DragHandleContainer>
                  <div className="absolute inset-0 w-full h-full"></div>
                </DragHandleContainer>
                <div className="flex w-full justify-between font-normal text-text text-[16px] mb-[8px] items-center">
                  <div className="size-[32px] bg-[#FFFFFF80] rounded-full flex justify-center items-center">
                    #{index! + 1 || ""}
                  </div>
                  <div className="ml-[8px] text-[12px] font-bold w-[49px] h-[32px] rounded-[17px] bg-[#FFFFFF80] flex text-center justify-center items-center">
                    .{file?.split(".")[1] || ""}
                  </div>
                  <button
                    onClick={() => {
                      handleInitFileDelete(id);
                    }}
                    className="ml-[71px] size-[34px] rounded-[6px] bg-white flex items-center justify-center"
                  >
                    <img
                      src={deleteIcon}
                      alt="refresh"
                      className="size-[24px] z-10"
                    />
                  </button>
                  <button
                    onClick={() => handlePrint(file)}
                    className="ml-[16px] z-10 size-[34px] rounded-[6px] bg-white flex items-center justify-center"
                  >
                    <img
                      src={printIcon}
                      alt="refresh"
                      className="size-[24px] z-10"
                    />
                  </button>
                </div>
                <div className="mt-[8px] w-[228px] h-[32px] text-[#464646] text-wrap overflow-hidden">
                  {file?.split("/")[1] || ""}
                </div>
              </div>
            </SortableList.Item>
          )}
        />
      </div>
      <div className="absolute bottom-0 mb-[16px] ">
        <div className="mt-[16px] w-[264px] h-[16px] text-[16px] text-[#C9C9C9] font-bold text-center flex gap-[12px] items-center justify-center">
          <div>.doc</div>
          <div>.docx</div>
          <div>.xlsx</div>
          <div>.xls</div>
          <div>.pdf</div>
        </div>
        <CellEditAddFileButton
          accept=".doc, .docx, .xlsx, .xls, .pdf"
          onFileLoad={onLocalFileLoad}
        />
      </div>
    </div>
  );
});
