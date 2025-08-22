import { autorun, makeAutoObservable, runInAction } from "mobx";
import type { Spreadsheet } from "../types";
import { SpreadsheetEntity } from "./SpreadsheetEntity";
import { getOneSpreadsheet, getSpreadsheets } from "../api/spreadsheet";

export class SpreadsheetManager {
  constructor() {
    makeAutoObservable(this);

    this.getSpreadSheetsHandler();
  }

  spreadsheets: SpreadsheetEntity[] = [];
  isLoading: boolean = false;

  currentTabId: number = 1;

  get currentMainSpreadsheet() {
    return this.spreadsheets.find(
      (spreadsheet) => spreadsheet.id === this.currentTabId,
    );
  }

  private addOrUpdateSpreadsheet = (raw: Spreadsheet) => {
    const exist = this.spreadsheets.find(({ table }) => table.id === raw.id);
    if (exist) {
      exist.update(raw);
      return;
    }
    this.spreadsheets.push(new SpreadsheetEntity(raw));
  };

  getSpreadSheetsHandler = async () => {
    // this.isLoading = true;
    try {
      const res = await getSpreadsheets();
      if (!res) return;
      res.forEach((spreadsheet) => this.addOrUpdateSpreadsheet(spreadsheet));
    } finally {
      runInAction(() => {
        // this.isLoading = false;
      });
    }
  };

  getOneSpreadSheetHandler = async (spreadsheetId: number) => {
    try {
      const res = await getOneSpreadsheet(spreadsheetId);
      if (!res) return;
      this.addOrUpdateSpreadsheet(res);
    } finally {
      runInAction(() => {
        // this.isLoading = false;
      });
    }
  };

  setCurrentTabId = (id: number) => (this.currentTabId = id);
}
