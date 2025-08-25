import {
  addCellImage,
  deleteCellDocument,
  deleteCellImage,
  updateCellContent,
} from "./../api/spreadsheetCell";
import { action, computed, makeAutoObservable, runInAction } from "mobx";
import { postSpreadsheet } from "../api/spreadsheet";
import { addCellDocument, updateCellVariant } from "../api/spreadsheetCell";
import type { Cell } from "../types";
import type { LocalFileMedia } from "../pages/CellEditPage/hooks";

export class CellEntity {
  constructor(cell: Cell) {
    this.raw = cell;
    makeAutoObservable(this);
  }

  isLoading = false;

  raw: Cell;

  get id() {
    return this.raw.id;
  }

  get title() {
    return this.raw.title;
  }

  get description() {
    return this.raw.description;
  }

  get type() {
    return this.raw.type;
  }

  get images() {
    return this.raw.images;
  }

  get files() {
    return this.raw.files;
  }

  get spreadsheetParentId() {
    return this.raw.children?.id;
  }

  update = (cell: Cell) => {
    this.raw = cell;
  };

  assignUpdate = (cell: Partial<Cell>) => {
    this.raw = { ...this.raw, ...cell };
  };

  setLoading = (value: boolean) => (this.isLoading = value);

  updateType = async (variant: Cell["type"]) => {
    this.isLoading = true;
    try {
      const res = await updateCellVariant(this.id, variant);
      if (!res) return;
      this.assignUpdate(res.cell);
      return true;
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

  updateCellTextContentHandler = async (data: {
    title: string;
    description: string;
  }) => {
    // this.isLoading = true;
    try {
      const res = await updateCellContent(this.id, data);
      if (!res) return;
      this.assignUpdate(data);
      return true;
    } finally {
      runInAction(() => {
        // this.isLoading = false;
      });
    }
  };

  addCellImageHandler = async (media: LocalFileMedia) => {
    this.isLoading = true;
    try {
      const result = await addCellImage(media, this.id);
      return result;
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

  addCellDocumentHandler = async (media: LocalFileMedia) => {
    console.log(`addCellDocumentHandler->`, media, this.id, this.raw);
    this.isLoading = true;
    try {
      const result = await addCellDocument(media, this.id);
      if (!result) return null;
      return result?.file;
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

  deleteCellImageHandler = async (mediaId: number): Promise<boolean> => {
    this.isLoading = true;
    try {
      const res = await deleteCellImage(mediaId);
      return !!res;
    } catch (err) {
      console.error("Failed to delete image:", err);
      return false;
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

  deleteCellDocumentHandler = async (mediaId: number): Promise<boolean> => {
    this.isLoading = true;
    try {
      const res = await deleteCellDocument(mediaId);
      return !!res;
    } catch (err) {
      console.error("Failed to delete document:", err);
      return false;
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };
}
