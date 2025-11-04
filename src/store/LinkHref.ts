import { makeAutoObservable } from "mobx";

interface LinkData {
  href: string;
  hrefBack: string;
  index: [number, number]; // [start, end]
  showHeader: boolean;
}

export class LinkStore {
  link: LinkData = {
    href: "",
    hrefBack: "",
    index: [0, 0],
    showHeader: false, // ← по умолчанию false
  };

  constructor() {
    makeAutoObservable(this);
  }

  setLink(data: LinkData) {
    this.link = data;
  }

  clearLink() {
    this.link = {
      href: "",
      hrefBack: "",
      index: [0, 0],
      showHeader: false, // ← по умолчанию false
    };
  }

  setHref(href: string) {
    this.link.href = href;
  }

  setIndex(index: [number, number]) {
    this.link.index = index;
  }

  setShowHeader(showHeader: boolean) {
    this.link.showHeader = showHeader;
  }
}

export const linkStore = new LinkStore();
