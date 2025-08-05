import { useContext, useEffect, useState } from "react";
import type { Cell, ImageType } from "../../../types";
import addIcon from "../../../assets/icons/addIcon.svg";
import deleteIcon from "../../../assets/icons/deleteIcon.svg";
import { v4 as uuidv4 } from "uuid";
import { useSortableMedia } from "./hooks";
import { SortableOverlay } from "../../../comps/modals/SortableList/components";
import { DndContext } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { SortableList } from "../../../comps/modals/SortableList";
import { DragHandleContainer } from "../../../comps/modals/SortableList/components/SortableItem/SortableItem";
type Props = {
  data: Cell;
};
type ImageMedia = {
  id: string;
  file: File;
  preview: string | ArrayBuffer | null | undefined;
  format: string;
};
export const CellEditMedia = ({ data }: Props) => {
  const [images, setImages] = useState(data?.images || []);
  const [newImages, setNewImages] = useState<ImageMedia[]>([]);

  const onChangePosition = (items: ImageMedia[]) => {
    setNewImages(items);
  };

  const onFileLoad = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0].size > 8388608) {
      alert("Слишком большой файл");
      return;
    }

    console.log("event.target.files", event.target.files);

    const files = Array.from(event.target.files || []);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileToAdd: ImageMedia = {
          id: uuidv4(),
          file,
          preview: e.target?.result,
          format: file.type.split("/")[1],
        };
        setNewImages((prev: any) => [...prev, fileToAdd]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDelete = (index: number, isNewImage: boolean) => {
    if (isNewImage) {
      setNewImages((prev: any) =>
        prev.filter((_: any, i: number) => i !== index),
      );
    } else {
      setImages((prev: ImageType[]) => prev.filter((_, i) => i !== index));
    }
  };

  useEffect(() => {
    console.log("newImages", newImages);
  });

  return (
    <>
      <span className="text-[16px] text-accent font-bold">Медиа</span>
      <div
        hidden={images.length === 0 && newImages.length === 0}
        className="mt-[8px] w-[1184px] h-[128px] flex gap-[8px]"
      >
        {images.map(() => (
          <div className="size-[120px] rounded-[14px] bg-black"></div>
        ))}

        <SortableList
          className="flex gap-[5px]"
          items={newImages}
          onChange={onChangePosition}
          renderItem={(item, index) => (
            <SortableList.Item id={item.id}>
              <div
                key={item.id}
                className="size-[120px] rounded-[14px] bg-black p-[8px] relative"
                style={{
                  backgroundImage: `url(${item.preview})`,
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
                    handleDelete(index, true);
                  }}
                  className="absolute z-10 bottom-[8px] right-[8px] size-[32px] rounded-[6px] bg-white"
                >
                  <img src={deleteIcon} alt="add" className="size-[32px]" />
                </button>
                <p className="absolute bottom-[8px] left-[8px] p-[10px] h-[32px] rounded-[16px] bg-[rgba(255,255,255,0.8)] text-black flex items-center justify-center text-[12px] font-bold">
                  {item.format}
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
        <button className="disabled:opacity-[20%] mt-[8px] w-[264px] h-[56px] rounded-[12px] bg-accent text-[20px] text-white font-semibold flex gap-[12px] items-center justify-center relative">
          <input
            accept=".png, .jpeg, .mp4, .mov, .avi, .jpg, .wepb, .webm, .gif"
            hidden={false}
            id="imgInput"
            type="file"
            className="w-full h-full absolute opacity-0"
            onChange={onFileLoad}
          />
          <img src={addIcon} alt="add" className="size-[32px]" />
          Добавить
        </button>
      </div>
    </>
  );
};
