import { updateCellContent } from "./../api/spreadsheetCell";
import { action, computed, makeAutoObservable, runInAction } from "mobx";
import { postSpreadsheet } from "../api/spreadsheet";
import { addCellFile, updateCellVariant } from "../api/spreadsheetCell";
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
      addCellMediaHandler: action,
      setLoading: action,
    });
  }

  setLoading = (value: boolean) => (this.isLoading = value);

  setCurrentCellId(id: number | null) {
    this.currentCellId = id;
  }

  updateCellVariantHandler = async (variant: Cell["type"]) => {
    this.isLoading = true;
    console.log(`output->this.currentCell?.id`, this.currentCell);
    try {
      const res = await updateCellVariant(this.currentCell?.id, variant);
      if (!res) return;
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
    this.isLoading = true;
    console.log(`output->this.currentCell?.id`, this.currentCell);
    try {
      const res = await updateCellContent(this.currentCell?.id, data);
      if (!res) return;
      return true;
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

  addCellMediaHandler = async (media: LocalFileMedia) => {
    addCellFile(media, this.currentCell?.id);
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

  //   get currentCell(){

  //   }
}
