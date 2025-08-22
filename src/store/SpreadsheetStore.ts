import { makeAutoObservable } from "mobx";
import { postSpreadsheet } from "../api/spreadsheet";

export class SpreadsheetStore {
  // currentCellId: number | null = null;



  // constructor() {
  //   makeAutoObservable(this);
  // }

  // setCurrentCellId(id: number | null) {
  //   this.currentCellId = id;
  // }

  // async addSpreadsheetForCurrentCell() {
  //   if (!this.currentCellId) {
  //     throw new Error("currentCellId is null");
  //   }
  //   const result = await postSpreadsheet(this.currentCellId);
  //   if (!result) return;
  // }
}
