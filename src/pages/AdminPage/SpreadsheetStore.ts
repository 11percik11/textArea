import { computed, makeAutoObservable, runInAction } from "mobx";
import { getSpreadsheets } from "../../api/spreadsheet";
import type { Spreadsheet } from "../../types";

class TableStore {
  constructor() {
    makeAutoObservable(this, {
      rows: computed,
    });
  }

  table: Spreadsheet | null = null;
  isLoading: boolean = true;

  get rows() {
    return this.table?.rows || [];
  }

  getSpreadSheetsHandler = async () => {
    this.isLoading = true;
    try {
      const res = await getSpreadsheets();
      if (!res) return;
      this.table = res[0];
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

  



}

export const tableStore = new TableStore();
