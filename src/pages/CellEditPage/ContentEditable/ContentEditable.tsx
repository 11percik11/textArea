// import React, { useEffect, useRef, useCallback } from "react";
// import { linkStore } from "../../../store/LinkHref";
// import type { SpreadsheetCellEntity } from "../../../store/SpreadsheetCellEntity";

// export const ContentEditable = React.memo(
//   function ContentEditable({
//     html,
//     onSelect,
//     data,
//   }: {
//     html: string;
//     onSelect: (s: { start: number; end: number; text: string }) => void;
//     data: SpreadsheetCellEntity;
//   }) {
//     const ref = useRef<HTMLDivElement>(null);
//     const blurTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

//     // ставим HTML только когда реально поменялся
//     useEffect(() => {
//       if (ref.current) ref.current.innerHTML = html;
//     }, [html]);

//     // === ПРОСТО: автоприменяем ссылку, если есть в сторе ===
//     useEffect(() => {
//       const href = linkStore.link.href;
//       const idx = linkStore.link.index; // [start, end]

//       if (!ref.current || !href || !Array.isArray(idx)) return;
//       const [start, end] = idx;

//       applyLinkByIndex(ref.current, start, end, href);

//       const nextHtml = ref.current.innerHTML;
//       data.updateCellTextContentHandler({ description: nextHtml });
//       if (linkStore.clear) linkStore.clear(); // сделайте clear() в сторе: href="", index=[]
//     }, [html, data]); // запускаем после того, как html установлен

//     const handleMouseUp: React.MouseEventHandler<HTMLDivElement> = (e) => {
//       const info = getSel(e.currentTarget);
//       if (info) onSelect(info);
//     };

//     const handleBlur: React.FocusEventHandler<HTMLDivElement> =
//       useCallback(() => {
//         if (blurTimer.current) clearTimeout(blurTimer.current);
//         blurTimer.current = setTimeout(() => {
//           const description = ref.current?.innerHTML ?? "";
//           data.updateCellTextContentHandler({ description });
//         }, 300);
//       }, [data]);

//     useEffect(
//       () => () => {
//         if (blurTimer.current) clearTimeout(blurTimer.current);
//       },
//       [],
//     );

//     return (
//       <div
//         ref={ref}
//         contentEditable
//         suppressContentEditableWarning
//         onMouseUp={handleMouseUp}
//         onBlur={handleBlur}
//         className="w-full h-[466px] overflow-auto text-text outline-none text-wrap resize-none"
//       />
//     );
//   },
//   (prev, next) => prev.html === next.html,
// );

// // --- мини-утилиты ---
// function getSel(root: HTMLElement) {
//   const s = window.getSelection();
//   if (!s || s.rangeCount === 0) return null;
//   const r = s.getRangeAt(0);
//   if (!root.contains(r.startContainer) || !root.contains(r.endContainer))
//     return null;
//   const pre = r.cloneRange();
//   pre.selectNodeContents(root);
//   pre.setEnd(r.startContainer, r.startOffset);
//   const start = pre.toString().length;
//   const text = r.toString();
//   const end = start + text.length;
//   return { start, end, text };
// }

// function applyLinkByIndex(
//   root: HTMLElement,
//   start: number,
//   end: number,
//   href: string,
// ) {
//   const range = document.createRange();
//   const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
//   let pos = 0,
//     n: Text | null,
//     sNode: Text | null = null,
//     eNode: Text | null = null;
//   let sOff = 0,
//     eOff = 0;

//   while ((n = walker.nextNode() as Text | null)) {
//     const len = n?.nodeValue?.length ?? 0;
//     if (!sNode && pos + len >= start) {
//       sNode = n;
//       sOff = start - pos;
//     }
//     if (pos + len >= end) {
//       eNode = n;
//       eOff = end - pos;
//       break;
//     }
//     pos += len;
//   }
//   if (!sNode || !eNode) return;

//   range.setStart(sNode, sOff);
//   range.setEnd(eNode, eOff);

//   const a = document.createElement("a");
//   a.href = href;
//   a.textContent = range.toString();
//   a.style.color = "#004662";
//   a.style.fontWeight = "600"; // либо a.style.fontWeight = String(600);

//   range.deleteContents();
//   range.insertNode(a);
// }

import React, { useEffect, useRef, useCallback } from "react";
import { linkStore } from "../../../store/LinkHref";
import type { SpreadsheetCellEntity } from "../../../store/SpreadsheetCellEntity";

const DEBOUNCE_MS = 600;

export const ContentEditable = React.memo(
  function ContentEditable({
    html,
    onSelect,
    data,
  }: {
    html: string;
    onSelect: (s: { start: number; end: number; text: string }) => void;
    data: SpreadsheetCellEntity;
  }) {
    const ref = useRef<HTMLDivElement>(null);
    const blurTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const isEditingRef = useRef(false); // ← локальный «замок» редактирования

    // Ставим HTML только когда он действительно поменялся и мы НЕ редактируем
    useEffect(() => {
      if (!ref.current) return;
      if (isEditingRef.current) return; // не трогаем DOM, пока пользователь печатает
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

    // Автоприменение ссылки один раз (или когда точно надо), без записи обратно старого html
    useEffect(() => {
      const href = linkStore.link.href;
      const idx = linkStore.link.index; // [start, end]
      if (!ref.current || !href || !Array.isArray(idx)) return;

      const [start, end] = idx;
      applyLinkByIndex(ref.current, start, end, href);
        save();
      // НЕ заливаем сюда же пропсы — пусть сохранится на blur
      linkStore.setHref?.(""); // обнулите ссылку, чтобы не повторять
    }, []); // ← не ставим html в зависимостях, иначе можем перезаписать потери пользователя

    const handleMouseUp: React.MouseEventHandler<HTMLDivElement> = (e) => {
      const info = getSel(e.currentTarget);
      if (info) onSelect(info);
    };

    const handleFocus: React.FocusEventHandler<HTMLDivElement> = () => {
      isEditingRef.current = true;
    };

    const handleBlur: React.FocusEventHandler<HTMLDivElement> =
      useCallback(() => {
        isEditingRef.current = false; // снова можно принимать внешние обновления

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

    return (
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onFocus={handleFocus}
        onMouseUp={handleMouseUp}
        onBlur={handleBlur}
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
  const text = r.toString();
  const end = start + text.length;
  return { start, end, text };
}

function applyLinkByIndex(
  root: HTMLElement,
  start: number,
  end: number,
  href: string,
) {
  const range = document.createRange();
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let pos = 0,
    n: Text | null,
    sNode: Text | null = null,
    eNode: Text | null = null;
  let sOff = 0,
    eOff = 0;

  while ((n = walker.nextNode() as Text | null)) {
    const len = n?.nodeValue?.length ?? 0;
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

  const a = document.createElement("a");
  a.href = href;
  a.textContent = range.toString();
  a.style.color = "#004662";
  a.style.fontWeight = "600";

  range.deleteContents();
  range.insertNode(a);
}
