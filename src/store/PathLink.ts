import { makeAutoObservable } from "mobx";
import type { SpreadsheetEntity } from "./SpreadsheetEntity";

type TitleWithPos = [string, [number, number], string, any];

interface PathLink {
  mainLink: "nature" | "society";
  arrLinks: [number, TitleWithPos[], string][]; 
  arrElement: SpreadsheetEntity | null;
}

export class PathLinkStore {
  link: PathLink = {
    mainLink: "nature",
    arrLinks: [],
    arrElement: null,
  };

  constructor() {
    makeAutoObservable(this);
  }

  setLink(data: PathLink) {
    this.link = data;
  }

  clearLink() {
    this.link = {
      mainLink: "nature",
      arrLinks: [],
      arrElement: null,
    };
  }

  setMainLink(href: "nature" | "society") {
    this.link.mainLink = href;
  }

  setArrLinks(index: []) {
    this.link.arrLinks = index;
  }

  setArrElement(arr: SpreadsheetEntity | null) {
    this.link.arrElement = arr;
  }

  addArrLink(arr: [number, TitleWithPos[], string]) {
    this.link.arrLinks.push(arr);
  }

  // удалить первое вхождение по id
  removeArrLinkById(id: number) {
    const idx = this.link.arrLinks.findIndex(([itemId]) => itemId === id);
    if (idx !== -1) {
      this.link.arrLinks.splice(idx, 1);
    }
  }

    trimFrom(index: number) {
    if (index < 0) {
      this.link.arrLinks = [];
      return;
    }
    if (index < this.link.arrLinks.length - 1) {
      this.link.arrLinks = this.link.arrLinks.slice(0, index + 1);
    }
  }

  // удалить все вхождения по id (если потенциально есть дубликаты)
  // removeAllArrLinksById(id: number) {
  //   this.link.arrLinks = this.link.arrLinks.filter(([itemId]) => itemId !== id);
  // }
}

export const PathlinkStore = new PathLinkStore();
