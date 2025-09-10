//import { useEffect, useImperativeHandle, useState, type Ref } from "react";
//import type { Cell, ImageType } from "../../../types";
import deleteIcon from "../../../assets/icons/deleteIcon.svg";

import { SortableList } from "../../../comps/modals/SortableList";
import { DragHandleContainer } from "../../../comps/modals/SortableList/components/SortableItem/SortableItem";
import CellEditAddFileButton from "../CellEditAddFileButton/CellEditAddFileButton";
import {
  //useLocalFileLoad,
  useInitFileLoad,
  //type ImageMedia,
  //useAllFiles,
} from "../hooks";
//import type { MediaData } from "../types";
//import { isLocalAddedMedia } from "../../../utils/isLocalAddedMedia";
import { getFileExtensionFromPath } from "../../../utils/getFileExtensionFromPath";
import type { SpreadsheetCellEntity } from "../../../store/SpreadsheetCellEntity";
//import { cellStore } from "../../../store/root";
//import type { SpreadsheetCellEntity } from "../../../store/SpreadsheetCellEntity";
type Props = {
  cell: SpreadsheetCellEntity;
};

export const CellEditMedia = ({ cell }: Props) => {
  const { handleInitFileDelete, initFiles, reorderFiles, onLocalFileLoad } =
    useInitFileLoad(
      cell.images,
      cell.addCellImageHandler,
      cell.deleteCellImageHandler,
    );
  //@ts-ignore
    const apiUrl = window.__API_CONFIG__.apiUrl;
  console.log("images", cell.images);

  const resolveBackgroundImage = (url: string) => {
    return (apiUrl + url);
  };

  return (
    <>
      <span className="text-[16px] text-accent font-bold">Медиа</span>
      <div
        // hidden={images.length === 0 && locallyLoadedFiles.length === 0}
        className="mt-[8px] w-[1184px]  flex gap-[8px]"
      >
        {/* {images.map(() => (
          <div className="size-[120px] rounded-[14px] bg-black"></div>
        ))} */}

        <SortableList
          className="flex gap-[5px] h-auto flex-wrap"
          items={initFiles}
          onChange={reorderFiles}
          renderItem={(item, index) => (
            <SortableList.Item id={item.id}>
              <div
                className="size-[120px] rounded-[14px] bg-black p-[8px] relative"
                style={{
                  backgroundImage: `url(${resolveBackgroundImage(item?.image || item?.url)})`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              >
                {index != null && (
                  <p className="absolute top-[8px] left-[8px] w-[32px] h-[32px] rounded-[16px] bg-[rgba(255,255,255,0.8)] text-black flex items-center justify-center text-[12px] font-bold">
                    {index}
                  </p>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent event from bubbling to drag handlers
                    e.preventDefault();
                    handleInitFileDelete(item.id);
                  }}
                  className="absolute z-10 bottom-[8px] right-[8px] size-[32px] rounded-[6px] bg-white"
                >
                  <img src={deleteIcon} alt="add" className="size-[32px]" />
                </button>
                <p className="absolute bottom-[8px] left-[8px] p-[10px] h-[32px] rounded-[16px] bg-[rgba(255,255,255,0.8)] text-black flex items-center justify-center text-[12px] font-bold">
                  {getFileExtensionFromPath(item?.image || item?.url)}
                </p>
                <DragHandleContainer>
                  <div className="absolute inset-0 w-full h-full"></div>
                </DragHandleContainer>
              </div>
            </SortableList.Item>
          )}
        />

        {/* {newImages?.map((media, index) => (
          
            ))} */}
      </div>
      <div className="w-[1184px] h-[80px] mt-[16px]">
        <div className="w-[413px] h-[16px] flex gap-[12px]">
          {[
            ".jpeg",
            ".png",
            ".mp4",
            ".mov",
            ".avi",
            ".webp",
            ".webm",
            ".gif",
          ].map((format, index) => (
            <div key={index} className="font-bold text-[16px] text-[#C9C9C9]">
              {format}
            </div>
          ))}
        </div>
        <CellEditAddFileButton
          onFileLoad={onLocalFileLoad}
          accept=".png, .jpeg, .mp4, .mov, .avi, .jpg, .wepb, .webm, .gif"
        />
      </div>
    </>
  );
};
