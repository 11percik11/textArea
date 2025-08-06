import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import type { Cell, FileType, ImageType } from "../../../types";

export type ImageMedia = {
  id: string;
  file: File;
  image: string | ArrayBuffer | null | undefined;
  format: string;
};

export const useLocalFileLoad = () => {
  const [files, setFiles] = useState<ImageMedia[]>([]);

  const onFileLoad = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 8_388_608) {
      alert("Слишком большой файл");
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const media: ImageMedia = {
        id: uuidv4(),
        file,
        image: e.target?.result,
        format: file.type.split("/")[1],
      };
      console.log(e, media);

      setFiles((prev: ImageMedia[]) => [...prev, media]);
    };

    reader.onerror = (err) => {
      console.error("Ошибка чтения файла:", err);
    };

    reader.readAsDataURL(file);
    event.target.value = "";
  };

  const handleLocalFileDelete = (id: string) => {
    setFiles((prev: any) => prev.filter((file) => file.id !== id));
  };

  return {
    locallyLoadedFiles: files,
    onLocalFileLoad: onFileLoad,
    handleLocalFileDelete,
  };
};

export const useInitFileLoad = <T extends { id: number }>(files: T[]) => {
  const [initFiles, setInitFiles] = useState(files || []);

  const handleInitFileDelete = (id: number) => {
    setInitFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
  };

  return {
    initFiles,
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
