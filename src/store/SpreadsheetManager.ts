import { autorun, makeAutoObservable, runInAction } from "mobx";
import type { Spreadsheet } from "../types";
import { SpreadsheetEntity } from "./SpreadsheetEntity";
import { getOneSpreadsheet, getSpreadsheets } from "../api/spreadsheet";

export class SpreadsheetManager {
  constructor() {
    makeAutoObservable(this);

    this.isLoading = true;

    createMockSpreadsheets().forEach((spreadsheet) =>
      this.addOrUpdateSpreadsheet(spreadsheet),
    );

    this.getSpreadSheetsHandler().finally(() => {
      this.isLoading = false;
    });
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

const createMockSpreadsheets = (): Spreadsheet[] => {
  const s1: Spreadsheet = {
    id: -1,
    parentCell: {
      id: 177,
      title: "",
      sequence: -1,
    },
    rows: [
      {
        id: -2,
        sequence: 1,
        title: "",
        cells: [
          {
            children: null,
            title: "Общее древо Боков",
            description: "",
            files: [],
            images: [],
            id: -10,
            sequence: 1,
            type: "text",
            isTitleVisible: true,
          },
          {
            children: null,
            title:
              "Деятельность И.И./И.С. Бока в Императорском минералогическом обществе",
            description: "",
            files: [],
            images: [],
            id: -11,
            sequence: 2,
            type: "text",
            isTitleVisible: true,
          },
          {
            children: null,
            title:
              "Деятельность И.И./И.С. Бока в Русском географическом обществе",
            description: "",
            files: [],
            images: [],
            id: -12,
            sequence: 3,
            type: "text",
            isTitleVisible: true,
          },
        ],
        isTimeScale: false,
        color: "",
      },
      {
        id: -6,
        sequence: 1,
        title: "",
        cells: [
          {
            children: null,
            title: "XVIII – XIX вв.",
            description: "",
            files: [],
            images: [],
            id: -7,
            sequence: 1,
            type: "text",
            isTitleVisible: true,
          },
          {
            children: null,
            title: "1866 -1871",
            description: "",
            files: [],
            images: [],
            id: -8,
            sequence: 2,
            type: "text",
            isTitleVisible: true,
          },
          {
            children: null,
            title: "XIX – XX вв.",
            description: "",
            files: [],
            images: [],
            id: -9,
            sequence: 3,
            type: "text",
            isTitleVisible: true,
          },
        ],
        isTimeScale: true,
        color: "",
      },
    ],
    title: "Новая таблица",
  };

  const s2: Spreadsheet = {
    id: -2,
    parentCell: {
      id: 177,
      title: "",
      sequence: -1,
    },
    rows: [
      {
        id: -2,
        sequence: 1,
        title: "",
        cells: [
          {
            children: null,
            title: "Древо И.И./И.С. Бока",
            description: "",
            files: [],
            images: [],
            id: -1,
            sequence: 1,
            type: "text",
            isTitleVisible: true,
          },
          {
            children: null,
            title: "Древо Б.И. Бока",
            description: "",
            files: [],
            images: [],
            id: -2,
            sequence: 2,
            type: "text",
            isTitleVisible: true,
          },
          {
            children: null,
            title: "Древо Л.И. Бока",
            description: "",
            files: [],
            images: [],
            id: -3,
            sequence: 3,
            type: "text",
            isTitleVisible: true,
          },
        ],
        isTimeScale: false,
        color: "",
      },
      {
        id: -6,
        sequence: 1,
        title: "",
        cells: [
          {
            children: null,
            title: "",
            description: "",
            files: [],
            images: [],
            id: -7,
            sequence: 1,
            type: "text",
            isTitleVisible: true,
          },
          {
            children: null,
            title: "",
            description: "",
            files: [],
            images: [],
            id: -8,
            sequence: 2,
            type: "text",
            isTitleVisible: true,
          },
          {
            children: null,
            title: "",
            description: "",
            files: [],
            images: [],
            id: -9,
            sequence: 3,
            type: "text",
            isTitleVisible: true,
          },
        ],
        isTimeScale: true,
        color: "",
      },
    ],
    title: "Новая таблица",
  };

  const s3: Spreadsheet = {
    id: -3,
    parentCell: {
      id: 177,
      title: "",
      sequence: -1,
    },
    rows: [
      {
        id: -2,
        sequence: 1,
        title: "",
        cells: [
          {
            children: null,
            title: "Исследования в СПб губернии",
            description: "",
            files: [],
            images: [],
            id: -1,
            sequence: 1,
            type: "text",
            isTitleVisible: true,
          },
          {
            children: null,
            title: "Исследования в Тверской губернии",
            description: "",
            files: [],
            images: [],
            id: -2,
            sequence: 2,
            type: "text",
            isTitleVisible: true,
          },
        ],
        isTimeScale: false,
        color: "",
      },
      {
        id: -3,
        sequence: 1,
        title: "",
        cells: [
          {
            children: null,
            title: "Геологическая карта губернии",
            description: "",
            files: [],
            images: [],
            id: -1,
            sequence: 1,
            type: "text",
            isTitleVisible: true,
          },
          {
            children: null,
            title: "Геологическая карта губернии",
            description: "",
            files: [],
            images: [],
            id: -2,
            sequence: 2,
            type: "text",
            isTitleVisible: true,
          },
        ],
        isTimeScale: false,
        color: "",
      },
      {
        id: -6,
        sequence: 2,
        title: "",
        cells: [
          {
            children: null,
            title: "1866-1867",
            description: "",
            files: [],
            images: [],
            id: -7,
            sequence: 1,
            type: "text",
            isTitleVisible: true,
          },
          {
            children: null,
            title: "1868",
            description: "",
            files: [],
            images: [],
            id: -8,
            sequence: 2,
            type: "text",
            isTitleVisible: true,
          },
        ],
        isTimeScale: true,
        color: "",
      },
    ],
    title: "Новая таблица",
  };

  const s4: Spreadsheet = {
    id: -4,
    parentCell: {
      id: 177,
      title: "",
      sequence: -1,
    },
    rows: [
      {
        id: -1,
        sequence: 1,
        title: "Виды",
        cells: [
          {
            children: null,
            title: "",
            description: "",
            files: [],
            images: [],
            id: -1,
            sequence: 1,
            type: "text",
            isTitleVisible: true,
          },
          {
            children: null,
            title:
              "",
            description: "",
            files: [],
            images: [],
            id: -2,
            sequence: 2,
            type: "text",
            isTitleVisible: true,
          },
          {
            children: null,
            title:
              "",
            description: "",
            files: [],
            images: [],
            id: -3,
            sequence: 3,
            type: "text",
            isTitleVisible: true,
          },
        ],
        isTimeScale: false,
        color: "",
      },
      {
        id: -6,
        sequence: 1,
        title: "Карты",
        cells: [
          {
            children: null,
            title: "",
            description: "",
            files: [],
            images: [],
            id: -7,
            sequence: 1,
            type: "text",
            isTitleVisible: true,
          },
          {
            children: null,
            title: "",
            description: "",
            files: [],
            images: [],
            id: -8,
            sequence: 2,
            type: "text",
            isTitleVisible: true,
          },
          {
            children: null,
            title: "",
            description: "",
            files: [],
            images: [],
            id: -9,
            sequence: 3,
            type: "text",
            isTitleVisible: true,
          },
        ],
        isTimeScale: false,
        color: "",
      },
      {
        id: -6,
        sequence: 1,
        title: "Годы",
        cells: [
          {
            children: null,
            title: "",
            description: "",
            files: [],
            images: [],
            id: -7,
            sequence: 1,
            type: "text",
            isTitleVisible: true,
          },
          {
            children: null,
            title: "",
            description: "",
            files: [],
            images: [],
            id: -8,
            sequence: 2,
            type: "text",
            isTitleVisible: true,
          },
          {
            children: null,
            title: "",
            description: "",
            files: [],
            images: [],
            id: -9,
            sequence: 3,
            type: "text",
            isTitleVisible: true,
          },
        ],
        isTimeScale: false,
        color: "",
      },
    ],
    title: "Новая таблица",
  };

  const result: Spreadsheet[] = [s1, s2, s3, s4];

  return result;
};
