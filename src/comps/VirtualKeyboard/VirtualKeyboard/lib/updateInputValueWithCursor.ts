export function updateInputValueWithCursor(
  input: HTMLInputElement | HTMLTextAreaElement | HTMLDivElement,
  updater: (
    value: string,
    selectionStart: number,
    selectionEnd: number,
  ) => {
    value: string;
    cursorPosition: number;
  },
) {
  if (
    input instanceof HTMLInputElement ||
    input instanceof HTMLTextAreaElement
  ) {
    const start = input.selectionStart ?? 0;
    const end = input.selectionEnd ?? 0;
    const text = input.value;

    const { value, cursorPosition } = updater(text, start, end);

    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      Object.getPrototypeOf(input),
      "value", 
    )?.set;

    nativeInputValueSetter?.call(input, value);

    requestAnimationFrame(() => {
      input.selectionStart = input.selectionEnd = cursorPosition;
    });

    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.focus();
  }

  if (input instanceof HTMLDivElement) {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return;

  const range = sel.getRangeAt(0);

  // 1. считаем позицию курсора в плоском тексте
  //    ВАЖНО: использовать правильную версию getOffsetsInElement,
  //    см. ниже — сейчас у тебя старая через walker, она должна быть заменена.
  const { startOffset, endOffset } = getOffsetsInElement(input, range);

  // лучше textContent, а не innerHTML:
  const fullText = input.textContent ?? "";

  const { value: newFullText, cursorPosition } = updater(
    fullText,
    startOffset,
    endOffset,
  );

  const isRangeSelected = startOffset !== endOffset;
  const isPureBackspace =
    !isRangeSelected && cursorPosition === startOffset - 1;

  // --- кейс 1: выделение было → удаляем выделение
  if (isRangeSelected) {
    range.deleteContents();
    // потом пойдём дальше, будем вставлять новый текст
  }
  // --- кейс 2: чистый backspace без выделения
  else if (isPureBackspace) {
    const deleteRange = makeAbsoluteRange(input, cursorPosition, startOffset);
    if (deleteRange) {
      deleteRange.deleteContents();
    }

    // курсор должен встать на cursorPosition
    setCaretPosition(input, cursorPosition);

    // синхронизируем Selection
    const after = window.getSelection();
    if (after) {
      // setCaretPosition уже сам выставил выделение через selection.addRange(...)
      // так что тут не надо ничего трогать
    }
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.focus();

    return;
  }
  else {
    range.deleteContents();
  }
  const insertText = newFullText.slice(startOffset, cursorPosition);

  if (insertText.length > 0) {
    const textNode = document.createTextNode(insertText);
    range.insertNode(textNode);
    range.setStartAfter(textNode);
    range.collapse(true);

    sel.removeAllRanges();
    sel.addRange(range);
  } else {
    const finalRange = makeAbsoluteRange(input, cursorPosition, cursorPosition);
    if (finalRange) {
      sel.removeAllRanges();
      sel.addRange(finalRange);
    }
  }

  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.focus();

  return;
}
}

function getOffsetsInElement(
  el: HTMLDivElement,
  range: Range,
): { startOffset: number; endOffset: number } {
  const startRange = document.createRange();
  startRange.selectNodeContents(el);
  startRange.setEnd(range.startContainer, range.startOffset);
  const startOffset = startRange.toString().length;

  const endRange = document.createRange();
  endRange.selectNodeContents(el);
  endRange.setEnd(range.endContainer, range.endOffset);
  const endOffset = endRange.toString().length;

  return { startOffset, endOffset };
}

function setCaretPosition(el: HTMLDivElement, offset: number) {
  const selection = window.getSelection();
  if (!selection) return;

  const range = document.createRange();
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);

  let node: Node | null = walker.nextNode();
  let acc = 0;

  while (node) {
    const textLength = node.textContent?.length ?? 0;

    if (offset <= acc + textLength) {
      const nodeOffset = offset - acc;
      range.setStart(node, nodeOffset);
      range.collapse(true);
      break;
    }

    acc += textLength;
    node = walker.nextNode();
  }

  if (!node) {
    range.setStart(el, el.childNodes.length);
    range.collapse(true);
  }

  selection.removeAllRanges();
  selection.addRange(range);
}

function makeAbsoluteRange(
  root: HTMLDivElement,
  absStart: number,
  absEnd: number,
): Range | null {

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node: Text | null;
  let acc = 0;

  let startNode: Text | null = null;
  let startOffset = 0;
  let endNode: Text | null = null;
  let endOffset = 0;

  while ((node = walker.nextNode() as Text | null)) {
    const len = node?.nodeValue?.length ?? 0;
    const nodeStart = acc;
    const nodeEnd = acc + len;

    if (!startNode && absStart >= nodeStart && absStart <= nodeEnd) {
      startNode = node;
      startOffset = absStart - nodeStart;
    }

    if (!endNode && absEnd >= nodeStart && absEnd <= nodeEnd) {
      endNode = node;
      endOffset = absEnd - nodeStart;
    }

    acc += len;

    if (startNode && endNode) break;
  }

  if (!startNode || !endNode) {
    return null;
  }

  const r = document.createRange();
  r.setStart(startNode, startOffset);
  r.setEnd(endNode, endOffset);
  return r;
}
