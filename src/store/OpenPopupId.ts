import { makeAutoObservable } from "mobx";

interface IOpenPopup {
  isOpen: boolean;
  index: [number | null, number | null];
}

export class OpenPopup {
  link: IOpenPopup = {
    isOpen: false,
    index: [0, 0],
  };

  constructor() {
    makeAutoObservable(this);
  }

  setOpenPopup(isOpen: boolean) {
    this.link.isOpen = isOpen;
  }

  setIndexPopup(index: [number | null, number | null]) {
    this.link.index = index;
  }

  setOpenIndexPopup(isOpen: boolean, index: [number | null, number | null]) {
    this.link.isOpen = isOpen;
    this.link.index = index;
  }
}

export const OpenPopupId = new OpenPopup();
