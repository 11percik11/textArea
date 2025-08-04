export interface Cell {
  id: number | null;
  sequence: number;
  title?: string; //можно не задавать на временной линии
  isTitleVisible: boolean;
  type: string;
  description: string;
  images: ImageType[];
  files: FileType[];
  isTitleHidden?: boolean;
  value?: string; //для временной линии
}

export interface FileType {
  id: number;
  media: string;
  mediaFile: string;
  cell: string;
}

export interface ImageType {
  id: number;
  image: string;
  imageFile: string;
  cell: string;
}

export interface Spreadsheet {
  id: number | null;
  title: string;
  rows: {
    id: number | null;
    title: string;
    color: string;
    sequence: number;
    isTimeScale: boolean;
    cells: {
      id: number | null;
      sequence: number;
      title: string;
      isTitleVisible: boolean;
      type: string;
      description: string;
      images: ImageType[];
      files: FileType[];
    }[];
  }[];
  parentCell: {
    id: number;
    title: string;
    sequence: number;
  };
}
