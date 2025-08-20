import { action, computed, makeAutoObservable, runInAction } from "mobx";
import {
  addSpreadsheetContent,
  getSpreadsheets,
  moveSpreadsheetContentPositions,
  removeSpreadsheetContent,
} from "../../api/spreadsheet";
import type { Spreadsheet } from "../../types";

class TableStore {
  constructor() {
    makeAutoObservable(this, {
      rows: computed,
      spreadSheetColumnsAndRowsLength: computed,
      currentTable: computed,
      addSpreadsheetContentHandler: action,
      updateSpreadsheetColumns: action,
      removeSpreadsheetContentHandler: action,
      setTableId: action,
    });
  }

  tables: Spreadsheet[] | null = null;

  table: Spreadsheet | null = null;
  isLoading: boolean = false;

  tableId = 1;

  get currentTable() {
    return this.tables?.find((table) => table.id === this.tableId);
  }

  get rows() {
    return this.table?.rows || [];
  }

  setTableId = (id: number) => {
    this.tableId = id;
  };

  getSpreadSheetsHandler = async () => {
    this.isLoading = true;
    try {
      const res = await getSpreadsheets();
      if (!res) return;
      this.tables = res;
      this.table = res[0];
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

  addSpreadsheetContentHandler = async (isRow: boolean) => {
    this.isLoading = true;
    try {
      const res = await addSpreadsheetContent(this.table?.id, isRow);
      if (!res) return;
      this.updateSpreadsheet(res.data);
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

  removeSpreadsheetContentHandler = async (
    isRow: boolean,
    sequence: number,
  ) => {
    this.isLoading = true;
    try {
      const res = await removeSpreadsheetContent(
        this.table?.id,
        isRow,
        sequence,
      );
      if (!res) return;
      this.updateSpreadsheet(res.data);
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

  updateSpreadsheetColumns = async (
    firstSequence: number,
    secondsSequence: number,
  ) => {
    this.isLoading = true;
    try {
      const res = await moveSpreadsheetContentPositions({
        first: firstSequence,
        second: secondsSequence,
        isRow: true,
        spreadsheetId: this.table?.id,
      });
      if (!res) return;
      this.updateSpreadsheet(res.data);
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

  updateSpreadsheet = (table: Spreadsheet) => {
    this.table = table;
  };

  get spreadSheetColumnsAndRowsLength() {
    return {
      columns: this.table?.rows[0]?.cells.length || 0,
      rows: this.rows.length,
    };
  }
}

export const tableStore = new TableStore();
