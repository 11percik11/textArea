import { action, computed, makeAutoObservable, runInAction } from "mobx";
import type { Spreadsheet } from "../types";
import {
  addSpreadsheetContent,
  moveSpreadsheetContentPositions,
  removeSpreadsheetContent,
} from "../api/spreadsheet";
import { CellEntity } from "./CellEntity";

export class SpreadsheetEntity {
  constructor(table: Spreadsheet) {
    this.table = table;
    this.initCells(table);

    makeAutoObservable(this, {
      id: computed,
      cells: computed,
      rows: computed,
      columnsAndRows: computed,
      addSpreadsheetContentHandler: action,
      updateSpreadsheetColumns: action,
      removeSpreadsheetContentHandler: action,
      assignUpdate: action,
      update: action,
    });
  }
  private cellMap = new Map<number, CellEntity>();

  table: Spreadsheet;

  isLoading: boolean = false;

  get id() {
    return this.table.id;
  }

  get rows() {
    return this.table.rows;
  }

  get cells() {
    return Array.from(this.cellMap.values());
  }

  update = (table: Spreadsheet) => {
    this.table = table;
  };

  assignUpdate = (table: Partial<Spreadsheet>) => {
    this.table = { ...this.table, ...table };
  };

  private initCells(table: Spreadsheet) {
    table.rows.forEach((row) => {
      row.cells.forEach((cell) => {
        if (!this.cellMap.has(cell.id)) {
          this.cellMap.set(cell.id, new CellEntity(cell));
        } else {
          this.cellMap.get(cell.id)!.update(cell);
        }
      });
    });
  }

  addSpreadsheetContentHandler = async (isRow: boolean) => {
    this.isLoading = true;
    try {
      const res = await addSpreadsheetContent(this.id, isRow);
      if (!res) return;
      this.assignUpdate(res.data);
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
      const res = await removeSpreadsheetContent(this.id, isRow, sequence);
      if (!res) return;
      this.assignUpdate(res.data);
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
        spreadsheetId: this.id,
      });
      if (!res) return;
      this.assignUpdate(res.data);
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

  get columnsAndRows() {
    return {
      columns: this.rows[0]?.cells.length || 0,
      rows: this.rows.length,
    };
  }
}
