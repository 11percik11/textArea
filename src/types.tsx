export interface Cell {
  id: number;
  sequence: number;
  title?: string; //можно не задавать на временной линии
  isTitleVisible: boolean;
  type: "text" | "text-media" | "media" | "table";
  description: string;
  images: ImageType[];
  children: null | {
    id: number;
  };
  files: FileType[];
  isTitleHidden?: boolean;
  value?: string; //для временной линии
}

export interface FileType {
  id: number;
  file: string;
}

export interface ImageType {
  id: number;
  image: string;
}

export interface SpreadsheetRow {
  id: number;
  title: string;
  color: string;
  sequence: number;
  isTimeScale: boolean;
  cells: Cell[];
}

export interface Spreadsheet {
  id: number;
  title: string;
  rows: SpreadsheetRow[];
  parentCell: {
    id: number;
    title: string;
    sequence: number;
  };
}
