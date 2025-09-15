import { action, computed, makeAutoObservable, runInAction } from "mobx";
import {
  addSpreadsheetContent,
  getOneSpreadsheet,
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
      cells: computed,
      testTable: computed,
      addSpreadsheetContentHandler: action,
      updateSpreadsheetColumns: action,
      removeSpreadsheetContentHandler: action,
    });
  }

  tables: Spreadsheet[] = [];

  table: Spreadsheet | null = null;
  isLoading: boolean = false;

  currentTableId = -1;

  get currentTable() {
    return this.tables?.find((table) => table.id === this.currentTableId);
  }

  get rows() {
    return this.currentTable?.rows || [];
  }

  get cells() {
    return this.tables
      .flatMap((table) => table.rows)
      .flatMap((row) => row.cells);
  }

  get testTable() {
    return this.tables?.find((table) => table.id === 4);
  }

  setCurrentTableId = (id: number) => {
    this.currentTableId = id;
  };

  getSpreadSheetsHandler = async () => {
    // this.isLoading = true;
    try {
      const res = await getSpreadsheets();
      if (!res) return;
      this.tables = res;
      this.setCurrentTableId(1);
    } finally {
      runInAction(() => {
        // this.isLoading = false;
      });
    }
  };

  getOneSpreadSheetHandler = async (spreadsheetId: number) => {
    try {
      const res = await getOneSpreadsheet(spreadsheetId);
      return res;
    } finally {
      runInAction(() => {
        // this.isLoading = false;
      });
    }
  };

  addSpreadsheetContentHandler = async (isRow: boolean) => {
    this.isLoading = true;
    try {
      const res = await addSpreadsheetContent(this.currentTableId, isRow);
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
        this.currentTableId,
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
        spreadsheetId: this.currentTableId,
      });
      if (!res) return;
      this.updateSpreadsheet(res.data);
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

  updateSpreadsheet = (updated: Spreadsheet) => {
    this.tables = this.tables?.map((table) => {
      if (table.id === updated.id) return updated;
      return table;
    });
  };

  get spreadSheetColumnsAndRowsLength() {
    return {
      columns: this.rows[0]?.cells.length || 0,
      rows: this.rows.length,
    };
  }
}

export const tableStore = new TableStore();
