import React, { useEffect, useRef, useCallback } from "react";
import { linkStore } from "../../../store/LinkHref";
import type { SpreadsheetCellEntity } from "../../../store/SpreadsheetCellEntity";

const DEBOUNCE_MS = 600;

export const ContentEditable = React.memo(
  function ContentEditable({
    html,
    setIsSelected,
    onSelect,
    data,
  }: {
    html: string;
    setIsSelected: (state: boolean) => void;
    onSelect: (s: { start: number; end: number; text: string }) => void;
    data: SpreadsheetCellEntity;
  }) {
    const hasClickedRef = useRef(false);
    const ref = useRef<HTMLDivElement>(null);
    const blurTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const isEditingRef = useRef(false);

    useEffect(() => {
      if (!ref.current) return;
      if (isEditingRef.current) return;
      if (ref.current.innerHTML !== html) {
        ref.current.innerHTML = html;
      }
    }, [html]);

    const save = useCallback(() => {
      const description = ref.current?.innerHTML ?? "";
      data.updateCellTextContentHandler({ description });
    }, [data]);

    const handleInput: React.FormEventHandler<HTMLDivElement> = () => {
      isEditingRef.current = true;
      if (blurTimer.current) clearTimeout(blurTimer.current);
      blurTimer.current = setTimeout(() => {
        save();
        blurTimer.current = null;
      }, DEBOUNCE_MS);
    };

    useEffect(() => {
      const href = linkStore.link.href;
      console.log("HREF:", href);
      
      const idx = linkStore.link.index; 
      if (!ref.current || !href || !Array.isArray(idx)) return;
      // if (!ref.current || !Array.isArray(idx)) return;
      // let CreateHref = href
      // if (!href) {
      //   CreateHref = "/"
      // }

      const [start, end] = idx;
      applyLinkByIndex(ref.current, start, end, href);
      save();
      linkStore.setHref?.(""); 
    }, []);

    const handleMouseUp: React.MouseEventHandler<HTMLDivElement> = (e) => {
      // console.log("handleMouseUp");

      const info = getSel(e.currentTarget);
      if (!hasClickedRef.current) {
        hasClickedRef.current = true;
        onSelect({ start: 0, end: 0, text: "" });
        return;
      } else {
        // console.log({ start: 11, end: 15, text: "дела" });
        if (info) onSelect(info);
      }

    };

    const handleFocus: React.FocusEventHandler<HTMLDivElement> = () => {
      // console.log("handleFocus");

      isEditingRef.current = true;
    };

    const handleBlur: React.FocusEventHandler<HTMLDivElement> =
      useCallback(() => {
        // console.log("handleBlur");
        setIsSelected(false);

        isEditingRef.current = false;

        if (blurTimer.current) clearTimeout(blurTimer.current);
        blurTimer.current = setTimeout(() => {
          const description = ref.current?.innerHTML ?? "";
          data.updateCellTextContentHandler({ description });
        }, 300);
      }, [data]);

    useEffect(() => {
      return () => {
        if (blurTimer.current) clearTimeout(blurTimer.current);
      };
    }, []);

    useEffect(() => {
  const handleSelectionChange = () => {
    const selection = window.getSelection();

    // если выделение пустое или не внутри нашего div
    if (
      !selection ||
      selection.rangeCount === 0 ||
      !ref.current ||
      !ref.current.contains(selection.anchorNode)
    ) {
      onSelect({ start: 0, end: 0, text: "" });
      return;
    }

    const text = selection.toString();
    if (!text) {
      onSelect({ start: 0, end: 0, text: "" });
    }
  };

  document.addEventListener("selectionchange", handleSelectionChange);
  return () => {
    document.removeEventListener("selectionchange", handleSelectionChange);
  };
}, [onSelect]);


    return (
      <div
        id="virtual-editor"
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onMouseUp={handleMouseUp}
        onFocus={handleFocus}
        onBlur={handleBlur}
        // onClick={handleClickDiv}

        className="w-full h-[466px] overflow-auto text-text outline-none text-wrap resize-none"
      />
    );
  },
  (prev, next) => prev.html === next.html,
);

// --- утилиты ---

function getSel(root: HTMLElement) {
  const s = window.getSelection();
  if (!s || s.rangeCount === 0) return null;

  const r = s.getRangeAt(0);
  if (!root.contains(r.startContainer) || !root.contains(r.endContainer))
    return null;

  const pre = r.cloneRange();
  pre.selectNodeContents(root);
  pre.setEnd(r.startContainer, r.startOffset);

  const start = pre.toString().length;
  let text = r.toString();
  let end = start + text.length;

  if (text.endsWith("\u00A0") || text.endsWith(" ")) {
    text = text.trimEnd();
    end -= 1;

    const newRange = document.createRange();

    newRange.setStart(r.startContainer, r.startOffset);
    newRange.setEnd(r.endContainer, r.endOffset - 1);

    s.removeAllRanges();
    s.addRange(newRange);
  }

  return { start, end, text };
}

function applyLinkByIndex(
  root: HTMLElement,
  start: number,
  end: number,
  href: string,
) {
  if (!root) return;

  // 1️⃣ Убираем старые ссылки, которые пересекают диапазон
  const links = Array.from(root.querySelectorAll("a"));
  for (const link of links) {
    const range = document.createRange();
    range.selectNodeContents(root);

    // вычисляем позицию ссылки внутри текста
    const pre = document.createRange();
    pre.selectNodeContents(root);
    pre.setEndBefore(link);
    const linkStart = pre.toString().length;
    const linkEnd = linkStart + link.textContent!.length;

    const overlaps =
      (start >= linkStart && start < linkEnd) ||
      (end > linkStart && end <= linkEnd) ||
      (start <= linkStart && end >= linkEnd);

    if (overlaps) {
      // заменяем <a> на чистый текст
      const textNode = document.createTextNode(link.textContent || "");
      link.replaceWith(textNode);
    }
  }

  // 2️⃣ Создаём диапазон для новой ссылки
  const range = document.createRange();
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let pos = 0;
  let sNode: Text | null = null,
    eNode: Text | null = null;
  let sOff = 0,
    eOff = 0;

  while (walker.nextNode()) {
    const n = walker.currentNode as Text;
    const len = n.nodeValue?.length ?? 0;

    if (!sNode && pos + len >= start) {
      sNode = n;
      sOff = start - pos;
    }
    if (pos + len >= end) {
      eNode = n;
      eOff = end - pos;
      break;
    }
    pos += len;
  }
  if (!sNode || !eNode) return;

  range.setStart(sNode, sOff);
  range.setEnd(eNode, eOff);

  // 3️⃣ Вставляем новую ссылку
  const a = document.createElement("a");
  a.href = href;
  a.textContent = range.toString();
  a.style.color = "#004662";
  a.style.fontWeight = "600";

  range.deleteContents();
  range.insertNode(a);
}
