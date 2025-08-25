import { computed, makeAutoObservable, runInAction } from "mobx";
import type { Spreadsheet, SpreadsheetRow } from "../types";
import { CellEntity } from "./CellEntity";
import { updateRowColor } from "../api/spreadsheetRow";

export class SpreadsheetRowEntity {
  cells: CellEntity[] = [];
  private raw: SpreadsheetRow;

  constructor(row: SpreadsheetRow) {
    this.raw = row;
    this.initCells(row);
    makeAutoObservable(this);
  }

  private initCells(row: SpreadsheetRow) {
    this.cells = row.cells.map((cell) => new CellEntity(cell));
  }

  get id() {
    return this.raw.id;
  }

  get sequence() {
    return this.raw.sequence;
  }

  get title() {
    return this.raw.title;
  }

  get color() {
    return this.raw.color;
  }

  update(row: SpreadsheetRow) {
    this.raw = row;
    row.cells.forEach((cell, index) => {
      if (this.cells[index] && this.cells[index].id === cell.id) {
        this.cells[index].update(cell);
      } else {
        this.cells[index] = new CellEntity(cell);
      }
    });
    if (this.cells.length > row.cells.length) {
      this.cells.length = row.cells.length;
    }
  }

  updateTitle = async (title: string) => {};
  updateColor = async (color: string) => {
    // this.isLoading = true;
    try {
      const res = await updateRowColor(this.id, color);
      if (!res) return;
      this.raw.color = color;
    } finally {
      runInAction(() => {
        // this.isLoading = false;
      });
    }
  };
}
