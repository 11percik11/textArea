import { useEffect, useImperativeHandle, type Ref } from "react";
import refreshIcon from "../../../assets/icons/Refresh.svg";
import deleteIcon from "../../../assets/icons/deleteIcon.svg";
import { SortableList } from "../../../comps/modals/SortableList";
import { DragHandleContainer } from "../../../comps/modals/SortableList/components/SortableItem/SortableItem";
import type { FileType } from "../../../types";
import CellEditAddFileButton from "../CellEditAddFileButton/CellEditAddFileButton";
import { useAllFiles, useInitFileLoad, useLocalFileLoad } from "../hooks";
import type { MediaData } from "../types";
import { observer } from "mobx-react-lite";
import { cellStore } from "../../../store/root";
import type { SpreadsheetCellEntity } from "../../../store/SpreadsheetCellEntity";
import { toJS } from "mobx";

type Props = {
  cell: SpreadsheetCellEntity;
};

export const CellEditDocuments = observer(({ cell }: Props) => {
  const { handleInitFileDelete, initFiles, reorderFiles, onLocalFileLoad } =
    useInitFileLoad(
      cell.files,
      cell.addCellDocumentHandler,
      cell.deleteCellDocumentHandler,
    );

  return (
    <div className="w-[296px] h-[740px] bg-white rounded-[24px] mt-[16px] p-[16px]">
      <div className="text-[32px] text-accent font-bold text-center">Файлы</div>
      <div className="w-[264px] h-[556px] overflow-y-auto overflow-x-hidden">
        <SortableList
          className="flex gap-[5px] flex-col"
          items={initFiles}
          onChange={reorderFiles}
          renderItem={({ id, file, format }, index) => (
            <SortableList.Item id={id}>
              <div
                key={id}
                className="relative w-full mt-[16px] max-w-[264px] h-[106px] rounded-[14px] bg-[#0046621A] p-[16px]"
              >
                <DragHandleContainer>
                  <div className="absolute inset-0 w-full h-full"></div>
                </DragHandleContainer>
                <div className="flex w-full justify-between font-normal text-text text-[16px] mb-[8px]">
                  {id}
                  <div className="text-[12px] font-bold w-[49px] h-[32px] rounded-[17px] bg-[#FFFFFF80] flex text-center justify-center items-center">
                    Документ {index}
                  </div>
                </div>
                <div className="flex w-full justify-between font-normal text-text text-[16px] mb-[8px]">
                  <button className="size-[34px] rounded-[6px] bg-white flex items-center justify-center">
                    <img
                      src={refreshIcon}
                      alt="refresh"
                      className="size-[24px]"
                    />
                  </button>
                  <button
                    onClick={() => {
                      handleInitFileDelete(id);
                    }}
                    className="size-[34px] rounded-[6px] bg-white flex items-center justify-center"
                  >
                    <img
                      src={deleteIcon}
                      alt="refresh"
                      className="size-[24px] z-10"
                    />
                  </button>
                </div>
              </div>
            </SortableList.Item>
          )}
        />
      </div>
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
  );
});
