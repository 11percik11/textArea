import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import type { Cell, FileType, ImageType } from "../../../types";
import { addCellFile } from "../../../api/spreadsheetCell";

export type LocalFileMedia = {
  id: string;
  file: File;
  image: string | ArrayBuffer | null | undefined;
  format: string;
  title: string;
};

export const useLocalFileLoad = () => {
  const [files, setFiles] = useState<LocalFileMedia[]>([]);

  const handleLocalFileDelete = (id: string) => {
    setFiles((prev: any) => prev.filter((file) => file.id !== id));
  };

  return {
    locallyLoadedFiles: files,
    handleLocalFileDelete,
  };
};

export const useInitFileLoad = <T extends { id: number }>(
  files: T[],
  onLocalLoadEnd: (media: LocalFileMedia) => Promise<void>,
) => {
  const [initFiles, setInitFiles] = useState(files || []);

  const handleInitFileDelete = (id: number) => {
    setInitFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
  };

  const onLocalFileLoad = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 8_388_608) {
      alert("Слишком большой файл");
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const media: LocalFileMedia = {
        id: uuidv4(),
        file,
        image: e.target?.result,
        format: file.type.split("/")[1],
        title: file.name,
      };
      console.log(e, media);
      onLocalLoadEnd(media);
      // setInitFiles((prev) => [...prev, media]);
    };

    reader.onerror = (err) => {
      console.error("Ошибка чтения файла:", err);
    };

    reader.readAsDataURL(file);
    event.target.value = "";
  };

  const reorderFiles = (items: any[]) => {
    setInitFiles(items);
  };

  return {
    initFiles,
    onLocalFileLoad,
    reorderFiles,
    handleInitFileDelete,
  };
};

export const useAllFiles = (initFiles, locallyLoadedFiles) => {
  const [allFiles, setAllFiles] =
    useState<{ id: string | number; image: string }[]>(initFiles);

  const reorderFiles = (items: ImageMedia[]) => {
    setAllFiles(items);
  };

  useEffect(() => {
    setAllFiles([...initFiles, ...locallyLoadedFiles]);
  }, [locallyLoadedFiles.length, initFiles.length]);

  return {
    allFiles,
    reorderFiles,
  };
};
