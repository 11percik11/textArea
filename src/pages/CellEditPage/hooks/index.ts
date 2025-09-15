import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";


export type LocalFileMedia = {
  id: string;
  file: File;
  url: string | ArrayBuffer | null | undefined;
  format: string;
  title: string;
};

const readFileAsDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("FileReader result is not a string"));
      }
    };

    reader.onerror = (err) => reject(err);

    reader.readAsDataURL(file);
  });
};

export const useLocalFileLoad = () => {
  const [files, setFiles] = useState<LocalFileMedia[]>([]);

  const handleLocalFileDelete = (id: string) => {
    //@ts-ignore
    setFiles((prev: any) => prev.filter((file) => file.id !== id));
  };

  return {
    locallyLoadedFiles: files,
    handleLocalFileDelete,
  };
};

export const useInitFileLoad = <T extends { id: number }>(
  files: T[],
  onLocalLoadEnd: (media: LocalFileMedia) => Promise<{
    id: number;
    sequence?: number;
    url: string;
  } | null>,
  onDelete: (mediaId: number) => Promise<boolean>,
) => {
  const [initFiles, setInitFiles] = useState(files || []);

  const handleInitFileDelete = async (id: number) => {
    const res = await onDelete(id);
    if (!res) return;
    setInitFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
  };

  const onLocalFileLoad = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 8_388_608) {
      alert("Слишком большой файл");
      return;
    }

    try {
      const dataUrl = await readFileAsDataURL(file);

      const media: LocalFileMedia = {
        id: uuidv4(),
        file,
        url: dataUrl,
        format: file.type.split("/")[1],
        title: file.name,
      };

      const result = await onLocalLoadEnd(media);
      if (!result) return;

      console.log(`output->result!!!!`, result, initFiles);
//@ts-ignore
      setInitFiles((prev) => [...prev, result]);
    } catch (err) {
      console.error("Ошибка чтения файла:", err);
    } finally {
      event.target.value = "";
    }
  };

  useEffect(() => {
    console.log(`INIT FILES->result!!!!`, initFiles);
  }, [initFiles, initFiles.length]);

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
//@ts-ignore
export const useAllFiles = (initFiles, locallyLoadedFiles) => {
  const [allFiles, setAllFiles] =
    useState<{ id: string | number; image: string }[]>(initFiles);
//@ts-ignore
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
