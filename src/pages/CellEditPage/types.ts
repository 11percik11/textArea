import type { FileType, ImageType } from "../../types";

export type MediaData = {
  keepFilesIds: number[];
  newFiles: ImageType[] | FileType[]
};
