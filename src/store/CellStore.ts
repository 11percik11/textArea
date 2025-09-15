import {
  addCellImage,
  deleteCellDocument,
  deleteCellImage,
  updateCellContent,
} from "./../api/spreadsheetCell";
//@ts-ignore
import { action, computed, makeAutoObservable, runInAction } from "mobx";
import { postSpreadsheet } from "../api/spreadsheet";
import { addCellDocument, updateCellVariant } from "../api/spreadsheetCell";
import type { Cell } from "../types";
import type { LocalFileMedia } from "../pages/CellEditPage/hooks";

export class CellStore {
  currentCellId: number | null = null;

  currentCell: Cell | null = null;

  isLoading = false;

  constructor() {
    makeAutoObservable(this, {
      updateCellVariantHandler: action,
      setCurrentCellId: action,
      setCurrentCell: action,
      addCellImageHandler: action,
      updateCellLocal: action,
      setLoading: action,
    });
  }

  setLoading = (value: boolean) => (this.isLoading = value);

  setCurrentCellId(id: number | null) {
    this.currentCellId = id;
  }

  updateCellVariantHandler = async (variant: Cell["type"]) => {
    if (!this.currentCell) return;
    this.isLoading = true;
    try {
      const res = await updateCellVariant(this.currentCell.id, variant);
      this.currentCell.type = res.cell.type;

      if (!res) return;

      return true;
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

  updateCellLocal = () => {};

  updateCellTextContentHandler = async (data: {
    title: string;
    description: string;
  }) => {
    // this.isLoading = true;
    console.log(`output->this.currentCell?.id`, this.currentCell);
    try {
      if (!this.currentCell) return;
      const res = await updateCellContent(this.currentCell?.id, data);
      if (!res) return;
      this.currentCell.title = data.title;
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
      //@ts-ignore
      const result = await addCellImage(media, this.currentCell?.id);
      return result;
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

  addCellDocumentHandler = async (media: LocalFileMedia) => {
    this.isLoading = true;
    try {
      //@ts-ignore
      const result = await addCellDocument(media, this.currentCell?.id);
      return result;
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

  setCurrentCell = (cell: Cell) => {
    console.log(`setCurrentCell->from`, cell);
    this.currentCell = cell;
  };
  async addSpreadsheetForCurrentCell() {
    if (!this.currentCellId) {
      throw new Error("currentCellId is null");
    }
    const result = await postSpreadsheet(this.currentCellId);
    if (!result) return;
  }

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

  //   get currentCell(){

  //   }
}
