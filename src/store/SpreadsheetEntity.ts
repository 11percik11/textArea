import { addSpreadsheetTimeline } from "./../api/spreadsheet";
import { action, computed, makeAutoObservable, runInAction } from "mobx";
import type { Spreadsheet, SpreadsheetRow } from "../types";
import {
  addSpreadsheetContent,
  moveSpreadsheetContentPositions,
  removeSpreadsheetContent,
} from "../api/spreadsheet";
import { SpreadsheetCellEntity } from "./SpreadsheetCellEntity";
import { SpreadsheetRowEntity } from "./SpreadsheetRowEntity";

export class SpreadsheetEntity {
  constructor(table: Spreadsheet) {
    this.table = table;
    this.initRows(table);
 
    makeAutoObservable(this, {
      id: computed,
      columnsAndRows: computed,
      addSpreadsheetContentHandler: action,
      updateSpreadsheetColumns: action,
      removeSpreadsheetContentHandler: action,
      assignUpdate: action,
      update: action,
    });
  }

  rows: SpreadsheetRowEntity[] = [];

  table: Spreadsheet;

  isLoading: boolean = false;

  get id() {
    return this.table.id;
  }

  get title() {
    return this.table.title;
  }

  update = (table: Spreadsheet) => {
    this.table = table;
  };

  assignUpdate = (table: Partial<Spreadsheet>) => {
    this.table = { ...this.table, ...table };
  };

  private initRows(table: Spreadsheet) {
    const newRows: SpreadsheetRowEntity[] = [];
    table.rows.forEach((row) => {
      newRows.push(new SpreadsheetRowEntity(row));
    });
    this.rows = newRows;
  }

  addSpreadsheetContentHandler = async (isRow: boolean) => {
    this.isLoading = true;
    try {
      const res = await addSpreadsheetContent(this.id, isRow);
      if (!res) return;
      this.assignUpdate(res.data);
      this.initRows(res.data);
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
      this.initRows(res.data);
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
        isRow: false,
        spreadsheetId: this.id,
      });
      if (!res) return;
      this.assignUpdate(res.data);
      this.initRows(res.data);
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

  updateSpreadsheetRows = async (
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
      this.initRows(res.data);
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

  addSpreadsheetTimelineHandler = async () => {
    this.isLoading = true;
    try {
      const res = await addSpreadsheetTimeline(this.id);
      if (!res) return;
      this.assignUpdate(res.data);
      this.initRows(res.data);
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

const getCellById = (spreadsheetId: number, cellId: number) => {};
