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
import printIcon from "../../../assets/icons/printIcon.svg"
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

    //@ts-ignore
    const apiUrl = window.__API_CONFIG__.apiUrl;
    const handlePrint = async (pdfUrl: string) => {
      //setIsLoading(true);
      const pdfPath = "http://localhost:4000/proxy?url=" + apiUrl + pdfUrl;
      try {
        // Используем абсолютный URL через прокси
        const proxyUrl = `${pdfPath}`;
        
        // Скачиваем через fetch (это точно работает с прокси)
        const response = await fetch(proxyUrl, {
          headers: {
            'Accept': 'application/pdf'
          }
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        
        // Создаем iframe с blob URL (без CORS)
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = blobUrl;
        
        document.body.appendChild(iframe);
        
        iframe.onload = () => {
          const iframeWindow = iframe.contentWindow;
          setTimeout(() => {
            iframeWindow!.print();
            // Очистка
            setTimeout(() => {
              URL.revokeObjectURL(blobUrl);
              document.body.removeChild(iframe);
              //setIsLoading(false);
            }, 1000000);
          }, 500);
        };
        
      } catch (error) {
        console.error('Ошибка печати:', error);
        //setIsLoading(false);
        // Fallback: открываем через прокси в новой вкладке
        window.open(`${pdfPath}`, '_blank');
      }
    };

    
  return (
    <div className={`w-[296px] ${height} bg-white rounded-[24px] p-[16px] relative flex-1`}>
      <div className="text-[32px] text-accent font-bold text-center">Файлы</div>
      <div className="w-[264px] h-[556px] overflow-y-auto overflow-x-hidden">
        <SortableList
          className="flex gap-[5px] flex-col"
          items={initFiles}
          onChange={reorderFiles}
          renderItem={({ id, file, /*format*/ }, index) => (
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
                    #{index!+1 || ""}
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
                    onClick={() => {
                      handlePrint(file);
                    }}
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
