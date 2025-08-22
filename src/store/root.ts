import { CellStore } from "./CellStore";
import { SpreadsheetManager } from "./SpreadsheetManager";
import { SpreadsheetStore } from "./SpreadsheetStore";

export const spreadsheetStore = new SpreadsheetStore();
export const cellStore = new CellStore();
export const spreadsheetManager = new SpreadsheetManager();
